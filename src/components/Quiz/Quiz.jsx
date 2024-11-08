import { Component, createRef } from "react"
import Levels from "../Levels/Levels"
import ProgressBar from "../ProgressBar/ProgressBar"
import { QuizMarvel } from "../../quizMarvel"
import { toast } from "react-toastify"
import QuizOver from "../QuizOver/QuizOver"

class Quiz extends Component {
  // constructor
  constructor(props) {
    super(props)

    this.initialState = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      showWelcomeMsg: false,
      quizEnd: false,
    }

    this.state = this.initialState

    this.storedDataRef = createRef()
  }

  // Methods for loading questions
  loadQuestions = (level) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[level]

    if (fetchedArrayQuiz.length >= this.state.maxQuestions) {
      this.storedDataRef.current = fetchedArrayQuiz

      const newArray = fetchedArrayQuiz.map(
        ({ answer, ...keepRest }) => keepRest
      )
      this.setState({ storedQuestions: newArray })
    } else {
      console.log("Pas assez de questions")
    }
  }

  // Method to display the welcome message
  showToastMsg = (pseudo) => {
    if (!this.state.showWelcomeMsg) {
      this.setState({ showWelcomeMsg: true })
      toast.warning(`Bonjour ${pseudo} et bonne chance`, {
        bodyClassName: "toastify-color-welcome",
      })
    }
  }

  // Execution of loadQuestion on component did mount
  componentDidMount = () => {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel])
  }

  // when component dit update
  componentDidUpdate = (prevProps, prevState) => {
    // show welcome message if pseudo is different
    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo)
    }

    // if the questions are not the same
    if (
      this.state.storedQuestions !== prevState.storedQuestions &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      })
    }

    // if question id are not the same
    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      })
    }

    if (this.state.quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(
        this.state.maxQuestions,
        this.state.score
      )

      this.gameOver(gradePercent)
    }
  }

  // submit the user answer
  submitAnswer = (selectedAnswer) => {
    this.setState({ userAnswer: selectedAnswer, btnDisabled: false })
  }

  // Recovery of success percentage
  getPercentage = (maxQuestion, ourScore) => (ourScore / maxQuestion) * 100

  // when the level question are completed
  gameOver = (percent) => {
    if (percent >= 50)
      this.setState((prevState) => ({
        quizLevel: prevState.quizLevel + 1,
        percent,
      }))
    else this.setState({ percent })
  }

  // get next questions
  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      //this.gameOver()
      this.setState({ quizEnd: true })
    } else {
      this.setState((prevState) => ({ idQuestion: prevState.idQuestion + 1 }))
    }

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer

    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }))

      toast.success("Bravo + 1")
    } else {
      toast.error("Raté 0")
    }
  }

  loadLevelQuestion = (param) => {
    this.setState({ ...this.initialState, quizLevel: param })
    this.loadQuestions(this.state.levelNames[param])
  }

  render() {
    const displayOptions = this.state.options.map((option, index) => (
      <p
        className={`answerOptions ${
          this.state.userAnswer === option && "selected"
        }`}
        key={index}
        onClick={() => this.submitAnswer(option)}
      >
        {option}
      </p>
    ))

    return this.state.quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={this.state.levelNames}
        score={this.state.score}
        maxQuestions={this.state.maxQuestions}
        quizLevel={this.state.quizLevel}
        percent={this.state.percent}
        loadLevelQuestion={this.loadLevelQuestion}
      />
    ) : (
      <>
        <Levels
          levelNames={this.state.levelNames}
          quizLevel={this.state.quizLevel}
        />
        <ProgressBar
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}
        />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          disabled={this.state.btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          {this.state.idQuestion < this.state.maxQuestions - 1
            ? "Suivant"
            : "Terminer"}
        </button>
      </>
    )
  }
}

export default Quiz

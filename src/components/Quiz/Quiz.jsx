import { Component, createRef } from "react"
import Levels from "../Levels/Levels"
import ProgressBar from "../ProgressBar/ProgressBar"
import { QuizMarvel } from "../../quizMarvel"
import { toast } from "react-toastify"
import QuizOver from "../QuizOver/QuizOver"
import { FaChevronRight } from "react-icons/fa"

const initialState = {
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
  percent: null,
}

const levelNames = ["debutant", "confirme", "expert"]

class Quiz extends Component {
  // constructor
  constructor(props) {
    super(props)

    this.state = initialState

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
  componentDidMount = () => this.loadQuestions(levelNames[this.state.quizLevel])

  // when component dit update
  componentDidUpdate = (prevProps, prevState) => {
    const { maxQuestions, storedQuestions, idQuestion, score, quizEnd } =
      this.state

    // show welcome message if pseudo is different
    if (this.props.userData.pseudo !== prevProps.userData.pseudo)
      this.showToastMsg(this.props.userData.pseudo)

    // if the questions are not the same
    if (storedQuestions !== prevState.storedQuestions && storedQuestions.length)
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
      })

    // if question id are not the same
    if (idQuestion !== prevState.idQuestion && storedQuestions.length)
      this.setState({
        question: storedQuestions[idQuestion].question,
        options: storedQuestions[idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      })

    if (quizEnd !== prevState.quizEnd) {
      const gradePercent = this.getPercentage(maxQuestions, score)
      this.gameOver(gradePercent)
    }
  }

  // submit the user answer
  submitAnswer = (selectedAnswer) =>
    this.setState({ userAnswer: selectedAnswer, btnDisabled: false })

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
    if (this.state.idQuestion === this.state.maxQuestions - 1)
      //this.gameOver()
      this.setState({ quizEnd: true })
    else
      this.setState((prevState) => ({ idQuestion: prevState.idQuestion + 1 }))

    const goodAnswer = this.storedDataRef.current[this.state.idQuestion].answer

    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }))
      toast.success("Bravo + 1")
    } else toast.error("Raté 0")
  }

  loadLevelQuestion = (param) => {
    this.setState({ ...initialState, quizLevel: param })
    this.loadQuestions(levelNames[param])
  }

  render() {
    const {
      quizLevel,
      maxQuestions,
      question,
      options,
      idQuestion,
      btnDisabled,
      userAnswer,
      score,
      quizEnd,
      percent,
    } = this.state

    const displayOptions = options.map((option, index) => (
      <p
        className={`answerOptions ${userAnswer === option && "selected"}`}
        key={index}
        onClick={() => this.submitAnswer(option)}
      >
        <FaChevronRight /> {option}
      </p>
    ))

    return quizEnd ? (
      <QuizOver
        ref={this.storedDataRef}
        levelNames={levelNames}
        score={score}
        maxQuestions={maxQuestions}
        quizLevel={quizLevel}
        percent={percent}
        loadLevelQuestion={this.loadLevelQuestion}
      />
    ) : (
      <>
        <Levels levelNames={levelNames} quizLevel={quizLevel} />
        <ProgressBar idQuestion={idQuestion} maxQuestions={maxQuestions} />
        <h2>{question}</h2>
        {displayOptions}
        <button
          disabled={btnDisabled}
          className="btnSubmit"
          onClick={this.nextQuestion}
        >
          {idQuestion < maxQuestions - 1 ? "Suivant" : "Terminer"}
        </button>
      </>
    )
  }
}

export default Quiz

import { forwardRef, Fragment, memo, useEffect, useState } from "react"

const QuizOver = forwardRef((props, ref) => {
  // props
  const {
    levelNames,
    quizLevel,
    score,
    percent,
    maxQuestions,
    loadLevelQuestion,
  } = props

  // quiz
  const [asked, setAsked] = useState([])

  // get questions and answers when component dit mount
  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  // Success rate
  const averageGrade = maxQuestions / 2

  // if score is lower than success rate restart the level
  if (score < averageGrade) setTimeout(() => loadLevelQuestion(quizLevel), 3000)

  // decision when quiz is finished
  const decision =
    score > averageGrade ? ( // is the score higher than the success rate ?
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? ( // Not an expert ?
            <Fragment>
              <p className="successMsg">Bravo, passez au niveau suivant!</p>
              <button
                className="btnResult success"
                onClick={() => loadLevelQuestion(quizLevel)}
              >
                Niveau Suivant
              </button>
            </Fragment>
          ) : (
            // An expert ?
            <Fragment>
              <p className="successMsg">Bravo, vous êtes un expert !</p>
              <button
                className="btnResult gameOver"
                onClick={() => loadLevelQuestion(0)}
              >
                Accueil
              </button>
            </Fragment>
          )}
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}%</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    ) : (
      // not
      <Fragment>
        <div className="stepsBtnContainer">
          <p className="failureMsg">Vous avez échoué !</p>
        </div>
        <div className="percentage">
          <div className="progressPercent">Réussite: {percent}%</div>
          <div className="progressPercent">
            Note: {score}/{maxQuestions}
          </div>
        </div>
      </Fragment>
    )

  // the answers to the quiz questions
  const questionAnswer =
    score >= averageGrade ? ( // show answers if score is greater than or equal to success rate
      asked.map((question) => (
        <tr key={question.id}>
          <td>{question.question}</td>
          <td>{question.answer}</td>
          <td>
            <button className="btnInfo">Infos</button>
          </td>
        </tr>
      ))
    ) : (
      // not
      <tr>
        <td colSpan={3}>
          <div className="loader"></div>
          <p style={{ textAlign: "center", color: "red" }}>Pas de réponse!</p>
        </td>
      </tr>
    )

  return (
    <>
      {decision}

      <hr />
      <p>Les réponses au questions posées:</p>

      <div className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Questions</th>
              <th>Reponses</th>
              <th>Infos</th>
            </tr>
          </thead>

          <tbody>{questionAnswer}</tbody>
        </table>
      </div>
    </>
  )
})

export default memo(QuizOver)

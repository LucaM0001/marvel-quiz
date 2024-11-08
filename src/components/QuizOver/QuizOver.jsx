import { forwardRef, Fragment, memo, useEffect, useState } from "react"

const QuizOver = forwardRef((props, ref) => {
  const { levelNames, quizLevel, score, percent, maxQuestions } = props

  const [asked, setAsked] = useState([])

  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  const averageGrade = maxQuestions / 2

  const decision =
    score > averageGrade ? (
      <Fragment>
        <div className="stepsBtnContainer">
          {quizLevel < levelNames.length ? (
            <Fragment>
              <p className="successMsg">Bravo, passez au niveau suivant!</p>
              <button className="btnResult success">Niveau Suivant</button>
            </Fragment>
          ) : (
            <Fragment>
              <p className="successMsg">Bravo, vous êtes un expert !</p>
              <button className="btnResult gameOver">Niveau Suivant</button>
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

  const questionAnswer =
    score >= averageGrade ? (
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
      <tr>
        <td colSpan={3}>
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

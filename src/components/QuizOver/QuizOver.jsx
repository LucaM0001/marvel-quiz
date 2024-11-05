import { forwardRef, memo, useEffect, useState } from "react"

const QuizOver = forwardRef((props, ref) => {
  const [asked, setAsked] = useState([])

  useEffect(() => {
    setAsked(ref.current)
  }, [ref])

  const questionAnswer = asked.map((question) => (
    <tr key={question.id}>
      <td>{question.question}</td>
      <td>{question.answer}</td>
      <td>
        <button className="btnInfo">Infos</button>
      </td>
    </tr>
  ))

  return (
    <>
      <div className="stepsBtnContainer">
        <p className="successMsg">Bravo, vous êtes un expert !</p>
        <button className="btnResult success">Niveau Suivant</button>
      </div>
      <div className="percentage">
        <div className="progressPercent">Réussite: 10%</div>
        <div className="progressPercent">Note: 10/10</div>
      </div>

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

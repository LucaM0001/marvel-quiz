import { forwardRef, Fragment, memo, useEffect, useState } from "react"
import { GiTrophyCup } from "react-icons/gi"
import Loader from "../Loader/Loader"
import Modal from "../Modal/Modal"

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

  const API_PUBLIC_KEY = import.meta.env.VITE_APP_MARVEL_API_KEY

  console.log(API_PUBLIC_KEY)

  const hash = "ea0778112f561b17c24a5aca7132bc0e"

  // quiz
  const [asked, setAsked] = useState([])
  const [openModal, setOpenModal] = useState(false)

  // get questions and answers when component dit mount
  useEffect(() => setAsked(ref.current), [ref])

  const showModal = (id) => {
    setOpenModal(true)
  }

  const hideModal = () => setOpenModal(false)

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
              <p className="successMsg">
                <GiTrophyCup size={50} />, vous êtes un expert !
              </p>
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
            <button
              className="btnInfo"
              onClick={() => showModal(question.heroId)}
            >
              Infos
            </button>
          </td>
        </tr>
      ))
    ) : (
      // not
      <tr>
        <td colSpan={3}>
          <Loader
            loadingMsg={"Pas de réponses!"}
            styling={{ textAlign: "center", color: "red" }}
          />
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

      <Modal showModal={openModal} hideModal={hideModal}>
        <div className="modalHeader">
          <h2>Titre</h2>
        </div>
        <div className="modalBody">
          <h3>Titre 2</h3>
        </div>
        <div className="modalFooter">
          <button className="modalBtn">Fermer</button>
        </div>
      </Modal>
    </>
  )
})

export default memo(QuizOver)

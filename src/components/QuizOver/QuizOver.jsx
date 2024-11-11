import { forwardRef, Fragment, memo, useEffect, useState } from "react"
import { GiTrophyCup } from "react-icons/gi"
import Loader from "../Loader/Loader"
import Modal from "../Modal/Modal"
import axios from "axios"

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

  const hash = "ea0778112f561b17c24a5aca7132bc0e"

  // quiz
  const [asked, setAsked] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [characterInfos, setCharacterInfos] = useState([])
  const [loading, setLoading] = useState(true)

  // get questions and answers when component dit mount
  useEffect(() => {
    setAsked(ref.current), [ref]

    if (localStorage.getItem("marvelStorageDate")) {
      const date = localStorage.getItem("marvelStorageDate")
      checkDataAge(date)
    }
  })

  // check if the stored information in localStorage exceeds 15 days
  const checkDataAge = (date) => {
    const today = Date.now()
    const timeDifference = today - date

    const daysDifference = timeDifference / (1000 * 3600 * 24)

    if (daysDifference >= 15) {
      localStorage.clear()
      localStorage.setItem("marvelStorageDate", Date.now())
    }
  }

  // show information about a character
  const showModal = (id) => {
    setOpenModal(true)

    if (localStorage.getItem(id)) {
      setCharacterInfos(JSON.parse(localStorage.getItem(id)))
      setLoading(false)
    } else {
      axios
        .get(
          `https://gateway.marvel.com/v1/public/characters/${id}?ts=1&apikey=${API_PUBLIC_KEY}&hash=${hash}`
        )
        .then((response) => {
          console.log(response)

          setCharacterInfos(response.data)
          setLoading(false)

          localStorage.setItem(id, JSON.stringify(response.data))

          if (!localStorage.getItem("marvelStorageDate")) {
            localStorage.setItem("marvelStorageDate", Date.now())
          }
        })
        .catch((error) => console.log(error))
    }
  }

  const hideModal = () => {
    setOpenModal(false)
    setLoading(true)
  }

  const capitalizeFirstLetter = (string) =>
    string[0].toUpperCase() + string.slice(1, string.length)

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

  const resultInModal = !loading ? (
    <>
      <div className="modalHeader">
        <h2>{characterInfos.data.results[0].name}</h2>
      </div>
      <div className="modalBody">
        <div className="comicImage">
          <img
            src={`${characterInfos.data.results[0].thumbnail.path}.${characterInfos.data.results[0].thumbnail.extension}`}
            alt={characterInfos.data.results[0].name}
          />
          <p>{characterInfos.attributionText}</p>
        </div>
        <div className="comicDetails">
          <h3>Description</h3>
          {characterInfos.data.results[0].description ? (
            <p>{characterInfos.data.results[0].description}</p>
          ) : (
            <p>Description indisponible ...</p>
          )}
          <h3>Plus d'infos</h3>
          {characterInfos.data.results[0].urls &&
            characterInfos.data.results[0].urls.map((url, index) => (
              <a
                key={index}
                href={url.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {capitalizeFirstLetter(url.type)}
              </a>
            ))}
        </div>
      </div>
      <div className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>
          Fermer
        </button>
      </div>
    </>
  ) : (
    <>
      <div className="modalHeader">
        <h2>Réponse de Marvel ...</h2>
      </div>
      <div className="modalBody">
        <Loader />
      </div>
    </>
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
        {resultInModal}
      </Modal>
    </>
  )
})

export default memo(QuizOver)

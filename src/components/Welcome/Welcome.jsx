import { useContext, useEffect, useState } from "react"
import Logout from "../Logout/Logout"
import Quiz from "../Quiz/Quiz"
import { FirebaseContext, onAuthStateChanged } from "../../Firebase"
import { useNavigate } from "react-router-dom"

const Welcome = () => {
  const navigate = useNavigate()

  const firebase = useContext(FirebaseContext)

  const [userSession, setUserSession] = useState(null)

  useEffect(() => {
    let listener = onAuthStateChanged(firebase.auth, (user) => {
      user ? setUserSession(user) : navigate("/")
    })

    return () => {
      listener()
    }
  }, [])

  return userSession === null ? (
    <>
      <div className="loader"></div>
      <p>Loading...</p>
    </>
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz />
      </div>
    </div>
  )
}

export default Welcome

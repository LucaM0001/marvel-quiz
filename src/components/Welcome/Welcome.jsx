import { useContext, useEffect, useState } from "react"
import Logout from "../Logout/Logout"
import Quiz from "../Quiz/Quiz"
import { FirebaseContext, onAuthStateChanged } from "../../Firebase"
import { useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import Loader from "../Loader/Loader"

const Welcome = () => {
  const navigate = useNavigate()

  const firebase = useContext(FirebaseContext)

  const [userSession, setUserSession] = useState(null)
  const [userData, setUserData] = useState({})

  useEffect(() => {
    let listener = onAuthStateChanged(firebase.auth, (user) => {
      user ? setUserSession(user) : navigate("/")
    })

    if (!!userSession) {
      firebase
        .getUser(userSession.uid)
        .then((res) => setUserData(res))
        .catch((err) => console.log(err.message))
    }

    return () => {
      listener()
    }
  }, [userSession])

  return userSession === null ? (
    <Loader
      loadingMsg={"Authentification ..."}
      styling={{ textAlign: "center", color: "#fff" }}
    />
  ) : (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz userData={userData} />
      </div>
    </div>
  )
}

export default Welcome

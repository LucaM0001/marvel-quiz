import Logout from "../Logout/Logout"
import Quiz from "../Quiz/Quiz"

const Welcome = () => {
  return (
    <div className="quiz-bg">
      <div className="container">
        <Logout />
        <Quiz />
      </div>
    </div>
  )
}

export default Welcome

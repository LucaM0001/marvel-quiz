import Header from "./components/Header/Header"
import Landing from "./components/Landing/Landing"
import Footer from "./components/Footer/Footer"
import Welcome from "./components/Welcome/Welcome"
import Login from "./components/Auth/Login/Login"
import Signup from "./components/Auth/Signup/Signup"
import ErroPage from "./components/ErroPage/ErroPage"
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" Component={Landing} />
        <Route path="/welcome" Component={Welcome} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="*" Component={ErroPage} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App

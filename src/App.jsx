import Header from "./components/Header/Header"
import Landing from "./components/Landing/Landing"
import Footer from "./components/Footer/Footer"
import Welcome from "./components/Welcome/Welcome"
import Login from "./components/Auth/Login/Login"
import Signup from "./components/Auth/Signup/Signup"
import ErroPage from "./components/ErroPage/ErroPage"
import ForgetPassword from "./components/ForgetPassword/ForgetPassword"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.min.css"

import "./App.css"
import { IconContext } from "react-icons"

const App = () => {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Header />

        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/welcome" Component={Welcome} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={Signup} />
          <Route path="/forgetpassword" Component={ForgetPassword} />
          <Route path="*" Component={ErroPage} />
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />

        <Footer />
      </IconContext.Provider>
    </Router>
  )
}

export default App

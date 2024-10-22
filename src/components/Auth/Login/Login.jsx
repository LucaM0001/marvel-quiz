import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { FirebaseContext } from "../../../Firebase"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()

  const firebase = useContext(FirebaseContext)

  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "all" })

  const onSubmit = ({ email, password }) => {
    firebase
      .loginUser(email, password)
      .then((userCredential) => {
        navigate("/welcome")
      })
      .catch((err) => setError(err.message))
    reset()
  }

  const errorMsg = error !== "" && <span>{error}</span>

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Connexion</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inputBox">
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  {...register("email", {
                    required: "L'email est requis",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Format d'email invalide",
                    },
                  })}
                />
                <label htmlFor="email">Email</label>
                {errors.email && (
                  <p style={{ color: "orange" }}>{errors.email.message}</p>
                )}
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  id="password"
                  autoComplete="off"
                  {...register("password", {
                    required: "Le mot de passe est requis",
                    minLength: {
                      value: 6,
                      message:
                        "Le mot de passe doit avoir au moins 6 caractères",
                    },
                  })}
                />
                <label htmlFor="password">Mot(s) de passe</label>
                {errors.password && (
                  <p style={{ color: "orange" }}>{errors.password.message}</p>
                )}
              </div>

              <button disabled={!isValid}>Connexion</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to={"/signup"}>
                Nouveau sur Marvel Quiz? Inscrivez-vous maintenant.
              </Link>
              <br />
              <Link className="simpleLink" to={"/forgetpassword"}>
                Mot de passe oublié? Récupérez-le ici.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

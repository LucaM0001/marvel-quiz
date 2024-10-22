import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { FirebaseContext } from "../../../Firebase"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const navigate = useNavigate()

  const firebase = useContext(FirebaseContext)

  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    getValues,
  } = useForm({ mode: "all" })

  const onSubmit = ({ pseudo, email, password }) => {
    firebase
      .signupUser(email, password)
      .then((authUser) => {
        return firebase.setUser(authUser.user.uid, { pseudo, email })
      })
      .then(() => {
        navigate("/welcome")
      })
      .catch((err) => setError(err.message))
    reset()
  }

  // const watchedFields = watch()

  const errorMsg = error !== "" && <span>{error}</span>

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="inputBox">
                <input
                  type="text"
                  id="pseudo"
                  autoComplete="off"
                  {...register("pseudo", {
                    required: "Le pseudo est requis",
                    pattern: {
                      value: /^[a-zA-Z][a-zA-Z0-9_-]{2,14}$/,
                      message:
                        "Le pseudo doit commencer par une lettre et contenir entre 3 et 15 caractères.",
                    },
                  })}
                />
                <label htmlFor="pseudo">Pseudo</label>
                {errors.pseudo && (
                  <p style={{ color: "orange" }}>{errors.pseudo.message}</p>
                )}
              </div>

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

              <div className="inputBox">
                <input
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  {...register("confirmPassword", {
                    required: "Veuillez confirmer votre mot de passe",
                    minLength: {
                      value: 6,
                      message:
                        "Le mot de passe doit avoir au moins 6 caractères",
                    },
                    validate: (value) =>
                      value === getValues("password") ||
                      "Les mots de passe ne correspondent pas",
                  })}
                />
                <label htmlFor="confirmPassword">
                  Confirmer mot(s) de passe
                </label>
                {errors.confirmPassword && (
                  <p style={{ color: "orange" }}>
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button disabled={!isValid}>Inscription</button>
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to={"/login"}>
                Déjà inscrit? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
FirebaseContext
import { Link, useNavigate } from "react-router-dom"
import { FirebaseContext } from "../../Firebase"

const successStyle = {
  background: "green",
  border: "1px solid green",
  color: "#fff",
}

const ForgetPassword = () => {
  const navigate = useNavigate()

  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const firebase = useContext(FirebaseContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "all" })

  const onSubmit = async ({ email }) => {
    firebase
      .passwordReset(email)
      .then(() => {
        setError(null)
        setSuccess(`Consultez votre @email ${email} pour changer le mot passe`)

        setTimeout(() => {
          navigate("/login")
        }, 5000)
      })
      .catch((err) => setError(err.message))
    reset()
  }

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftForget"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {success && <span style={successStyle}>{success}</span>}

            {error && <span>{error}</span>}

            <h2>Mot de passe oublié?</h2>
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
              <button type="submit" disabled={!isValid}>
                Récupérer
              </button>
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

export default ForgetPassword

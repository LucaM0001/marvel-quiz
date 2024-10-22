import React, { useContext, useEffect, useState } from "react"
import { FirebaseContext } from "../../Firebase"

const Logout = () => {
  const [checked, setChecked] = useState(false)
  const firebase = useContext(FirebaseContext)

  useEffect(() => {
    if (checked) {
      console.log("Déconnexion")
      firebase.signoutUser()
    }
  }, [checked])

  return (
    <div className="logoutContainer">
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default Logout

import React, { useContext, useEffect, useState } from "react"
import { FirebaseContext } from "../../Firebase"
import { Tooltip } from "react-tooltip"

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
        <span
          className="slider round"
          data-tooltip-id="my-tooltip"
          data-tooltip-content={"Déconnexion"}
        ></span>
        <Tooltip id="my-tooltip" place="left" effect="solid" />
      </label>
    </div>
  )
}

export default Logout

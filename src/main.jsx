import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import Firebase, { FirebaseContext } from "./Firebase"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </StrictMode>
)

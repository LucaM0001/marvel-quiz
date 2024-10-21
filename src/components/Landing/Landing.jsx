import { useRef, useEffect, useState } from "react"

const Landing = () => {
  const [btn, setBtn] = useState(false)

  const refWolverine = useRef(null)

  useEffect(() => {
    refWolverine.current.classList.add("startingImg")

    setTimeout(() => {
      refWolverine.current.classList.remove("startingImg")
      setBtn(true)
    }, 1000)
  }, [])

  const setLeftImg = () => {
    refWolverine.current.classList.add("leftImg")
  }

  const setRightImg = () => {
    refWolverine.current.classList.add("rightImg")
  }

  const clearImg = () => {
    if (refWolverine.current.classList.contains("leftImg")) {
      refWolverine.current.classList.remove("leftImg")
    } else if (refWolverine.current.classList.contains("rightImg")) {
      refWolverine.current.classList.remove("rightImg")
    }
  }

  const displayBtn = btn && (
    <>
      <div className="leftBox">
        <button
          className="btn-welcome"
          onMouseOver={setLeftImg}
          onMouseOut={clearImg}
        >
          Inscription
        </button>
      </div>
      <div className="rightBox">
        <button
          className="btn-welcome"
          onMouseOver={setRightImg}
          onMouseOut={clearImg}
        >
          Connexion
        </button>
      </div>
    </>
  )

  return (
    <main ref={refWolverine} className="welcomePage">
      {displayBtn}
    </main>
  )
}

export default Landing

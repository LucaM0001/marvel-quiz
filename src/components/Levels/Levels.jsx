import { memo, useEffect, useState } from "react"
import { Stepper } from "react-form-stepper"

const Levels = ({ levelNames, quizLevel }) => {
  const [levels, setLevels] = useState([])

  useEffect(() => {
    const quizSteps = levelNames.map((level) => ({
      label: level.toUpperCase(),
    }))
    setLevels(quizSteps)
  }, [levelNames])

  return (
    <Stepper
      steps={levels}
      activeStep={quizLevel}
      styleConfig={{ size: 45, circleFontSize: 20 }}
    />
  )
}

export default memo(Levels)

import { memo } from "react"

const ProgressBar = ({ idQuestion, maxQuestions }) => {
  // get percentage
  const getWidth = (totalQuestion, questionId) =>
    (questionId * 100) / totalQuestion

  // the actual question (1, 2, ..., 10)
  const actualQuestion = idQuestion + 1

  // the progress percentage
  const progressPercent = getWidth(maxQuestions, actualQuestion)

  return (
    <>
      <div className="percentage">
        <div className="progressPercent">
          Question: {`${actualQuestion}/${maxQuestions}`}
        </div>
        <div className="progressPercent">Progression: {progressPercent}%</div>
      </div>
      <div className="progressBar">
        <div
          className="progressBarChange"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </>
  )
}

export default memo(ProgressBar)

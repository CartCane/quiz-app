import React from 'react'

export default function FinishScreen({dispatch, score, numQuestions, highscore}) {
  const scorePercent = Math.floor((score / numQuestions ) * 100);
  return (
    <>
      <p className="result">You scored {score} out of {numQuestions} ({scorePercent}%)</p>
      <p className="highscore">Highscore: {highscore}</p>
      <button className="btn btn-ui" onClick={()=>dispatch({type: "restart"})}>Restart Quiz</button>
    </>
  )
}

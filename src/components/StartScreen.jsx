import React from 'react'

export default function StartScreen({dispatch, numQuestions}) {
  return (
    <div className="start">
      <h2>Welcome to General Knowledge Quiz!</h2>
      <h3>{numQuestions} questions to test your general knowledge</h3>
      <button className="btn btn-ui" onClick={()=>dispatch({type: "active"})}>Start Quiz</button>
    </div>
  )
}

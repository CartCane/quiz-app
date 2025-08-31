import React from 'react'

export default function Progress({index, numQuestions, score}) {
  return (
    <div className="progress">
      <p>Question <strong>{index + 1}</strong> / <strong>{numQuestions}</strong></p>
      <p>Score: {score}</p>
    </div>
  )
}

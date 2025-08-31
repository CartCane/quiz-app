import React from 'react'
import Options from './Options';

export default function Question({dispatch, questions, index, answer, numQuestions}) {
  const currQues = questions[index];
  const question = currQues.question;

  return (
    <div>
      <h4>{question}</h4>
      <Options dispatch={dispatch} currQues={currQues} answer={answer}/>
      {answer !== null 
        && <button 
              className="btn btn-ui" 
              onClick={()=>dispatch({type: index === numQuestions - 1 ? "finish" : "nextQuestion"})}>
                Next
            </button>}
    </div>
  )
}

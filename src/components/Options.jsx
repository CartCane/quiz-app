import React, {useState, useEffect} from 'react'

export default function Options({dispatch, currQues, answer}) {
    const [options, setOptions] = useState([]);
    const rightAnswer = currQues.correct_answer;
    const hasAnswered = answer !== null;

    useEffect(()=>{
        const randOptions = [...currQues.incorrect_answers, currQues.correct_answer].sort(()=>0.5 - Math.random());
        setOptions(randOptions)
    }, [currQues])

    return (
        <div>
            {options.map((option, index) => (
                <button className={`options btn btn-options ${hasAnswered ? option === rightAnswer ? "correct" : "wrong" : ""}`}
                        key={index} 
                        onClick={()=>dispatch({type: "newAnswer", payload: option})}
                        disabled={hasAnswered}
                >
                    {option}
                </button>
            ))}
        </div>
  )
}

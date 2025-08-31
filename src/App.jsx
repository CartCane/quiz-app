import React, {useReducer, useEffect} from 'react'
import './App.css';
import Loading from './components/Loading';
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import FinishScreen from './components/FinishScreen'
import ErrorScreen from './components/ErrorScreen'
import Header from './components/Header'
import Main from './components/Main';
import Progress from './components/Progress';

const initialState = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  score: 0,
  highScore: 0,
}

function reducer(state, action){
  switch (action.type) {
    case "dataReceived":
      return{
        ...state,
        status: "ready",
        questions: action.payload,
      }
    case "error":
      return{
        ...state,
        status: "error",
      }
    case "active":
      return {
        ...state,
        status: "active",
      }
    case "nextQuestion":
      return{
        ...state,
        index: state.index + 1,
        status: "active",
        answer: null,
      }
    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        score: action.payload === question.correct_answer ? state.score + 1 : state.score,
      }}
    case "finish":
      return{
        ...state,
        status: "finish",
        highScore: state.score > state.highScore ? state.score : state.highScore,
      }
    case "restart":
      return{
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        status: "ready",
      }
  }
}

function App(){
  const [state, dispatch] = useReducer(reducer, initialState);
  const {questions, status, index, answer, score, highScore} = state;

  const numQuestions = questions.length;

  useEffect(function(){
    async function fetchData(){
      try{
        const res = await fetch("https://opentdb.com/api.php?amount=25&category=9&difficulty=easy");
        if (!res.ok) throw new Error("network issue");
        const data = await res.json();
        console.log(data.results);
        dispatch({type: "dataReceived", payload: data.results})
      }
      catch(err){
        dispatch({type: "error"})
        console.log(err.message);
      }
    }
    fetchData();
  }, [])
  return (
    <div className="app">
      <Header />
      <Main> 
        {status === "loading" && <Loading />}
        {status === "error" && <ErrorScreen />}
        {status === "ready" && <StartScreen dispatch={dispatch}/>}
        {status === "active" && <>
          <Progress numQuestions={numQuestions} index={index} score={score}/>
          <Question dispatch={dispatch} questions={questions} index={index} answer={answer} numQuestions={numQuestions}/>
        </>}
        {status === "finish" && <FinishScreen dispatch={dispatch} score={score} highscore={highScore} numQuestions={numQuestions}/>}
      </Main>
    </div>
  )
}

export default App

import React from "react";
import QuizPage from "./quizPage";
import { Link } from "react-router-dom";
export default function landingPage(){
    return(
        <div className="landing-page">
            <div className="gm-nm">
            <h1 >Quizzical</h1>
            </div>
            <h3 className="info"> Welcome to the Quiz App! </h3>
            <p className="desc">This app presents you with a series of random questions. 
            Read each question carefully and select the answer you believe is correct. 
            Once you have answered all the questions, click on 'Check Answers' to see your score. 
            If you want to try again, click on 'Play Again'. </p>
            <h3>Goodluck!</h3>
            <Link to ="/quizPage"> <button className="strt-gm"> Start quiz </button> </Link> 
        </div>
    )
}
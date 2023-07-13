import React from "react";
import {  Route, Routes, BrowserRouter } from 'react-router-dom';
import LandingPage from "./pages/landingPage";
import QuizPage from "./pages/quizPage";

export default function App(){
return(
  <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/quizpage" element = {<QuizPage/>}/>
      </Routes>
    </BrowserRouter>
  </div>
)
}
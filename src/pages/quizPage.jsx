import React, {useState, useEffect}from "react";
import Quiz from "../components/quiz";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function QuizPage() {
    const [questions, setQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState({})
    const [allAnswersCorrect, setAllAnswersCorrect] = useState(false)
    const [check, setCheck]= useState(false)
    const [score, setScore] = useState(0);
    const [allQuestionsAnswered, setAllQuestionsAnswered]= useState(false)
    const [showAnswers, setShowAnswers] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false)
  
    function handleChange(questionId, ansId) {
      setSelectedAnswer(prevSelectedAnswer => ({
        ...prevSelectedAnswer,
        [questionId]: ansId
    }));  
    setTimeout(() => {
      const selectedOption = questions.find(question => question.id === questionId);
      if (selectedOption && ansId === selectedOption.correctAnswer) {
        setScore(score + 1);
      }
    }, 0);

  
};

function checkAnswers() {
   const allAnswersCorrect = questions.every(question => {
    const selectedAnswerId = selectedAnswer[question.id];
    return selectedAnswerId === question.correctAnswer;
   });

  const allQuestionsAnswered = questions.every(question => {
    return selectedAnswer[question.id] !== undefined;
  });

  setAllAnswersCorrect(allAnswersCorrect);
  setAllQuestionsAnswered(allQuestionsAnswered);
  
  if(allQuestionsAnswered){
    setShowAnswers(true)
    setCheck(true)
  }
  else{
    setIsSubmitted(true)
    alert("Please answer all questions before checking answers.")
  }
}
function playAgain(){
  setSelectedAnswer({})
  setScore(0)
  setCheck(false)
  fetchQuiz()
  setShowAnswers(false)
  setAllAnswersCorrect(false)
  setAllQuestionsAnswered(false)
}

useEffect(()=>{
  fetchQuiz()
},[])
  
   function fetchQuiz() {
    const randomAnswers = (answer) => answer.sort(() => Math.random() - 0.5)
        fetch("https://opentdb.com/api.php?amount=5")
          .then(res => res.json())
          .then((quizArray) => {
            const newQuizArray = quizArray.results.map((quizQuestion) => {
              const answer = randomAnswers([
                quizQuestion.correct_answer,
                ...quizQuestion.incorrect_answers
                        ]);
              return {
                question: quizQuestion.question,
                answer: answer,
                correctAnswer: quizQuestion.correct_answer,
                id :nanoid()
              };
            });
            setQuestions(newQuizArray);
          });
      };
      

    return(
        <div className="quizPage">
            {questions.map((question)=> (
            <Quiz
            key ={question.id}
            question ={question.question}
            id={question.id}
             name ={`question_${question.id}`} 
             disabled={check}
             checked={selectedAnswer[question.id]}
              onChange ={handleChange}
              answer={question.answer}
               showAnswers = {showAnswers}
               isSubmitted = {isSubmitted}
                correctAns = {question.correctAnswer}
            />

            ))}
          <div className="score-check">
            <p>{allAnswersCorrect&&allQuestionsAnswered?(
            <>
            <Confetti/>
             `yayy! you scored ${score}/5 correct answers ` 
             </> )
             :
             allQuestionsAnswered? `you scored ${score}/5 correct answer(s)`:""}
             </p>
           <button className="chk-ans" 
           onClick= { allQuestionsAnswered?  playAgain :checkAnswers} >
            {allQuestionsAnswered? "play again":"checkAnswers" }</button>
          </div>
        </div>
    )
}
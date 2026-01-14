import React, { useState } from 'react';
import { QuizService, Question, QuizResult } from './quizService';
import './App.css';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);

  const startQuiz = async () => {
    setLoading(true);
    const quizQuestions = await QuizService.generateQuiz(5);
    setQuestions(quizQuestions);
    setStartTime(Date.now());
    setLoading(false);
    setShowQuiz(true);
  };

  const handleAnswerSelect = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate result
      const endTime = Date.now();
      const timeTaken = startTime ? (endTime - startTime) / 1000 : 0;
      let score = 0;
      questions.forEach((q, i) => {
        if (selectedAnswers[i] === q.correctIndex) score++;
      });
      const quizResult = QuizService.calculateIQ(score, questions.length, timeTaken);
      setResult(quizResult);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };


  const restartQuiz = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setStartTime(null);
    setResult(null);
    setShowQuiz(false);
  };

  if (!showQuiz) {
    return (
      <div className="App landing">
        <div className="brain-animation">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 10C45 10 30 20 25 35C20 50 25 65 35 75C45 85 55 90 60 90C65 90 75 85 85 75C95 65 100 50 95 35C90 20 75 10 60 10Z" fill="#6c5ce7"/>
            <path d="M40 40C35 45 35 55 40 60C45 65 55 65 60 60C65 55 65 45 60 40C55 35 45 35 40 40Z" fill="#a29bfe"/>
            <path d="M70 40C65 45 65 55 70 60C75 65 85 65 90 60C95 55 95 45 90 40C85 35 75 35 70 40Z" fill="#a29bfe"/>
            <path d="M50 70C45 75 45 85 50 90C55 95 65 95 70 90C75 85 75 75 70 70C65 65 55 65 50 70Z" fill="#74b9ff"/>
          </svg>
        </div>
        <h1>IQ-tester</h1>
        <p>Challenge your mind with our scientifically designed IQ assessment!</p>
        <button onClick={startQuiz} disabled={loading}>
          {loading ? 'Loading...' : 'Start IQ Test'}
        </button>
      </div>
    );
  }

  if (loading) {
    return <div className="App">Loading quiz...</div>;
  }

  if (result) {
    const shareScore = () => {
      const message = `I just took an IQ test on IQ-tester! I scored ${result.score}/${result.totalQuestions} and my estimated IQ is ${result.calculatedIQ}. Try it yourself at [your app URL]!`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    };

    const inviteFriends = () => {
      const message = `Hey! Check out this awesome IQ testing app called IQ-tester. Challenge your mind and see your estimated IQ score! [your app URL]`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    };

    return (
      <div className="App">
        <h1>IQ Quiz Result</h1>
        <p>Score: {result.score}/{result.totalQuestions}</p>
        <p>Time Taken: {Math.round(result.timeTakenSeconds)} seconds</p>
        <p>Estimated IQ: {result.calculatedIQ}</p>
        <p>Percentile: {result.percentile}%</p>
        <div className="share-buttons">
          <button onClick={shareScore} className="share-btn whatsapp">
            Share Score on WhatsApp
          </button>
          <button onClick={inviteFriends} className="share-btn invite">
            Invite Friends
          </button>
        </div>
        <button onClick={restartQuiz}>Take Another Quiz</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="App">
      <h1>IQ Quiz</h1>
      <div className="question">
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p>{currentQuestion.text}</p>
        <div className="options">
          {currentQuestion.options.map((option: string, index: number) => (
            <button
              key={index}
              className={`option ${selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="navigation-buttons">
          {currentQuestionIndex > 0 && (
            <button onClick={previousQuestion}>
              Previous
            </button>
          )}
          <button onClick={nextQuestion} disabled={selectedAnswers[currentQuestionIndex] === undefined}>
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

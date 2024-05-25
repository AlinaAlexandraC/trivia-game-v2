import QuestionCard from "../Components/QuestionCard/QuestionCard";
import { useState, useEffect } from 'react';
import { fetchQuestions } from '../http/questions';
import duck from '../assets/cxyduck.gif';
import middleDuck from '../assets/rubber-duck1.gif';
import sadDuck from '../assets/sad-cry.gif';
import Swal from 'sweetalert2';
import NoQuestionsAvailable from "./NoQuestionsAvailable";
import QuestionsController from "../Components/QuestionsController/QuestionsController";

const TriviaGame = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [answersPool, setAnswersPool] = useState([]);
    const [score, setScore] = useState(0);
    const feedbacks = [
        "Oops! Looks like you didn't quite make it this time. Keep practicing and try again to reach that winning score!", // (for scores below 49)
        "Great job! You're on the right track. With a bit more effort and focus, you'll be soaring towards victory in no time!", // (for scores between 50 and 79)
        "Congratulations! You nailed it! Your score is over 80, which means you're a true quiz master! Keep up the great work!" // (for scores over 80)
    ];
    const apiUrl = localStorage.getItem('apiUrl');

    function HTMLDecode(textString) {
        let doc = new DOMParser().parseFromString(textString, "text/html");
        return doc.documentElement.textContent;
    }

    const getQuestions = async () => {
        try {
            const cachedIndex = localStorage.getItem('quizIndex');
            const initialIndex = cachedIndex ? parseInt(cachedIndex) : 0;
            setIndex(initialIndex);

            const cachedQuestions = localStorage.getItem('cachedQuestions');

            if (cachedQuestions) {
                setQuestions(JSON.parse(cachedQuestions));
                setLoading(false);
            } else {
                const questionsData = await fetchQuestions(apiUrl);
                setQuestions(questionsData);
                const questionsInfo = questionsData.map((question, index) => ({
                    id: index + 1,
                    question: HTMLDecode(question.question),
                    correct_answer: question.correct_answer,
                    incorrect_answers: question.incorrect_answers
                }));

                setQuestions(questionsInfo);
                setLoading(false);
                localStorage.setItem('cachedQuestions', JSON.stringify(questionsInfo));
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    useEffect(() => {
        if (questions.length > 0) {
            const currentQuestion = questions[index];
            let answersPoolArray = [...currentQuestion.incorrect_answers];
            let correctAnswerPos = Math.floor(Math.random() * 4) + 1;
            answersPoolArray.splice(correctAnswerPos - 1, 0, currentQuestion.correct_answer);
            setAnswersPool(answersPoolArray);
        }
    }, [questions, index]);
    // TODO: when an answer is selected, the correct answer will be in green and the incorrect answers should be in red
    // TODO: next question should not be changed automatically, but only when next button is clicked
    const handleAnswerSelection = (isCorrect) => {
        let scoreProcentage = ((100 / questions.length) * score).toFixed(2);
        if (index === questions.length - 1) {
            if (scoreProcentage < 50) {
                Swal.fire({
                    title: `You mastered ${scoreProcentage} % of the quiz`,
                    text: feedbacks[0],
                    imageUrl: sadDuck,
                    imageWidth: 200,
                    imageAlt: "sad duck",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Play again?",
                    cancelButtonText: 'Back to Main Menu',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        restartGame();
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        window.location.href = '/';
                    }
                });
            } else if (scoreProcentage > 49 && scoreProcentage < 80) {
                Swal.fire({
                    title: `You mastered ${scoreProcentage} % of the quiz`,
                    text: feedbacks[1],
                    imageUrl: middleDuck,
                    imageWidth: 200,
                    imageAlt: "confident duck",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Play again?",
                    cancelButtonText: 'Back to Main Menu',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        restartGame();
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        window.location.href = '/';
                    }
                });
            } else {
                Swal.fire({
                    title: `You mastered ${scoreProcentage} % of the quiz`,
                    text: feedbacks[2],
                    imageUrl: duck,
                    imageWidth: 200,
                    imageAlt: "cool duck",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Play again?",
                    cancelButtonText: 'Back to Main Menu',
                    allowOutsideClick: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        restartGame();
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        window.location.href = '/';
                    }
                });
            }
        }
        if (isCorrect) {
            setScore(score + 1);
        }
    };

    const restartGame = () => {
        localStorage.removeItem('cachedQuestions');
        localStorage.removeItem('quizIndex');
        setLoading(true);
        getQuestions();
        setIndex(0);
        setScore(0);
    };

    return (
        <div className="trivia-game">
            <div className="question-card position-relative">
                {loading ? (
                    <div className="loader-container d-flex justify-content-center m-5">
                        <div className="loader"></div>
                    </div>
                ) : (
                    <div >
                        <div>
                            {questions.length > 0 ? (
                                <div>
                                    <QuestionCard index={index} questions={questions} loading={loading} answersPool={answersPool} handleAnswerSelection={handleAnswerSelection} score={score} restartGame={restartGame} HTMLDecode={HTMLDecode} />
                                    <QuestionsController index={index} questions={questions} setIndex={setIndex} />
                                </div>
                            ) : (
                                <NoQuestionsAvailable />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TriviaGame;
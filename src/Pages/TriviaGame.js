import QuestionCard from "../Components/QuestionCard/QuestionCard";
import { useState, useEffect } from "react";
import { fetchQuestions } from "../http/questions";

import NoQuestionsAvailable from "./NoQuestionsAvailable";
import QuestionsController from "../Components/QuestionsController/QuestionsController";

const TriviaGame = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);
    const [answersPool, setAnswersPool] = useState([]);
    const [score, setScore] = useState(0);
    const apiUrl = localStorage.getItem("apiUrl");

    function HTMLDecode(textString) {
        let doc = new DOMParser().parseFromString(textString, "text/html");
        return doc.documentElement.textContent;
    }

    const getQuestions = async () => {
        try {
            const cachedIndex = localStorage.getItem("quizIndex");
            const initialIndex = cachedIndex ? parseInt(cachedIndex) : 0;
            setIndex(initialIndex);

            const cachedQuestions = localStorage.getItem("cachedQuestions");

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
                    incorrect_answers: question.incorrect_answers,
                }));

                setQuestions(questionsInfo);
                setLoading(false);
                localStorage.setItem("cachedQuestions", JSON.stringify(questionsInfo));
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
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
            answersPoolArray.splice(
                correctAnswerPos - 1,
                0,
                currentQuestion.correct_answer
            );
            setAnswersPool(answersPoolArray);
        }
    }, [questions, index]);

    // TODO: find alternative to pointerEvents to keep the background white and no hover
    // TODO: keep in localStorage the response for previous answers

    const handleAnswerSelection = () => {
        const answers = document.querySelectorAll(".answer");

        answers.forEach((answer) => {
            answer.addEventListener("click", selectAnswer);
        });

        function selectAnswer(event) {
            const selectedAnswer = event.target;

            if (selectedAnswer.classList.contains("correct-answer")) {
                selectedAnswer.style.backgroundColor = "green";
                setScore(score + 1);
            } else if (selectedAnswer.classList.contains("incorrect-answer")) {
                selectedAnswer.style.backgroundColor = "red";
            }

            answers.forEach((answer) => {
                answer.style.pointerEvents = "none";
                answer.style.opacity = "0.5";

                if (answer != selectedAnswer && selectedAnswer.classList.contains("incorrect-answer")) {
                    if (answer.classList.contains("incorrect-answer")) {
                        answer.style.border = "solid red 3px";                        
                    } else {
                        answer.style.border = "solid green 3px";
                    }
                }

                answer.removeEventListener("click", selectAnswer);
            });
        }
    };

    const restartGame = () => {
        localStorage.removeItem("cachedQuestions");
        localStorage.removeItem("quizIndex");
        localStorage.removeItem("currentIndex");
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
                    <div>
                        <div>
                            {questions.length > 0 ? (
                                <div>
                                    <QuestionCard
                                        index={index}
                                        questions={questions}
                                        loading={loading}
                                        answersPool={answersPool}
                                        handleAnswerSelection={handleAnswerSelection}
                                        score={score}
                                        restartGame={restartGame}
                                        HTMLDecode={HTMLDecode}
                                    />
                                    <QuestionsController
                                        index={index}
                                        questions={questions}
                                        setIndex={setIndex}
                                        score={score}
                                        restartGame={restartGame}
                                    />
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

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
    const [selectedAnswers, setSelectedAnswers] = useState(Array(10).fill(null));
    const apiUrl = localStorage.getItem("apiUrl");

    const HTMLDecode = (textString) => {
        let doc = new DOMParser().parseFromString(textString, "text/html");
        return doc.documentElement.textContent;
    };

    const getQuestions = async () => {
        try {
            const cachedIndex = localStorage.getItem("quizIndex");
            const initialIndex = cachedIndex ? parseInt(cachedIndex) : 0;
            setIndex(initialIndex);

            const cachedQuestions = localStorage.getItem("cachedQuestions");
            const cachedSelectedAnswers = localStorage.getItem("selectedAnswers");

            if (cachedQuestions) {
                const parsedQuestions = JSON.parse(cachedQuestions);
                setQuestions(parsedQuestions);
                setSelectedAnswers(cachedSelectedAnswers ? JSON.parse(cachedSelectedAnswers) : Array(parsedQuestions.length).fill(null));
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
                setSelectedAnswers(Array(questionsInfo.length).fill(null));
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

    const handleAnswerSelection = (selectedAnswer) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[index] = selectedAnswer;
        setSelectedAnswers(newSelectedAnswers);

        if (selectedAnswer === questions[index].correct_answer) {
            setScore(score + 1);
        }

        localStorage.setItem("selectedAnswers", JSON.stringify(newSelectedAnswers));
    };

    const restartGame = () => {
        localStorage.removeItem("cachedQuestions");
        localStorage.removeItem("quizIndex");
        localStorage.removeItem("selectedAnswers");
        setLoading(true);
        getQuestions();
        setIndex(0);
        setScore(0);
        setSelectedAnswers(Array(questions.length).fill(null));
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
                                        selectedAnswer={selectedAnswers[index]}
                                    />
                                    <QuestionsController
                                        index={index}
                                        questions={questions}
                                        setIndex={setIndex}
                                        score={score}
                                        restartGame={restartGame}
                                        selectedAnswers={selectedAnswers}
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

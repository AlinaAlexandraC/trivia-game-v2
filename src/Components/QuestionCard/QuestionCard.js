import InGameMenu from '../InGameMenu/InGameMenu';
import './QuestionCard.css';

const QuestionCard = ({ index, questions, answersPool, handleAnswerSelection, score, restartGame, HTMLDecode, selectedAnswer }) => {
    const currentQuestion = questions[index];

    const handleClick = (answer) => {
        if (selectedAnswer !== null) return;
        handleAnswerSelection(answer);
    };

    return (
        <div className="question-card-container d-flex position-relative">
            <InGameMenu score={score} restartGame={restartGame} />
            <div>
                <div className='question mt-5'>
                    {HTMLDecode(currentQuestion.question)}
                </div>
                <div className="answers-container d-flex flex-column justify-content-center align-content-center pt-3 pb-3">
                    {answersPool.length > 0 && questions[index] && answersPool.map((answer, answerIndex) => (
                        <div key={answerIndex} onClick={() => handleClick(answer)} className={`answer ${selectedAnswer !== null ? (answer === currentQuestion.correct_answer ? 'correct-answer gradient-green' : (selectedAnswer === answer ? 'incorrect-answer gradient-red' : '')) : ''} d-flex flex-row justify-content-center align-content-center p-3`}
                            style={{
                                backgroundColor: selectedAnswer ? (answer === currentQuestion.correct_answer ? 'green' : selectedAnswer === answer ? 'red' : '') : '',
                                pointerEvents: selectedAnswer ? 'none' : 'auto'
                            }}>{HTMLDecode(answer)}</div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default QuestionCard;


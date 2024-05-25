import InGameMenu from '../InGameMenu/InGameMenu';
import './QuestionCard.css';

const QuestionCard = ({ index, questions, answersPool, handleAnswerSelection, score, restartGame, HTMLDecode }) => {
    
    return (
        <div className="question-card-container d-flex position-relative">
            <InGameMenu score={score} restartGame={restartGame} />
            <div>
                <div className='question mt-5'>{questions[index].question}
                </div>
                <div className="answers-container d-flex flex-column justify-content-center align-content-center pt-3 pb-3">
                    {answersPool.length > 0 && questions[index] && answersPool.map((answer, answerIndex) => (
                        <div key={answerIndex} onClick={() => handleAnswerSelection(answer === questions[index].correct_answer)} className={`answer ${answer === questions[index].correct_answer ? 'correct-answer' : 'incorrect-answer'} d-flex flex-row justify-content-center align-content-center p-3`}>{HTMLDecode(answer)}</div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default QuestionCard;


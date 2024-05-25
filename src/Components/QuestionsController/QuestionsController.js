import './QuestionsController.css';

const QuestionsController = ({ index, setIndex, questions }) => {
    const getPreviousQuestion = () => {
        setIndex(index - 1);
    };

    const getNextQuestion = () => {
        setIndex(index + 1);
    };
    // TODO: when index is 1, 'Previous' button should be disabled
    // TODO: when index is equal to questions.length, 'Next' button should be replaced with 'End Game'
    return (
        <div className='questions-controller d-flex flex-row justify-content-around position-absolute bottom-0 mb-5'>
            <button className='previous hero-btn btn mx-3 my-3' onClick={() => getPreviousQuestion()}>Previous</button>
            <div className="question-tracker mx-3 my-3">{`${index + 1} / ${questions.length}`}</div>
            <button className="next hero-btn btn mx-3 my-3" onClick={() => getNextQuestion()}>Next</button>
        </div>
    );
};

export default QuestionsController;
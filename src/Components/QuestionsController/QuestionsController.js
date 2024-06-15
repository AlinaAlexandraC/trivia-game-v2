import './QuestionsController.css';
import duck from '../../assets/cxyduck.gif';
import middleDuck from '../../assets/rubber-duck1.gif';
import sadDuck from '../../assets/sad-cry.gif';
import Swal from 'sweetalert2';

const QuestionsController = ({ index, questions, score, restartGame, setIndex, selectedAnswers }) => {
    const feedbacks = [
        "Oops! Looks like you didn't quite make it this time. Keep practicing and try again to reach that winning score!", // (for scores below 49)
        "Great job! You're on the right track. With a bit more effort and focus, you'll be soaring towards victory in no time!", // (for scores between 50 and 79)
        "Congratulations! You nailed it! Your score is over 80, which means you're a true quiz master! Keep up the great work!" // (for scores over 80)
    ];

    const handlePrevious = () => {
        setIndex(index - 1);
        localStorage.setItem('quizIndex', index - 1);
    };

    const handleNext = () => {
        setIndex(index + 1);
        localStorage.setItem('quizIndex', index + 1);
    };

    const endGame = () => {
        const unansweredQuestions = selectedAnswers.filter(answer => answer === null);

        if (unansweredQuestions.length > 0) {
            Swal.fire("Complete all questions to end the game");
            Swal.fire({
                text: "Complete all questions to end the game",
                icon: "warning",
                allowOutsideClick: false
              });
            return;
        }

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
    };

    return (
        <div className='questions-controller d-flex flex-row justify-content-around position-absolute bottom-0 mb-5'>
            <button className='previous hero-btn btn mx-3 my-3' onClick={handlePrevious} disabled={index === 0}>Previous</button>
            <div className="question-tracker mx-3 my-3">{`${index + 1} / ${questions.length}`}</div>
            {index < questions.length - 1 ? (
                <button className="next hero-btn btn mx-3 my-3" onClick={handleNext}>Next</button>
            ) : (
                <button className="end-game hero-btn btn mx-3 my-3" onClick={endGame}>End Game</button>
            )}
        </div>
    );
};

export default QuestionsController;
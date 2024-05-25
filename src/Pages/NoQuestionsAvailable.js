import dinosaur from '../assets/dinosaur-dancing.gif';
import { useNavigate } from "react-router-dom";

const NoQuestionsAvailable = () => {
    const navigate = useNavigate();
    
    return (
        <div className="no-questions">
            <div className="no-questions m-5 p-5 rounded">
                <img src={dinosaur} alt="dancing-dinosaur" className="rounded-circle" />
                <p className="first-paragraph pt-5">No questions available</p>
                <p className="second-paragraph">But here's a dancing dinosaur instead</p>
                <button onClick={() => navigate(-1)} className="hero-btn btn text-center">Back</button>
            </div>
        </div>
    );
};

export default NoQuestionsAvailable;
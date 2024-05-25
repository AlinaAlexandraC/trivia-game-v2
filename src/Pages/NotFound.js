import { useNavigate } from "react-router-dom";
import mouse from '../assets/rat-breakdance.gif';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found">
            <img src={mouse} alt="dancing-dinosaur" className="rounded-circle" />
            <p className="first-paragraph pt-5">Page Not Found</p>
            <p className="second-paragraph">But here's a mouse breakdancing instead</p>
            <button onClick={() => navigate(-1)} className="hero-btn btn text-center">Back</button>
        </div>
    );
};

export default NotFound;
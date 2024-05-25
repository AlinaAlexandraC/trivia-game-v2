import "./InGameMenu.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import restart from "../../assets/restart.svg";

const InGameMenu = ({ restartGame, score }) => {
    return (
        <div className="in-game-menu-container d-flex flex-row justify-content-between align-items-center pt-3 p-0 position-absolute top-0">
            <div className="restart-game d-flex flex-row justify-content-between" onClick={() => restartGame()}>
                <img className="restart-arrow m-lg-3" src={restart} alt="restart-game" />
                <p className="restart m-lg-3">Restart Game</p>
            </div>
            <Link to="/" className="game-logo">
                <img src={logo} alt="logo" />
            </Link>
            <div className="game-score d-flex flex-row justify-content-between">
                <p className="score m-lg-3">Points</p>
                <p className="points m-lg-3">{score}</p>
            </div>
        </div>
    );
};

export default InGameMenu;

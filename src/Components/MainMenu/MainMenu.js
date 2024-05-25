import { Link, Navigate, useNavigate } from 'react-router-dom';
import './MainMenu.css';
import { useState } from 'react';
import TriviaGame from '../../Pages/TriviaGame';

const MainMenu = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [amountError, setAmountError] = useState(false);
    const [apiUrl, setApiUrl] = useState('');
    const shouldRender = false;

    const categories = ['Any Category', 'General Knowledge', 'Entertainment: Books', 'Entertainment: Film', 'Entertainment: Music', 'Entertainment: Musicals & Theatres', 'Entertainment: Television', 'Entertainment: Video Games', 'Entertainment: Board Games', 'Science & Nature', 'Science: Computers', 'Science: Mathematics', 'Mythology', 'Sports', 'Geography', 'History', 'Politics', 'Art', 'Celebrities', 'Animals', 'Vehicles', 'Entertainment: Comics', 'Science: Gadgets', 'Entertainment: Japanese Anime & Manga', 'Entertainment: Cartoon & Animations'];
    const difficultyLevel = ['Difficulty', 'Easy', 'Medium', 'Hard'];

    const handleStartGame = () => {
        setAmountError('');
        localStorage.clear();
        getApiUrl();
        if (!amount) {
            setAmountError('Please select an amount');
            return;
        } else {
            navigate(`/question`);
        }
    };

    const getApiUrl = () => {
        if ((category !== '' && category !== 'Any Category') && (difficulty !== '' && difficulty !== 'Difficulty')) {
            setApiUrl(`https://opentdb.com/api.php?amount=${amount}&category=${categories.indexOf(category) + 8}&difficulty=${(difficulty).toLowerCase()}`);
            localStorage.setItem('apiUrl', `https://opentdb.com/api.php?amount=${amount}&category=${categories.indexOf(category) + 8}&difficulty=${(difficulty).toLowerCase()}`)
        } else if ((category === '' || category === 'Any Category') && (difficulty !== '' && difficulty !== 'Difficulty')) {
            setApiUrl(`https://opentdb.com/api.php?amount=${amount}&difficulty=${(difficulty).toLowerCase()}`);
            localStorage.setItem('apiUrl', `https://opentdb.com/api.php?amount=${amount}&difficulty=${(difficulty).toLowerCase()}`)
        } else if ((category !== '' && category !== 'Any Category') && (difficulty === '' || difficulty === 'Difficulty')) {
            setApiUrl(`https://opentdb.com/api.php?amount=${amount}&category=${categories.indexOf(category) + 8}`);
            localStorage.setItem('apiUrl', `https://opentdb.com/api.php?amount=${amount}&category=${categories.indexOf(category) + 8}`)
        } else {
            setApiUrl(`https://opentdb.com/api.php?amount=${amount}`);
            localStorage.setItem('apiUrl', `https://opentdb.com/api.php?amount=${amount}`)
        }
    };

    return (
        <div className="main-menu-container d-flex flex-column justify-content-center align-items-center">
            <div className="main-menu">
                <h1 className='game-title p-3'>Trivia Game</h1>
                <div className='menu d-flex flex-column justify-content-center align-items-center p-5'>
                    <div className='game-select'>
                        <input type="number" name="amount" className="hero-btn amount text-center" placeholder='Amount' min={1} max={1000}
                            onChange={(e) => setAmount(e.target.value)}
                            onKeyDown={(e) => {
                                if ((isNaN(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') || (e.key === '0' && amount === '')) {
                                    e.preventDefault();
                                    setAmountError('Please enter a valid amount (greater than or equal to 1)');
                                } else {
                                    setAmountError('');
                                }
                            }}
                        />
                    </div>
                    <div className='game-select'>
                        <div className="select-container hero-btn category">
                            <select className="select-box hero-btn" onChange={(e) => setCategory(e.target.value)}>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='game-select'>
                        <div className="select-container hero-btn difficulty">
                            <select className="select-box hero-btn" onChange={(e) => setDifficulty(e.target.value)}>
                                {difficultyLevel.map((difficulty, index) => (
                                    <option key={index} value={difficulty}>{difficulty}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="buttons pt-3">
                <div className="hero-btn submit" onClick={handleStartGame}>Start Game</div>
                <Link className='hero-btn text-decoration-none' to='/rules'>
                    <div className="hero-btn rules-btn">Check Rules</div>
                </Link>
                {amountError && <div className="error-label">{amountError}</div>}
            </div>
            {/* TODO: API url should be taken from the handleStartGame function */}
            {shouldRender && (
                <div>
                    <TriviaGame apiUrl={apiUrl} />
                </div>
            )}
        </div>
    );
};

export default MainMenu;
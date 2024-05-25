import axios from 'axios';

const fetchQuestions = async (apiUrl) => {
    const response = await axios.get(apiUrl);

    return response.data.results;
};

export {
    fetchQuestions
};
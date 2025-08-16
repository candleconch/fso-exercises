import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';

const getEntries = (url) => {
    const request = axios.get(url);
    return request.then(response => response.data);
}
const makeEntry = (name, number) => {
    const request = axios.post(baseUrl, {name, number});
    return request.then(response => response.data);
    
}

export default {
    makeEntry,
    getEntries
};
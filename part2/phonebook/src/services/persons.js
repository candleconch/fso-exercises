import axios from "axios";

const getEntries = (url) => {
    const request = axios.get(url);
    return request.then(response => response.data);
}
const makeEntry = (name, number) => {
    const request = axios.post(baseUrl, {name, number});
    return request.then(response => response.data);
    
}
const updateEntry = (id, person, newNumber) => {
    const request = axios.put(`${baseUrl}/${id}`, {...person, number: newNumber});
    return request.then(response => response.data);
}
const deleteEntry = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);

}

export default {
    makeEntry,
    getEntries,
    updateEntry,
    deleteEntry
};
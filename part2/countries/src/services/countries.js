import axios from 'axios';
const allUrl ="https://studies.cs.helsinki.fi/restcountries/api/all" 
const oneUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/" 

const getAll = () => {
    const request = axios.get(allUrl)
    return request.then(response => response.data)
}

const getOne = (countryName) => {
    const request = axios.get(`${oneUrl}/${countryName}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    getOne
}
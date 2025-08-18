import axios from 'axios';

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`//lat={lat}&lon={lon}&appid={API key}`
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather= country => {
    const latlng = country.capitalInfo.latlng;
    const request = axios.get(`${baseUrl}lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`);
    console.log(request)
    
    return request.then(response => response.data)
}

export default {
    getWeather,
}
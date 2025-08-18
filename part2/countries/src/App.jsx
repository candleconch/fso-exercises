import { useEffect, useState } from "react";
import countryServices from './services/countries';
import weatherServices from './services/weather';

const Input = ({value, onChange}) => {
  
  return (
    <>
      <label>
        find countries:
        <input type="text" value={value} onChange={onChange}/>
      </label>
    </>
  );
};

const Country = ({country, wind, temp, icon}) => {
  if (Object.keys(country).length === 0) return null;
  
  return (
  <div className="country">
    <h1>{country.name.common}</h1>
    <p>Capital {country.capital[0]}</p>
    <p>Area {country.area}</p>
    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map(l => {
        return <li key={l}>{l}</li>
      })}
    </ul>
    <img src={country.flags["svg"]} alt={`${country.name.common}'s flag`} width='400px'/>
    <h2>Weather in {country.capital[0]}</h2>
    <p className="info-message">Temperature: {temp} deg Celsius</p>
    <img className="icon" src={`https://openweathermap.org/img/wn/${icon}@2x.png`}/>
    <p className="info-message">Wind: {wind} m/s</p>
  </div>
  )
}
const Output = ({ countries, country, showUnique, temperature, icon, wind }) => {
  const multipleCountries = (<div>
      {countries.map((country) => {
        return (
        <div key={country.name.official}>
          <p>{country.name.common}</p>
          <button onClick={() => showUnique(countries, country.name.common)}>Show</button>
        </div>
        )
      })}
    </div>);

    const output = countries.length > 1 ? multipleCountries
    : <Country country={country} wind={wind} temp={temperature} icon={icon}/>
    //console.log('Output runs...',countries, country, output);
    
  return countries.length > 10 ? (
    <p className="info-message">Too many matches, specify another filter</p>
  ) : output;
};
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({})
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState([]);
  const [temperature, setTemperature] = useState('')
  const [icon, setIcon] = useState('');
  const [windSpeed, setWindSpeed] = useState(0);
  
  useEffect(()=>{
    countryServices.getAll()
    .then(response => {
      setCountries(response)
    })
  
  },[]);

  useEffect(() => {
    if (shown.length === 1) {
      const countryName = shown[0].name.common;
      countryServices.getOne(countryName)
      .then(response => {
        setCountry(response)
    })
  } else {
    setCountry({})
  }
  },[shown])

  // fetching weather data
  useEffect(() => {
    if (Object.keys(country).length === 0) return;
    debugger;
    weatherServices.getWeather(country)
    .then(response => {
      setTemperature(response.main.temp)
      setIcon(response.weather[0].icon)
      setWindSpeed(response.wind.speed)
    })
  },[country])

  const handleChange = (e) => {
  const newValue = e.target.value;
  setQuery(newValue);
  if (newValue.trim() === "") {
    setShown([]);
    return;
  }
  setShown(countries.filter(country => country.name.common.toLowerCase().includes(newValue)))
};

  const showUnique = (countries, countryName) => {
    setShown(countries.filter(country => country.name.common === countryName))
    //console.log('showUnique runs...', countries, countryName)
    
  }

  return (
    <>
      <Input value={query} onChange={handleChange} />
      {query ?
      <Output 
        countries={shown} 
        country={country}
        showUnique={showUnique}
        temperature={temperature}
        icon={icon}
        wind={windSpeed}/>
       : <p className="info-message">Country info will show up here.</p>}
    </>
  );
}

export default App;

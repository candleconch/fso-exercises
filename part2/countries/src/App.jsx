import { useState } from "react";
import "./App.css";
const Input = ({value, onChange}) => {
  console.log(value)
  
  return (
    <>
      <label>
        find countries:
        <input type="text" value={value} onChange={onChange}/>
      </label>
    </>
  );
};

const Output = ({ countries }) => {
  return countries.length > 10 ? (
    <p>Too many matches, specify another filter</p>
  ) : (
    <div>
      {countries.map((country) => {
        return <p key={country}>{country}</p>;
      })}
    </div>
  );
};
function App() {
  const countries = [
    "Greece",
    "Italy",
    "France",
    "Greenland",
    "Finland",
    "Egypt",
    "Russia",
    "Brazil",
  ];
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState([]);
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
    if (newValue.trim() === "") {
      setShown(countries);
      return;
    }
    setShown(countries.filter(country => country.toLowerCase().includes(newValue)))
  };
  return (
    <>
      <Input value={query} onChange={handleChange} />
      <Output countries={shown} />
    </>
  );
}

export default App;

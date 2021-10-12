import React, { useState,useEffect} from "react";
import "./style.css";
import WeatherFun from "./weatherCard";



const Temp = () => {
  const [searchItem, setSearchItem] = useState("Beed");
  const [TempData, setTempData] = useState("")

  const getSearch = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&units=metric&appid=034e121c60473cd287f7184f326c0ff5`;

      const res=await fetch(url)
      const data=await res.json()
     
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
         
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset
      };
    
      setTempData(myNewWeatherInfo )
       
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSearch();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
          />

          <button className="searchButton" type="button" onClick={getSearch}>
            Search
          </button>
        </div>
      </div>
        <WeatherFun TempData={TempData}/>
    </>
  );
};

export default Temp;

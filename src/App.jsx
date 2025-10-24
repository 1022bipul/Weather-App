import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cityName,setCityName]=useState("")
  const [weatherData,setWeatherData]=useState({})

  const handleCityName=(e)=>{
    setCityName(e.target.value)
    // console.log(e.target.value)
    // console.log(cityName)
  }
  const API="99cae9d80a45e68a3740973f6b8be9f2"

  const handleWeather=async()=>{
    try {
      const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName||"patna"}&appid=${API}`)
      const data=await res.json()
      console.log(data)
      setWeatherData(data)


    } catch (error) {
      console.log("error",error)
    }

  }
 useEffect(()=>{
  handleWeather();
},[]) 


  return (
    
    <>
      {weatherData.main && weatherData.wind? 
      (<div className="h-screen bg-blue-300 w-full flex items-center justify-center">
        <div className="border-1 max-h-max max-w-max p-3 bg-blue-400 rounded-md  flex items-center justify-center flex-col">
          <h1 className="text-2xl">Weather App</h1>
          <div className="flex my-3">  
            <div className="text-xl">
              <input
               name="city"
               value={cityName}
               onChange={handleCityName}
                className="border outline-none bg-blue-300 py-1 px-2  rounded-md "
                type="text"
                placeholder="Search..."
              />
            </div>
            <button onClick={handleWeather} className=" bg-blue-300 cursor-pointer border px-2 ml-1 rounded-md">
              <img className="size-6" src="../src/assets/search.png" alt="" />
            </button>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <img className="size-30" src="../src/assets/cloud.png" alt="" />
            <h1 className="text-3xl"> {Math.floor(weatherData.main.temp)} °C</h1>
            <h2 className="text-2xl">{weatherData.name}</h2>
          </div>
          <div className="flex px-2 py-1 w-full justify-between mt-4">
            <div className="flex">
              <img
                className="size-6 p-1"
                src="../src/assets/humidity.png"
                alt=""
              />
              <div className="px-1">
                <h1 className="text-md">{weatherData.main.humidity} %</h1>
                <h2 className="text-md">Humidity</h2>
              </div>
            </div>
            <div className="flex">
              <img className="size-6 p-1" src="../src/assets/wind.png" alt="" />
              <div className="px-1">
                <h1 className="text-md">{weatherData.wind.speed} km/h</h1>
                <h2 className="text-md">Wind Speed</h2>
              </div>
            </div>
          </div>
        </div>
      </div>):<p>Loading...</p>}
    </>
  );
}

export default App;

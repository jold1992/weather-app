import { useState } from 'react'
import { useRef } from 'react'

function Box() {
    const container = useRef(null) //document.getElementById('container');
    const search = useRef(null)  //document.getElementById('btnSearch');
    const weatherBox = useRef(null) //document.getElementById('weather-box');
    const weatherDetails = useRef(null) // document.getElementById('weather-details');
    const error404 = useRef(null) // document.getElementById('not-found');
    const image = useRef(null) //document.querySelector('.weather-box img');
    const temperature = useRef(null) //document.querySelector('.weather-box .temperature');
    const description = useRef(null) //document.querySelector('.weather-box .description');
    const humidity = useRef(null) //document.querySelector('.weather-details .humidity span');
    const wind = useRef(null) //document.querySelector('.weather-details .wind span');

    const [city, setCity] = useState('')

    const onChangeText = (e) => {
        setCity(e.target.value);
    }

    const onClick = () => {

        const APIKey = 'b7f9cf956efd878631100e01a95e5f73';

        if (city === '')
            return;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => response.json())
            .then(json => {

                if (json.cod === '404') {
                    container.current.style.height = '400px';
                    weatherBox.current.style.display = 'none';
                    weatherDetails.current.style.display = 'none';
                    error404.current.style.display = 'block';
                    error404.current.classList.add('fadeIn');
                    return;
                }

                error404.current.style.display = 'none';
                error404.current.classList.remove('fadeIn');

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.current.src = '/assets/images/clear.png';
                        break;

                    case 'Rain':
                        image.current.src = '/assets/images/rain.png';
                        break;

                    case 'Snow':
                        image.current.src = '/assets/images/snow.png';
                        break;

                    case 'Clouds':
                        image.current.src = '/assets/images/cloud.png';
                        break;

                    case 'Haze':
                        image.current.src = '/assets/images/mist.png';
                        break;

                    default:
                        image.current.src = '';
                }

                temperature.current.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.current.innerHTML = `${json.weather[0].description}`;
                humidity.current.innerHTML = `${json.main.humidity}%`;
                wind.current.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                weatherBox.current.style.display = '';
                weatherDetails.current.style.display = '';
                weatherBox.current.classList.add('fadeIn');
                weatherDetails.current.classList.add('fadeIn');
                container.current.style.height = '450px';


            });

    }

    return (
        <main>
            <h1 className="text-white text-center pb-8">Weather <span className="text-gradient">App</span></h1>
            <div ref={container} className="container">
                <div className="search-box">
                    <i className="fa-solid fa-location-dot" />
                    <input ref={search} type="text" placeholder="Enter your location" value={city} onChange={onChangeText} />
                    <button className="fa-solid fa-magnifying-glass" onClick={onClick} />
                </div>

                <div ref={error404} className="not-found">
                    <img src="/assets/images/404.png" alt='no-found' />
                    <p>Oops! Invalid location :/</p>
                </div>

                <div ref={weatherBox} className="weather-box flex flex-col items-center">
                    <img ref={image} src="" alt='weather' />
                    <p ref={temperature} className="temperature" />
                    <p ref={description} className="description" />
                </div>

                <div ref={weatherDetails} className="weather-details">
                    <div className="humidity">
                        <i className="fa-solid fa-water" />
                        <div className="text">
                            <span ref={humidity} />
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="wind">
                        <i className="fa-solid fa-wind" />
                        <div className="text">
                            <span ref={wind} />
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Box;
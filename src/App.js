import './App.css';
import https from 'https';
import { Component } from 'react';

const api_key = 'd5dffb4be1ef4856e606fa1d6044221c'
const place='Kanigiri';
const unit = "metric";
// const api_place = `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=${unit}&appid=${api_key}`
const api_5place = `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${api_key}&units=${unit}`


// console.log(weatherapp)
class App extends Component {

  constructor() {
    super()
    this.state = {
      weather: []
    }
  }

  componentDidMount() {
    https.get(api_5place, (resp) => {
      console.log(resp.statusCode);
  
      resp.on('data', data => {
          const weatherData = JSON.parse(data);
          
          const weatherapp = []
          for (let weather of weatherData["list"]) {
            const temp = weather.main.temp;
            const weatherDescription = weather.weather[0].description;
            const icon = weather.weather[0].icon;
            const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            const date_txt = weather.dt_txt
            
            weatherapp.push({
              temp: temp,
              weatherDescription: weatherDescription,
              imageURL: imageURL,
              date_txt: date_txt
            })
          }
          console.log(weatherapp);
          this.setState({
              weather: [...weatherapp]
          })
      })
  })
  }

  render() {
    const { weather } = this.state;
    console.log(this.state);
    const details = weather.map(element => 
        <div key={element}>
          <h1>The temperature in {place} is {element.temp} deg celsius.</h1>
          <h3>The weather is currently {element.weatherDescription}</h3>
          <img src={element.imageURL} alt="weather condition" />
          <h3>{element.date_txt}</h3>
        </div>
    )
    return (
      <div className="App">
        {details}
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import Form from "./components/Form";
import WeatherDisplay from './components/WeatherDisplay'
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      keyData: null,
      forecast: []
    };
    this.apiKey = "WsKOMxmALDABUotf0p03wXOUI7zituBg";
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const location = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${this.apiKey}&q=${this.state.searchTerm}`
      );
      const data = response.json();
      return data;
    };
    await location().then(data => {
      this.setState({ keyData: data[0].Key });
    });

    const forecast = async () => {
      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${this.state.keyData}/?apikey=${this.apiKey}`
      );
      const data = response.json();
      return data;
    };
    forecast().then(data => {
      this.setState({ forecast: data }, () => console.log(this.state));
    });
  };

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };
  render() {
    const { forecast } = this.state;
    console.log(this.state);
    return (
      <div className="container">
        <h3 className="center blue-text">The Spidey Weather app</h3>
        <Form
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <WeatherDisplay forecast={this.state.forecast} />
      </div>
    );
  }
}

export default App;

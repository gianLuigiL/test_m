//Dependencies
import React, { Component } from 'react';
//Components
import Slider from './components/slider';
//Styles
import "./scss/app.scss";


class App extends Component {

  render() {
    return (
      <>
        <Slider animation_duration={200} items_per_page={3}/>
      </>
    );
  }
  
}

export default App;

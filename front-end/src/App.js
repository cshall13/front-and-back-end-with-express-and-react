import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props){
      super(props);
      // this initializes the variable 'theClass' inside of state. this allows state to be changed
      // !!!!!!!VERY IMPORTANT!!!!!!!!
      this.state = {
          theClass: []
      }
  }

  // this runs AFTER the first render
  componentDidMount() {
      // getJSON request to localhost:3000 ... thats where Express is
    $.getJSON('http://localhost:3000/getStudents', (studentsFromApi)=>{
        // log the JSON response from express
        console.log(studentsFromApi)
        //   update the state ... this will cause a re-render
        this.setState({
            theClass: studentsFromApi.students
        })
    });
    // dummy Array to do a bit of a sanity check that our '.map' is looping through the keys below
    //   this will be commented out later. this was done before we did anything to the back-end
    // this.setState({
    //     theClass: [1,2,3,4]
    // })
  }

  render() {

      // create an array to dump into our return. It will contain
      // components or HTML tags
      var theClassArray = [];
      // loop through our state variable
      this.state.theClass.map((student, index)=>{
          theClassArray.push(<li key={index}>{student}</li>)
      });

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <p>
              {/*array dropped from 'theClassArray.push(<li key={index}>{student}</li>)'*/}
              {theClassArray}
          </p>
      </div>
    );
  }
}

export default App;

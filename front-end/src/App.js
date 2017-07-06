// FRONT-END REACT


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
      this.addStudent = this.addStudent.bind(this);
  }

  // this runs AFTER the first render
  componentDidMount() {
      // getJSON request to localhost:3000 ... thats where Express is
    $.getJSON('http://localhost:3000/getStudents', (studentsFromApi)=>{
        // log the JSON response from express
        console.log(studentsFromApi)
        //   update the state ... this will cause a re-render
        this.setState({
            theClass: studentsFromApi
        })
    });
    // dummy Array to do a bit of a sanity check that our '.map' is looping through the keys below
    //   this will be commented out later. this was done before we did anything to the back-end
    // this.setState({
    //     theClass: [1,2,3,4]
    // })
  }

  addStudent(event){
      // ################################event is 'click', target is 'the button', parentNode is 'add-box', childNodes is 'input tag'
    var studentToAdd = event.target.parentNode.childNodes[0].value;
    // below is the same as above
    // var studentToAdd = document.getElmentById('newStudent')
    //   console.log(studentToAdd);

// ###############################                         ######################################

    //   this is a post request, so we cant use $.getJSON (only does get)
    //   $.ajax is a request that tells it what to send(data) where to send (url),
          // and how to send it (method)
      // $.ajax is a promise which has a done method that will run when the
      // ajax is back. it gets a param of whatever JSON was returned by the API request.
          // inside that function, we update react state (theClass), which causes a re-render,
      // which updates th list because we are mapping through 'this.state.theClass'
    $.ajax({
        method: "POST",
        url: "http://localhost:3000/addStudent",
        data: {name: studentToAdd}
    }).done((studentsArray)=>{
        this.setState({
            theClass: studentsArray
        })
    })
  }

  render() {

      // create an array to dump into our return. It will contain
      // components or HTML tags
      var theClassArray = [];
      // loop through our state variable
      this.state.theClass.map((student, index)=>{
          // push an li tag onto our array for each element in the state
          theClassArray.push(<li key={index}>{student.name}</li>)
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
          <div className="add-box">
              <input type="text" id="newStudent" />
              <button onClick={this.addStudent}>Add Student</button>
          <p>
              {/*array dropped from 'theClassArray.push(<li key={index}>{student}</li>)'*/}
              {theClassArray}
          </p>
          </div>
      </div>
    );
  }
}

export default App;

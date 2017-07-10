import React, {Component} from 'react';
import $ from 'jquery';
import logo from './logo.svg';
import {Link} from 'react-router-dom';


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            taskList: []
        };
            this.addNewTask = this.addNewTask.bind(this);
    }

    componentDidMount() {
        // getJSON request to localhost:3000 ... thats where Express is
        $.getJSON('http://localhost:3000/getTasks?apiKey=131313', (tasksFromApi)=>{
            // log the JSON response from express
            console.log(tasksFromApi)
            //   update the state ... this will cause a re-render
            this.setState({
                taskList: tasksFromApi
            })
        });
        // dummy Array to do a bit of a sanity check that our '.map' is looping through the keys below
        //   this will be commented out later. this was done before we did anything to the back-end
        // this.setState({
        //     theClass: [1,2,3,4]
        // })
    }

    addNewTask(event){
        event.preventDefault();
        console.log("User submitted form")
        var newTask = document.getElementById('new-task').value;
        var newTaskDate = document.getElementById('new-task-date').value;
        // below is the same as above
        // var studentToAdd = document.getElementById('newStudent')
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
            url: "http://localhost:3000/addTask",
            data: {
                taskName: newTask,
                taskDate: newTaskDate
            }
        }).done((tasksArray)=>{
            this.setState({
                taskList: tasksArray
            })
        })
    }


    render() {
        // create an array to dump into our return. It will contain
        //     components or HTML tags
        var taskArray = [];
        console.log(this.state.taskList);
        // loop through our state variable
        this.state.taskList.map((task, index) => {
            // push an li tag onto our array for each element in the state
            taskArray.push(
                <tr key={index}>
                    <td>{task.taskName}</td>
                    <td><Link to={`/task/delete/${task.id}`}>Delete</Link></td>
                    <td><Link to={`/task/edit/${task.id}`}> Edit</Link></td>
	      	    </tr>
            )
        });
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <div className="container">
                    <form  onSubmit={this.addNewTask} className="add-box">
                        <input type="text" id="new-task" placeholder="New Task"/>
                        <input type="date" id="new-task-date"/>
                        <button type="submit" className="btn btn-primary">Add Task</button>
                    </form>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <th>Task</th>
                        <th>Delete</th>
                        <th>Edit</th>
                    </thead>
                    <tbody>
                        {/*array dropped from 'theClassArray.push(<li key={index}>{student}</li>)'*/}
                        {taskArray}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Home;

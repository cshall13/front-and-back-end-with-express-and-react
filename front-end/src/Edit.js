import React, {Component} from 'react';
import $ from 'jquery';
import {Redirect} from 'react-router-dom';

class Edit extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <div className="edit-form">
                <form className="edit-box">
                    <input type="text" id="newTask" placeholder="New Task"/>
                    <input type="date" id="newTask"/>
                    <button type="submit">Add Task</button>
                    {/*array dropped from 'theClassArray.push(<li key={index}>{student}</li>)'*/}
                    {/*{taskArray}*/}
                </form>
            </div>
        )
    }
}

export default Edit;

// Overview.js

import React from "react";
import "../App.css";

const TaskTitle = (props) => {

    const { mode, text, editTaskTitle, id } = props;

    if (mode === 'edit') {

        return (
            <span className="text"> {text} </span>
       );

    } else if (mode === 'resubmit') {

        return (
            <input
                placeholder={text} 
                onChange={(e) => editTaskTitle(id, e)}
                type="text"
                value={text}
                className="entry"
            />
        );

    } else {
        
        return (
            <span> something went wrong ... </span>
        );

    }


};

const Overview = (props) => {

    const { tasks, deleteTask, editTask, editTaskTitle } = props;

    return (
        <ul className="entries" >
            {tasks.map((task) => {
                return (
                    <li key={task.id}>{task.index + '. ' } <TaskTitle mode={task.editTask.buttonText} text={task.text} editTaskTitle={editTaskTitle} id={task.id} /> 
                        <button className="deleteBtn" onClick={() => deleteTask(task.id)}>delete</button> 
                        <button className="editBtn" onClick={(e) => editTask(task.id, e)}>{task.editTask.buttonText}</button> 
                    </li>
                );
            })}
        </ul>
    );
};

export default Overview;
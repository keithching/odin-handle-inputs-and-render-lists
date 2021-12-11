// App.js

import React, { Component } from "react";
import Overview from "./components/Overview";
import uniqid from "uniqid";
import "./App.css";

class App extends Component {
  constructor() {
    super();

    this.state = {
      task: {
        text: '', 
        id: uniqid(),
        index: 1,
        editTask: {
          buttonText: 'edit'
        },
      },
      tasks: [],
    };

    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.editTaskTitle = this.editTaskTitle.bind(this);
  }

  handleChange = (e) => {
    this.setState((state) => {
      return {
        task: {
          text: e.target.value,
          id: state.task.id,
          index: state.task.index,
          editTask: state.task.editTask
        },
      };
    });
  };

  onSubmitTask = (e) => {
    e.preventDefault();
    this.setState((state) => {
      return {
        tasks: this.state.tasks.concat(this.state.task),
        task: {
          text: '', 
          id: uniqid(),
          index: state.task.index + 1,
          editTask: {
            buttonText: 'edit',
          },
        },
      };
    });
  };

  // create the delete task function here, and bind to this class
  // then can call it from the children component
  deleteTask = (id) => {

    this.setState({
      tasks: this.state.tasks.filter(task => task.id !== id)
    }, function() {renumberTask()});
    
    // called as callback from the first setstate
    const renumberTask = () => {
      let tasks = this.state.tasks;
      tasks.forEach(task => task.index = this.state.tasks.indexOf(task) + 1);
      this.setState({
          tasks: tasks,
          task: {
            text: '',
            id: uniqid(),
            index: tasks.length + 1,
            editTask: {
              buttonText: 'edit',
            },
          }
        });
    };

  };

  editTask = (id, e) => {

    const matchingTask = this.state.tasks.find(task => task.id === id);

      this.setState((state) => {
        
        const updatedTasks = state.tasks;
  
        updatedTasks.forEach(task => {

          if (task === matchingTask) {

            if (e.target.textContent === 'edit') {

              task.editTask.buttonText = 'resubmit';

            } else if (e.target.textContent === 'resubmit') {

              task.editTask.buttonText = 'edit';

            }
          }

        });
  
        return {
          tasks: updatedTasks,
        };
  
      });

  };

  editTaskTitle = (id, e) => {
    
    const matchingTask = this.state.tasks.find(task => task.id === id);

    this.setState((state) => {

      const updatedTasks = state.tasks;

      updatedTasks.forEach(task => {
        if (task === matchingTask) {
          task.text = e.target.value
        }
      });

      return {
        tasks: updatedTasks
      };

    });

  };


  render() {
    const { task, tasks } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmitTask} className="input-Form">
          <label htmlFor="taskInput">Enter task</label>
          <input
            onChange={this.handleChange}
            value={task.text}
            type="text"
            id="taskInput"
            autoComplete="off"
          />
          <button type="submit">Add Task</button>
        </form>
        <Overview tasks={tasks} deleteTask={this.deleteTask} editTask={this.editTask} editTaskTitle={this.editTaskTitle} />
      </div>
    );
  }
}

export default App;
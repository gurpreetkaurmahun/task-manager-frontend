import { useEffect, useState } from "react";
import { retreiveAllTasks, deleteTask } from "./api/TasksApiServiceCall";
import { useNavigate } from "react-router-dom";

function ListTasks(){

    const [tasks, setTasks] = useState([])
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    function refreshTasks(){
        retreiveAllTasks().then(response => {
            console.log("Received data from API")
            setTasks(response.data)
        })
        .catch(error => console.log(error))
    }

    // Runs on first call only once
    useEffect(() => refreshTasks(), [])

    function addNewTask(){
        console.log("Add new task button clicked")
        navigate(`/tasks/-1`)
    }

    function updateTask(id){
        console.log("Update task clicked: " + id)
        navigate(`/tasks/${id}`)
    }

    function deleteTaskForId(id){
        console.log("Delete task clicked for id: " + id)
        deleteTask(id)
        .then(response => {
            setMessage(`Deleted task with id: ${id}`)
            refreshTasks()
            setTimeout(()=> setMessage(""), 2000)
        })
        .catch(error => {
            console.log(error)
            setMessage(error.response.data.message)
            setTimeout(()=> setMessage(""), 2000)
        })

    }

    function showSubTasks(id){
        console.log("Show subtasks clicked for id: " + id)
        navigate(`/list-sub-tasks/${id}`)
    }

    
    return (
        <div className="container-fluid">
            <h1>Your Tasks</h1>
            {message && <div className="alert alert-danger">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Date Created</th>
                            <th>Due Date</th>
                            <th>Is Completed</th>
                            <th>Total Sub Tasks</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>Sub Tasks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        tasks.map(tasks =>  (
                                    <tr key={tasks.taskItemId}>
                                        <td>{tasks.taskItemId}</td>
                                        <td>{tasks.taskItemName}</td>
                                        <td>{tasks.taskItemDescription}</td>
                                        <td>{tasks.dateCreated}</td>
                                        <td>{tasks.dueDate}</td>
                                        <td>{tasks.isCompleted.toString()}</td>
                                        <td>{tasks.subTasks.length}</td>
                                        <td> <button className="btn btn-warning" onClick={() => updateTask(tasks.taskItemId)}>Update</button></td>
                                        <td> <button className="btn btn-danger" onClick={() => deleteTaskForId(tasks.taskItemId)}>Delete</button></td>
                                        <td> <button className="btn btn-success" onClick={() => showSubTasks(tasks.taskItemId)} disabled={tasks.subTasks.length==0}>Sub Tasks</button></td>
                                    </tr>
                                    )
                                )
                        }
                    </tbody>
                </table>
            </div>
            <div><button className="btn btn-success m-5" onClick={addNewTask}>Add New Task</button></div>
        </div>
    )
}

export default ListTasks
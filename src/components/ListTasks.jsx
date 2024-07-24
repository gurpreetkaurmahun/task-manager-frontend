import { useEffect, useState } from "react";
import { retreiveAllTasks, deleteTask } from "./api/TasksApiServiceCall";
import { useNavigate } from "react-router-dom";
import { updateTask } from "./api/TasksApiServiceCall";

function ListTasks(){

    const [tasks, setTasks] = useState([])
    const [message, setMessage] = useState("")
    const [sMessage, setSMessage] = useState("")
    const navigate = useNavigate()

    function refreshTasks(){
        retreiveAllTasks().then(response => {
            console.log("Received data from API")
            setTasks(response.data)
        })
        .catch(error => console.log(error))
    }

    // Runs on first call only once
    useEffect(() => refreshTasks(), [sMessage])

    function addNewTask(){
        console.log("Add new task button clicked")
        navigate(`/tasks/-1`)
    }

    function updateTaskForId(id){
        console.log("Update task clicked for id: " + id)
        navigate(`/tasks/${id}`)
    }

    function markAsCompleteTaskForId(id, name, description, dateCreated, dueDate){
        console.log("Mark as complete button clicked for id: " + id)

        const task = {
            taskItemId: Number(id),
            taskItemName: name,
            taskItemDescription: description,
            dateCreated: dateCreated,
            dueDate: dueDate,
            isCompleted: true
        }

        console.log("Mark as complete existing task object: ")
        console.log(task)

        updateTask(id, task)
        .then(response => {
            console.log(response)
            setSMessage(response.data.message)
            setTimeout(()=> setSMessage(""), 2000)
            navigate("/")
        })
        .catch(
            error => {
                console.log(error)
                setMessage(error.response.data.message)
                setTimeout(()=> setMessage(""), 2000)
        })
       
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

    function showSubTasksForId(id){
        console.log("Show subtasks clicked for id: " + id)
        navigate(`/list-sub-tasks/${id}`)
    }

    
    return (
        <div className="container-fluid">
            <h1 className="mb-4">Your Tasks</h1>
            {message && <div className="alert alert-danger">{message}</div>}
            {sMessage && <div className="alert alert-success">{sMessage}</div>}
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
                            <th>Action</th>
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
                                        <td> <button className="btn btn-primary" onClick={() => markAsCompleteTaskForId(tasks.taskItemId, tasks.taskItemName, tasks.taskItemDescription, tasks.dateCreated, tasks.dueDate)} disabled={tasks.isCompleted == true}>Complete</button></td>
                                        <td> <button className="btn btn-warning" onClick={() => updateTaskForId(tasks.taskItemId)} disabled={tasks.isCompleted == true}>Update</button></td>
                                        <td> <button className="btn btn-danger" onClick={() => deleteTaskForId(tasks.taskItemId)} disabled={tasks.isCompleted == false}>Delete</button></td>
                                        <td> <button className="btn btn-success" onClick={() => showSubTasksForId(tasks.taskItemId)}>Sub Tasks</button></td>
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
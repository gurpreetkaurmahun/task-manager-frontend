import { useEffect, useState } from "react";
import { retreiveAllSubTasks } from "./api/TasksApiServiceCall";
import { useParams } from "react-router-dom";

function ListSubTasks(){

    const [subTasks, setSubTasks] = useState([])
    const [message, setMessage] = useState("")
    const {id} = useParams()

    function refreshSubTasks(){
        retreiveAllSubTasks(id).then(response => {
            console.log("Received sub task data from API")
            setSubTasks(response.data)
        })
        .catch(error => console.log(error))
    }

    // Runs on first call only once
    useEffect(() => refreshSubTasks(), [])

    function addNewSubTask(){
        console.log("Add new button clicked")
    }

    function updateSubTask(id){
        console.log("Update task clicked" + id)
    }

    function deleteSubTask(id){
        console.log("Delete subtask clicked for id: " + id)
        deleteSubTask(id)
        .then(response => {
            setMessage(`Deleted subtask with id: ${id}`)
            refreshSubTasks()
            setTimeout(()=> setMessage(""), 2000)
        })
        .catch(error => {
            console.log(error)
            setMessage(error.response.data.message)
            setTimeout(()=> setMessage(""), 2000)
        })
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
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        subTasks.map(subTasks =>  (
                                    <tr key={subTasks.subTaskId}>
                                        <td>{subTasks.subTaskId}</td>
                                        <td>{subTasks.subTaskName}</td>
                                        <td>{subTasks.subTaskDescription}</td>
                                        <td>{subTasks.dateCreated}</td>
                                        <td>{subTasks.dueDate}</td>
                                        <td>{subTasks.isCompleted.toString()}</td>
                                        <td> <button className="btn btn-warning" onClick={() => updateSubTask(subTasks.taskItemId)}>Update</button></td>
                                        <td> <button className="btn btn-danger" onClick={() => deleteSubTask(subTasks.taskItemId)}>Delete</button></td>
                                    </tr>
                                    )
                                )
                        }
                    </tbody>
                </table>
            </div>
            <div><button className="btn btn-success m-5" onClick={addNewSubTask}>Add New Sub Task</button></div>
        </div>
    )
}

export default ListSubTasks
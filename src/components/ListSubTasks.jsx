import { useEffect, useState } from "react";
import { retreiveAllSubTasks } from "./api/TasksApiServiceCall";
import { useParams, useNavigate } from "react-router-dom";
import { deleteSubTask, updateSubTask } from "./api/TasksApiServiceCall";
import { isDisabled } from "@testing-library/user-event/dist/utils";

function ListSubTasks(){

    const [subTasks, setSubTasks] = useState([])
    const [message, setMessage] = useState("")
    const {id} = useParams()

    const navigate = useNavigate()

    function refreshSubTasks(){
        retreiveAllSubTasks(id).then(response => {
            console.log("Received sub task data from API with message: " + response.data.message)
            console.log(response.data)
            setSubTasks(response.data.subTask)
        })
        .catch(error => console.log(error))
    }

    // Runs on first call only once
    useEffect(() => refreshSubTasks(), [])

    function addNewSubTask(){
        console.log("Add new subtask button clicked")
        navigate(`/tasks/${id}/subtasks/-1`)
    }

    function updateSubTaskCall(sub_id){
        console.log("Update subtask clicked for id: " + sub_id)
        navigate(`/tasks/${id}/subtasks/${sub_id}`)
    }

    function deleteSubTaskCall(sub_id){
        console.log("Delete subtask clicked for id: " + sub_id)
        deleteSubTask(id, sub_id)
        .then(response => {
            setMessage(`Deleted subtask with id: ${sub_id} related to task id: ${id}`)
            refreshSubTasks()
            setTimeout(()=> setMessage(""), 2000)
        })
        .catch(error => {
            console.log(error)
            setMessage(error.response.data.message)
            setTimeout(()=> setMessage(""), 2000)
        })
    }

    function setSubTaskComplete(sub_id){

        for(var i = 0; i < subTasks.length; i++){
            if (subTasks[i].subTaskId == sub_id){
                console.log("Found subtask with matching id")
                const sub_task = subTasks[i]
                sub_task.isCompleted = true
                console.log(sub_task)
                updateSubTask(id, sub_task.subTaskId, sub_task)
                .then(respone => {
                    console.log(respone)
                    navigate(`/list-sub-tasks/${id}`)
                })
                .catch(
                    error => {
                        console.log(error)
                        setMessage(error.response.data.message)
                        setTimeout(()=> setMessage(""), 2000)
                })
                break;
            }
        }
        
    }

    
    return (
        <div className="container-fluid">
            <h1 className="mb-4">Sub Tasks for Task Id: {id}</h1>
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
                            <th>Action</th>
                            <th>Update SubTask</th>
                            <th>Delete SubTask</th>
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
                                        <td> <button className="btn btn-primary" onClick={() => setSubTaskComplete(subTasks.subTaskId)} disabled={subTasks.isCompleted == true}>Complete</button></td>
                                        <td> <button className="btn btn-warning" onClick={() => updateSubTaskCall(subTasks.subTaskId)}>Update</button></td>
                                        <td> <button className="btn btn-danger" onClick={() => deleteSubTaskCall(subTasks.subTaskId)}>Delete</button></td>
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
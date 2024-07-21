import { useEffect, useState } from "react"
import { retrieveSubTask, updateSubTask, createNewSubTask } from "./api/TasksApiServiceCall"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Formik, Field, ErrorMessage } from "formik"
import moment from "moment"

function SubTaskComponent(){

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [dateCreated, setDateCreated] = useState("")
    const [message, setMessage] = useState("")

    const {id, sub_id} = useParams()
    const navigate = useNavigate()

    useEffect(
        () => retrieveTaskData(), [id]
    )

    function retrieveTaskData() {
        // id is -1 for new tasks. Only retrieve task for existing ids
        if (sub_id != -1){
            retrieveSubTask(id, sub_id)
            .then(respone => {
                console.log("Retrieved sub task: ")
                console.log(respone.data.message)
                setName(respone.data.subTask.subTaskName)
                setDescription(respone.data.subTask.subTaskDescription)
                setDueDate(respone.data.subTask.dueDate)
                setDateCreated(respone.data.subTask.dateCreated)
            })
            .catch(error => {
                console.log(error)
            })
        }

    }

    function onSubmit(values){
        const sub_task = {
            subTaskName: values.name,
            subTaskDescription: values.description,
            dateCreated: dateCreated,
            dueDate: values.dueDate,
            isCompleted: false,
            taskItemId: id
        }

        if (sub_id != -1){
            sub_task.subTaskId = Number(sub_id)
            console.log("Update existing subtask object: ")
            console.log(sub_task)
            updateSubTask(id, sub_id, sub_task)
            .then(respone => {
                console.log(respone.data)
                navigate(`/list-sub-tasks/${id}`)
            })
            .catch(
                error => {
                    console.log(error)
                    setMessage(error.response.data.message)
                    setTimeout(()=> setMessage(""), 2000)
            })
        } else {
            sub_task.dateCreated = getTodaysDate()
            console.log("New task object: ")
            console.log(sub_task)
            createNewSubTask(id, sub_task)
            .then(respone => {
                console.log(respone)
                navigate(`/list-sub-tasks/${id}`)
            })
            .catch(error => {
                console.log(error)
                setMessage(error.response.data.message)
                setTimeout(()=> setMessage(""), 2000)
            })
        }


    }

    function validate(values){
        let errors = {}

        if (values.description.length < 5){
            errors = {
                description: "Minimum characters in description is 5"
            }
        }

        if (values.dueDate == null || values.dueDate == '' || !moment(values.dueDate).isValid){
            errors.dueDate = "Please enter some target date"
        }

        return errors
    }

    function getTodaysDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
      
        return `${year}-${month}-${day}`;
      }

    return (
        <div className="container-fluid">
            <h1 className="mb-4">Enter your new sub task details for Task id: {id}</h1>
            <Formik 
            initialValues={{name, description, dueDate}} 
            enableReinitialize={true}
            onSubmit={onSubmit}
            validate={validate}
            validateOnBlur={false}
            validateOnChange={false}>
                {
                    (props) => {
                        return (
                            <Form>
                                {message && <div className="alert alert-danger">{message}</div>}

                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <ErrorMessage
                                    name="dueDate"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field type="text" className="form-control" name="name"/>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>

                                <fieldset className="form-group">
                                    <label>Due Date</label>
                                    <Field type="date" className="form-control" name="dueDate"/>
                                </fieldset>

                                <div>
                                    <button type="submit" className="btn btn-success m-5">Save</button>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>
    )
}

export default SubTaskComponent
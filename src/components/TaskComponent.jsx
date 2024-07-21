import { useEffect, useState } from "react"
import { retrieveTask, updateTask, createNewTask } from "./api/TasksApiServiceCall"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Formik, Field, ErrorMessage } from "formik"
import moment from "moment"

function TaskComponent(){

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [dateCreated, setDateCreated] = useState("")
    const [message, setMessage] = useState("")

    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(
        () => retrieveTaskData(), [id]
    )

    function retrieveTaskData() {
        // id is -1 for new tasks. Only retrieve task for existing ids
        if (id != -1){
            retrieveTask(id)
            .then(respone => {
                console.log(respone.data.messsage)
                setName(respone.data.taskItem.taskItemName)
                setDescription(respone.data.taskItem.taskItemDescription)
                setDueDate(respone.data.taskItem.dueDate)
                setDateCreated(respone.data.taskItem.dateCreated)
            })
            .catch(error => {
                console.log(error)
            })
        }

    }

    function onSubmit(values){
        const task = {
            taskItemName: values.name,
            taskItemDescription: values.description,
            dateCreated: dateCreated,
            dueDate: values.dueDate,
            isCompleted: false
        }

        if (id != -1){
            task.taskItemId = Number(id)
            console.log("Update existing task object: ")
            console.log(task)
            updateTask(id, task)
            .then(respone => {
                console.log(respone)
                navigate("/")
            })
            .catch(
                error => {
                    console.log(error)
                    setMessage(error.response.data.message)
                    setTimeout(()=> setMessage(""), 2000)
            })
        } else {
            task.dateCreated = getTodaysDate()
            console.log("New task object: ")
            console.log(task)
            createNewTask(task)
            .then(respone => {
                console.log(respone)
                navigate("/")
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
            <h1>Enter your new task details</h1>
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

export default TaskComponent
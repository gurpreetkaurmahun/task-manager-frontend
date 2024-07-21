import './TaskApp.css'
import './HeaderComponent'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import ListTasks from './ListTasks'
import ListSubTasks from './ListSubTasks'
import TaskComponent from './TaskComponent'

function TaskApp(){
    return (
        <div className="TaskApp">
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path='/' element={
                        <ListTasks />
                    }></Route>

                    <Route path='list-sub-tasks/:id' element={
                        <ListSubTasks />
                    }></Route>

                    <Route path='/tasks/:id' element={
                        <TaskComponent />
                    }></Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default TaskApp
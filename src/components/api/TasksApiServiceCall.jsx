import { apiClient } from "./ApiClient";

const retreiveAllTasks = () => apiClient.get('/api/tasks');
const retrieveTask = (task_id) => apiClient.get(`/api/tasks/${task_id}`);
const createNewTask = (task) => apiClient.post('api/tasks', task)
const updateTask = (task_id, task) => apiClient.put(`api/tasks/${task_id}`, task)
const deleteTask = (task_id) => apiClient.delete(`api/tasks/${task_id}`)

const retreiveAllSubTasks = (task_id) => apiClient.get(`/api/tasks/${task_id}/subtasks`);
const retrieveSubTask = (task_id, sub_id) => apiClient.get(`/api/tasks/${task_id}/subtasks/${sub_id}`);
const createNewSubTask = (task_id ,sub_task) => apiClient.post(`api/tasks/${task_id}/subtasks`, sub_task)
const updateSubTask = (task_id, sub_id, sub_task) => apiClient.put(`api/tasks/${task_id}/subtasks/${sub_id}`, sub_task)
const deleteSubTask = (task_id, sub_id) => apiClient.delete(`api/tasks/${task_id}/subtasks/${sub_id}`)

export {retreiveAllTasks, retrieveTask, createNewTask, updateTask, deleteTask, retreiveAllSubTasks, retrieveSubTask, createNewSubTask, updateSubTask, deleteSubTask}
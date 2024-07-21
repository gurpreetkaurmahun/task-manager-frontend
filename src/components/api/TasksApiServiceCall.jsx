import { apiClient } from "./ApiClient";

const retreiveAllTasks = () => apiClient.get('/api/tasks');
const retrieveTask = (id) => apiClient.get(`/api/tasks/${id}`);
const createNewTask = (task) => apiClient.post('api/tasks', task)
const updateTask = (id, task) => apiClient.put(`api/tasks/${id}`, task)
const deleteTask = (id) => apiClient.delete(`api/tasks/${id}`)

const retreiveAllSubTasks = (task_id) => apiClient.get(`/api/tasks/${task_id}/subtasks`);

export {retreiveAllTasks, retrieveTask, createNewTask, updateTask, deleteTask, retreiveAllSubTasks}
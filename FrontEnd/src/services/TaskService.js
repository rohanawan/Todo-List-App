import axios from '../interceptors'

const url = '/tasks'

const TaskService = {}

TaskService.create = async (data) => axios.post(`${url}`, data)

TaskService.get = async () => axios.get(`${url}`)

TaskService.delete = async (id) => axios.delete(`${url}/${id}`)

TaskService.update = async (data) => {
  const { id, match } = data
  return axios.patch(`${url}/${id}`, match)
}

export default TaskService

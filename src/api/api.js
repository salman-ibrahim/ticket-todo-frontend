import axios from "axios";

const ENDPOINTS = {
    CREATE_TICKET: '/create/ticket',
    CREATE_TASK: '/create/task',

    FETCH_TICKETS: '/fetch/tickets',
    FETCH_TASKS: '/fetch/tasks',

    UPDATE_TASK: '/update/task'

}

export const createNewTicket = (reqData) => {
    return axios.post(ENDPOINTS.CREATE_TICKET, reqData)
        .then((resp) => {
            return Promise.resolve(resp.data)
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}

export const fetchTickets = () => {
    return axios.get(ENDPOINTS.FETCH_TICKETS)
        .then((resp) => {
            return Promise.resolve(resp)
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}

export const updateTask = (reqData) => {
    return axios.post(ENDPOINTS.UPDATE_TASK, reqData)
        .then((resp) => {
            return Promise.resolve(resp)
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}

export const createTask = (reqData) => {
    return axios.post(ENDPOINTS.CREATE_TASK, reqData)
        .then((resp) => {
            return Promise.resolve(resp)
        })
        .catch((error) => {
            return Promise.reject(error)
        })
}

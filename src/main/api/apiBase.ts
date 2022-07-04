import axios from 'axios'

export const apiBase = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})
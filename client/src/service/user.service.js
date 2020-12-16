import axios from 'axios'

export default class UserService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/user',
            // baseURL: `${process.env.REACT_APP_API_URL}/user`,

            withCredentials: true,
        })
    }

    getAllUser = () => this.apiHandler.get('/getAllUser')
    getOneUser = userId => this.apiHandler.get(`/getOneUser/${userId}`)
    editUser = (userId, user) => this.apiHandler.put(`/editUser/${userId}`, user)
    deleteUser = userId => this.apiHandler.delete(`/deleteUser/${userId}`)
}
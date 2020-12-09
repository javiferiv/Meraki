import axios from 'axios'

export default class AuthService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/auth',
        })
    }

    getAllUser = () => this.apiHandler.get('/getAllUser')
    getOneUser = userId => this.apiHandler.get(`/getOneUser/${userId}`)
    signup = credentials => this.apiHandler.post('/signup', credentials)
    login = credentials => this.apiHandler.post('/login', credentials)
    logout = () => this.apiHandler.post('/logout')
    isLoggedIn = () => this.apiHandler.get('/loggedin')
    editUser = (userId, user) => this.apiHandler.put(`/editUser/${userId}`, user)
    deleteUser = userId => this.apiHandler.delete(`/deleteUser/${userId}`)
}
import axios from 'axios'

export default class EventService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/events',
            //withCredentials: true
        })
    }

    getEvent = () => this.apiHandler.get('/getAllEvents')
    getOneEvent = eventId => this.apiHandler.get(`/eventDetails/${eventId}`)
    newEvent = eventInfo => this.apiHandler.post('/newEvent/', eventInfo)
    editEvent = (eventId, event) => this.apiHandler.put(`/editEvent/${eventId}`, event)
    deleteEvent = eventId => this.apiHandler.delete(`/deleteEvent/${eventId}`)

}




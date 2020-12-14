import axios from 'axios'

export default class ChapterService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/chapter',
        })
    }

    getChapters = () => this.apiHandler.get('/getAllChapters')
    getOneChapter = chapterId => this.apiHandler.get(`/chapterDetails/${chapterId}`)
    saveChapter = chapterInfo => this.apiHandler.post(`/newChapter`, chapterInfo)
    editChapter = (chapterId, chapter) => this.apiHandler.put(`/editChapter/${chapterId}`, chapter)
    deleteChapter = chapterId => this.apiHandler.delete(`/deleteChapter/${chapterId}`)

}
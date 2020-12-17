import React, { Component } from 'react'
import './Chapter-card.scss'
import { ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BooksService from "../../../../service/book.service"
import ChapterService from "../../../../service/chapter.service"

class ChapterCard extends Component {

    constructor(props) {
        super(props)
        this.state =
            {
            chapter: {
                title: '',
                book:'',
            },
                
        authorized: false,

        }
        this.chapterService = new ChapterService()

    }

    componentDidMount() {

        const chapter_id = this.props._id

        this.chapterService
            .getOneChapter(chapter_id)
            .then(res => {this.setState({ chapter: res.data })
                this.isAuthorised()
            })
            .catch(err => console.log(err))
    }

    isAuthorised() {
        
        const book_id = this.state.chapter.book.author

       const userId = this.props.userId._id

       if (book_id === userId) { this.setState({authorized : true}) }
        

    }

    render() {

    return (
        <>
         
            <h3 style={{ fontSize: "27px", marginTop: "10px" }}>{this.state.chapter.title}</h3>
            
            <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                {
                    this.state.authorized === true
                    &&
                <Link className="default-button edit-book" style={{textAlignVertical: "center", textAlign: "center"}} to={`/capitulo/editar/${this.state.chapter._id}`}>Editar</Link>
                }
                <Link className="default-button read-book" style={{ textAlignVertical: "center", textAlign: "center" }} to={`/capitulo/${this.state.chapter._id}`}>Leer</Link>
           
            </ButtonGroup>
          
        </>
        )
    }
}

export default ChapterCard
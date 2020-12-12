import React, { Component } from 'react'
import { Container, Row, Form, FormControl, Button } from 'react-bootstrap'



import BooksService from '../../../../service/book.service'
import BookCard from './Book-card'

import './Books-list.css'

class BookList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            user: "",
            busqueda: "",
        }
        this.booksService = new BooksService()
    }

    componentDidMount = () => {
        this.refreshBooks()
        this.isLoggedUser()
  
    }



    refreshBooks = () => {
        
        this.booksService
            .getBooks()
            .then(res =>
                
                this.setState({ books: res.data }),
                
        
        )
            .catch(err => console.log(err))
        
    }

    isLoggedUser = () => {
        {
            this.props.loggedUser
                &&
         this.setState({ user: this.props.loggedUser._id })
   
        }
    }

    onChange = e => {

        const { name, value } = e.target
        
        this.setState({ busqueda: value })
        
        const filteredBooks = this.state.books.filter(elm => elm.title.includes(value))

        if (filteredBooks.length >= 1) {

            this.setState({ books: filteredBooks })
            
        }
        else {
            this.setState({books : this.props.books})
        }
   
    }

   

    render() {


        let adventuresBooks = this.state.books.filter(elm => elm.genre === "Aventuras")
        let fictionBooks = this.state.books.filter(elm => elm.genre === "Ciencia Ficción")
        let childrenBooks = this.state.books.filter(elm => elm.genre === "Infantil")
        let misteriousBooks = this.state.books.filter(elm => elm.genre === "Misterio")
        let darkBooks = this.state.books.filter(elm => elm.genre === "Novela negra")
        let terrorBooks = this.state.books.filter(elm => elm.genre === "Terror")
        let romanticBooks = this.state.books.filter(elm => elm.genre === "Romántico")
        let otherBooks = this.state.books.filter(elm => elm.genre === "Otro")
  
       
        
        return (
            <>
                
                <Form inline>
                    <FormControl type="text" placeholder="Encuentra tu novela" name="busqueda" className="mr-sm-2" value={this.state.busqueda} onChange={this.onChange}/>
                    <Button variant="outline-success">Buscar novela</Button>
                </Form>
                <Container>

                    <h1>Listado de libros</h1>
                    <hr></hr>
                    <h2>Novelas de aventuras</h2>
                    <hr></hr>
                    <Row>
                        {adventuresBooks.map(elm => <BookCard
                            key={elm._id}
                            userId={this.state.user}
                            {...elm} />)}
                    </Row>
                    <br></br>
  
                   
                </Container>
                <Container>

                    <h2>Novelas de ciencia ficción</h2>
                    <hr></hr>
                    <Row>
                        {fictionBooks.map(elm => <BookCard
                            key={elm._id}
                            userId={this.state.user}
                            {...elm} />)}
                    </Row>
                    <br></br>
                  
                </Container>
                <Container>

                    <h2>Cuentos infantiles</h2>
                    <hr></hr>
                    <Row>
                        {childrenBooks.map(elm => <BookCard
                            key={elm._id}
                            userId={this.state.user}
                            {...elm} />)}
                    </Row>
                    <br></br>
                  
                </Container>
                <Container>
                    <h2>Novelas de Terror</h2>
                    <hr></hr>
                    <Row>
                        {terrorBooks.map(elm => <BookCard
                            key={elm._id}
                            userId={this.state.user}
                            {...elm} />)}
                    </Row>
                    <br></br>
               
                </Container>
                <Container>
                    <h2>Novelas de misterio</h2>
                    <hr></hr>
                    <Row>
                        {misteriousBooks.map(elm => <BookCard
                            key={elm._id}
                            userId={this.state.user}
                            {...elm} />)}
                    </Row>
                    <br></br>
      
                </Container>
                <Container>
                    <h2>Novela negra</h2>
                    <hr></hr>
                    <Row>
                        {darkBooks.map(elm => <BookCard
                            key={elm._id}
                            userId={this.state.user}
                            {...elm} />)}
                    </Row>
                    <br></br>
        
                </Container>
                <Container>
                    <h2>Novelas románticas</h2>
                    <hr></hr>
                    <Row>
                        {romanticBooks.map(elm => <BookCard
                            key={elm._id}
                            userId={this.state.user}
                            {...elm} />)}
                    </Row>
                    <br></br>
          
                </Container>
                <Container>
                    <h2>Otros</h2>
                    <hr></hr>
                    <Row>
                        {otherBooks.map(elm => <BookCard
                            key={elm._id}
                            userId={this.state.user}
                            {...elm} />)}
                    </Row>

                </Container>
            </>
        )
    }
}

export default BookList
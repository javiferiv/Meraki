import { Col, Card, ButtonGroup } from 'react-bootstrap'
import AuthorsService from '../../../../service/auth.service'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './favoriteBooks-card.css'


class FavoriteAuthsCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            authors: props,
            newauthors: "",
        }


        this.authService = new AuthorsService()
    }

    componentDidMount = () => {

        const auth_id = this.state.authors.author
        
        this.authService
            .getOneUser(auth_id)
            .then(res => {
                console.log(res.data)
                this.setState({ newauthors: res.data })

                // if (res.data != null) {

                //     this.setState({ newauthors: res.data })

                // }


            })
            .catch(err => console.log(err))

    }



    render() {

        return (


            < Col md={3} >
                <Card className="favoriteBook-card">
                    <Link to={`/usuario/${this.state.newauthors._id}`}><Card.Img variant="top" src={this.state.newauthors.image}/></Link>
                    <Card.Body>
                        <Card.Title>{this.state.newauthors.name}</Card.Title>
                        <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            </Col >



        )


    }
}

export default FavoriteAuthsCard
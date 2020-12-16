import { Col } from 'react-bootstrap'
import UserService from '../../../../service/user.service'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookmark from './../../Book/Book-list/images/bookmark.jpg'
import './FavoriteBooks-card.scss'


class FavoriteAuthsCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            authors: props,
            newauthors: "",
        }


        this.userService = new UserService()
    }

    componentDidMount = () => {

        const auth_id = this.state.authors.author
        
        this.userService
            .getOneUser(auth_id)
            .then(res => { if (res.data != null) {this.setState({ newauthors: res.data })} })
            .catch(err => console.log(err))

    }

    render() {

        return (

            < Col md={3} className="flip-card-container" style={{ "--hue": "170" }}>
                <div className="flip-card">

                    <div className="card-front">
                        <figure>
                            <div className="img-bg"></div>
                            <img className="img-bg-pic" src={this.state.newauthors.imageUrl} alt="author" />
                            <figcaption>{this.state.newauthors.name}</figcaption>
                        </figure>
                    </div>

                    <div className="card-back">
                        <figure>
                            <div className="img-bg"></div>
                            <img className="img-bg-pic" src={Bookmark} alt="image-2" />
                        </figure>

                        <button><Link className="btn btn-book-card" to={`/usuario/${this.state.newauthors._id}`}>Conoce al autor</Link></button>

                        <div className="design-container">
                            <span className="design design--1"></span>
                            <span className="design design--2"></span>
                            <span className="design design--3"></span>
                            <span className="design design--4"></span>
                            <span className="design design--5"></span>
                            <span className="design design--6"></span>
                            <span className="design design--7"></span>
                            <span className="design design--8"></span>
                        </div>
                    </div>

                </div>

            </Col >

        )
    }
}

export default FavoriteAuthsCard

import { Col } from 'react-bootstrap'
import './Book-details.scss'

const BookComments = ({ comments }) => {

   
    return (

        <Col >

            <ul>
                <hr></hr><li>{comments}</li>
            </ul>
        </Col>
    )

}

export default BookComments

import { Col, Card, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Book-card.scss'

const BookCard = ({ imageBook, title, author, userId, _id }) => {
    
    
    return (


      <>
            <Col lg={4}>
            
                <Card className="book-card">
                    <Card.Img variant="top" src={imageBook} />
         
                        <Card.Title className="book-title-card">{title}</Card.Title>
                        <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                            {
                                userId === author
                                &&
                                <Link className="btn btn-book-card" to={`/libros/editar/${_id}`}>Editar</Link>

                            }
                        <Link className="btn btn-book-card" to={`/libros/${_id}`}>Ver detalles</Link>
                        </ButtonGroup>
                   

                </Card>
        
        </Col >
        </>  
    )
    
}
    
    export default BookCard
        //             :

        //             Genre === "Ciencia Ficción"
        //                 ?

        //                 <Card className="book-card">
        //                     <Card.Img variant="top" src={props.image} />
        //                     <Card.Body>
        //                         <Card.Title>{props.title}</Card.Title>
        //                         <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
        //                             {
        //                                 props.userId === props.author
        //                                 &&
        //                                 <Link className="btn btn-dark" to={`/libros/editar/${props._id}`}>Editar</Link>

        //                             }
        //                             <Link className="btn btn-dark" to={`/libros/${props._id}`}>Ver detalles</Link>
        //                         </ButtonGroup>
        //                     </Card.Body>
        //                 </Card>

        //                 :

        //                 Genre === "Infantil"

        //                     ?
        //                     <Card className="book-card">
        //                         <Card.Img variant="top" src={props.image} />
        //                         <Card.Body>
        //                             <Card.Title>{props.title}</Card.Title>
        //                             <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
        //                                 {
        //                                     props.userId === props.author
        //                                     &&
        //                                     <Link className="btn btn-dark" to={`/libros/editar/${props._id}`}>Editar</Link>

        //                                 }
        //                                 <Link className="btn btn-dark" to={`/libros/${props._id}`}>Ver detalles</Link>
        //                             </ButtonGroup>
        //                         </Card.Body>
        //                     </Card>

        //                     :



        //                     Genre === "Novela Negra"

        //                         ?
        //                         <Card className="book-card">
        //                             <Card.Img variant="top" src={props.image} />
        //                             <Card.Body>
        //                                 <Card.Title>{props.title}</Card.Title>
        //                                 <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
        //                                     {
        //                                         props.userId === props.author
        //                                         &&
        //                                         <Link className="btn btn-dark" to={`/libros/editar/${props._id}`}>Editar</Link>

        //                                     }
        //                                     <Link className="btn btn-dark" to={`/libros/${props._id}`}>Ver detalles</Link>
        //                                 </ButtonGroup>
        //                             </Card.Body>
        //                         </Card>

        //                         :


        //                         Genre === "Romántico"

        //                             ?
        //                             <Card className="book-card">
        //                                 <Card.Img variant="top" src={props.image} />
        //                                 <Card.Body>
        //                                     <Card.Title>{props.title}</Card.Title>
        //                                     <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
        //                                         {
        //                                             props.userId === props.author
        //                                             &&
        //                                             <Link className="btn btn-dark" to={`/libros/editar/${props._id}`}>Editar</Link>

        //                                         }
        //                                         <Link className="btn btn-dark" to={`/libros/${props._id}`}>Ver detalles</Link>
        //                                     </ButtonGroup>
        //                                 </Card.Body>
        //                             </Card>
        //                             :

        //                             Genre === "Terror"

        //                                 ?
        //                                 <Card className="book-card">
        //                                     <Card.Img variant="top" src={props.image} />
        //                                     <Card.Body>
        //                                         <Card.Title>{props.title}</Card.Title>
        //                                         <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
        //                                             {
        //                                                 props.userId === props.author
        //                                                 &&
        //                                                 <Link className="btn btn-dark" to={`/libros/editar/${props._id}`}>Editar</Link>

        //                                             }
        //                                             <Link className="btn btn-dark" to={`/libros/${props._id}`}>Ver detalles</Link>
        //                                         </ButtonGroup>
        //                                     </Card.Body>
        //                                 </Card>

        //                                 :

        //                                 Genre === "Otro"

        //                                 &&
        //                                 <Card className="book-card">
        //                                     <Card.Img variant="top" src={props.image} />
        //                                     <Card.Body>
        //                                         <Card.Title>{props.title}</Card.Title>
        //                                         <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
        //                                             {
        //                                                 props.userId === props.author
        //                                                 &&
        //                                                 <Link className="btn btn-dark" to={`/libros/editar/${props._id}`}>Editar</Link>

        //                                             }
        //                                             <Link className="btn btn-dark" to={`/libros/${props._id}`}>Ver detalles</Link>
        //                                         </ButtonGroup>
        //                                     </Card.Body>
        //                                 </Card>

        //     }

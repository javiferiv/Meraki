import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import './Home.scss'
import imageColumn1 from './images/image-column-1.jpeg'
import imageColumn2 from './images/image-column-2.jpeg'
import imageColumn3 from './images/image-column3.jpeg'



const Home = (props) => {



    return (
        <>
            <section className="picture-home">
            
                <Container>
                    <Row>
                        <Col className="first-container-text" md={{ span: 6, offset: 8 }}>
                            
                            <h1>Bienvenido a Meraki</h1>
                            {
                                props.loggedUser
                                    &&
                                    
                                        props.loggedUser.role === "Escritor"
                                            &&
                                            <>
                                                <Link className="button-first" to={'/libros/crear'}>Crear nuevo libro</Link>
                                                <Link className="button-second" to={'/eventos/nuevo-evento'}>Crear nuevo evento</Link>
                                    
                                            </>         
                            }

                        </Col>
                    </Row>
                </Container>
            </section>

            <div className="container-background">

            <Container className="second-container-home">
                
                <Row >
                    <Col md={3}>
                            <img className="first-home-image" src={imageColumn3} alt="pencil"></img>

                    </Col>
                    <Col md={3}>
                            <img className="second-home-image" src={imageColumn2} alt="library"></img>

                    </Col>
                    <Col md={6}>
                        <h2 className="second-container-title">Descubre Meraki</h2>
                        <hr></hr>
                        <p className="second-container-paragraph">La web literaria donde tú eliges el final perfecto para tus historias favoritas. Únete a la comunidad y crea la historia perfecta. El destino del protagonista lo eliges tú.</p>
                        <Link className="button-third" style={{fontFamily: "Atalla"}} to={'/registro'}>Comienza tu aventura</Link>

                    </Col>

                </Row>
            </Container>
            </div>

            <div className="third-container-home">
            <Container>
                <Row>
                    <Col className="col-home-container" md={{ span: 3, offset: 1 }}>
                        <h2 className="second-container-title">Comienza tu historia</h2>
                        <hr></hr>
                            <p>Regístrate en Meraki y forma parte de la mayor comunidad literaria creativa. Escribe tus propias historias o participa las demás.</p>
                            <Link className="button-third" to={'/registro'}>Únete a Meraki</Link>
                    </Col>
                    <Col className="col-home-container" md={{ span: 3, offset: 1 }}>
                        <h2 className="second-container-title">Eventos y comunidad</h2>
                        <hr></hr>
                        <p>Descubre los mejores eventos literarios y asiste a las presentaciones de tus historias favoritas. </p>
                            <Link className="button-third" to={'/eventos'}>Conoce nuestros eventos</Link>
                    </Col>
                    <Col className="col-home-container" md={{ span: 3, offset: 1 }}>
                        <h2 className="second-container-title">Crea tu propio camino</h2>
                        <hr></hr>
                        <p>Participa en las mil y una historias que encontrarás en nuestra web y decide junto a los demás el destino de tus protagonistas preferidos.  </p>
                            <Link className="button-third" to={'/libros'}>Sumérgete en la lectura</Link>
                    </Col>
                
                </Row>
                    
            </Container>
          
</div>
            <Container fluid className="phrase-container">
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h3 >Hacer algo con el alma, pasión, amor y creatividad;<br />poner todo de ti en cada cosa que haces.</h3>
                        <hr></hr>
                        <h2>Meraki</h2>
                    </Col>
                </Row>


                </Container>

        </>
    )
}

export default Home


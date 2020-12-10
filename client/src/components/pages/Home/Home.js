import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'


const Home = (props) => {



    return (
        <>
            {
                props.loggedUser
                    ?
                    <Container>
                <>
                        {
                            props.loggedUser.role === "Escritor"
                                ?
                                <Button variant='dark'><Link to={'/libros/crear'}>Crear nuevo libro</Link></Button>
                                :
                                <h1>HOLA</h1>
                        }

                    </> 
                 <Button variant='dark'><Link to={'/eventos/nuevo-evento'}>Crear nuevo evento</Link></Button>
                </Container>
                    :
                    <h1>NO HAY CONTAINER</h1>
            }
        </>
    )
}

export default Home


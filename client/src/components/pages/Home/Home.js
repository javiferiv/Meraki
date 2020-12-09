import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'


const Home = () => {

    return (
        <>
            <Container>
                <Button variant='dark'><Link to={'/libros/crear'}>Crear nuevo libro</Link></Button>
                <Button variant='dark'><Link to={'/eventos/nuevo-evento'}>Crear nuevo evento</Link></Button>
            </Container>
        </>
    )
}

export default Home
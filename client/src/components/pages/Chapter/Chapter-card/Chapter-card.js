import './Chapter-card.css'
import { ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ChapterCard = props => {

    return (
        <>
            <h2>{props.title}</h2>
            <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
            
                <Link className="btn btn-dark" to={`/capitulo/editar/${props._id}`}>Editar</Link>
                <Link className="btn btn-dark" to={`/capitulo/${props._id}`}>Leer</Link>
            </ButtonGroup>
        </>
    )
}

export default ChapterCard
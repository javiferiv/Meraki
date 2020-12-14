import './Chapter-card.css'
import { ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const ChapterCard = ({title, _id,}) => {

    return (
        <>
            <h2>{title}</h2>
            <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
            
                <Link className="btn btn-dark" to={`/capitulo/editar/${_id}`}>Editar</Link>
                <Link className="btn btn-dark" to={`/capitulo/${_id}`}>Leer</Link>
            </ButtonGroup>
        </>
    )
}

export default ChapterCard
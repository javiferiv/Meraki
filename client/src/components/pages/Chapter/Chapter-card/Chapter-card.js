import './Chapter-card.css'
import { ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const ChapterCard = ({title, _id,}) => {

    return (
        <>
            <h3 style={{fontSize: "27px",marginTop: "10px"}}>{title}</h3>
            <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
            
                <Link className="default-button edit-book" to={`/capitulo/editar/${_id}`}>Editar</Link>
                <Link className="default-button read-book" to={`/capitulo/${_id}`}>Leer</Link>
            </ButtonGroup>
          
        </>
    )
}

export default ChapterCard
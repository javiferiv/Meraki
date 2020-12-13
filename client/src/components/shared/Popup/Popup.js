import { Modal } from 'react-bootstrap'
import Poll from '../Poll/Poll'

const Popup = ({ show, title, handleModal, children }) => {
    return (
        <Modal show={show} onHide={() => handleModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>¿Cómo continúa la historia?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Poll/>
            </Modal.Body>
        </Modal>

    )
}

export default Popup
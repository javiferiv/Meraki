import { Modal } from 'react-bootstrap'

const PopUp = ({ show, title, handleModal, children }) => {
    return (
        <Modal show={show} onHide={() => handleModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}
export default PopUp
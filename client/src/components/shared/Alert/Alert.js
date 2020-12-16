import { Toast } from 'react-bootstrap'

const Alert = ({ show, toastText, handleToast }) => {
    return (
        <Toast show={show} onClose={() => handleToast(false)} delay={3000} autohide style={{ position: 'fixed', bottom: 150, right: 600, width: 500 }}>
            <Toast.Header>
                {/* <img src={logo} className="rounded mr-2" alt="" style={{ width: 20, height: 20 }} /> */}
                <strong className="mr-auto">¡Alerta!</strong>
            </Toast.Header>
            <Toast.Body>{toastText}</Toast.Body>
        </Toast>
    )
}

export default Alert
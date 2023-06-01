import { Button, Container, Modal } from 'react-bootstrap'
import ListingBasicInfo from './ListingBasicInfo'

export default function ListingModal({ show, handleClose, element }) {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header className="custom_modal_header" closeButton />
            <Modal.Body>
                <Container>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column pe-5">
                            <h4>{element['_id']}</h4>
                            <ListingBasicInfo element={element} />
                        </div>
                        <div className="d-flex ms-auto">
                            <img src={element['img_src'][0]} alt={element['img_src'][0]} style={{height: '300px', width: 'auto'}} />
                        </div>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
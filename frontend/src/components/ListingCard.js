import { Button, Card, Col } from 'react-bootstrap'
import { useState } from 'react';
import ListingModal from './ListingModal';
import ListingBasicInfo from './ListingBasicInfo';

export default function ListingCard({ element, index }) {

    function dataSeserializer(data) {
        const parts = data.split("T")
        const date = parts[0]
        const time = parts[1].substr(0, 5)
        return [date, time];
    }

    const data = dataSeserializer(element['last_modified'])

    // Required for Modal.
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <Col lg={4} md={6} key={index} className="pb-3 ps-2 pe-2 d-flex align-items-stretch">
            <Card className="w-100">
                <div className="image-wrapper">
                <div id='background-image' className="backgroundStyle" style={{backgroundImage: `url(${element['img_src'][0]})`}} />
                </div>
                <Card.Body>
                    <Card.Title>{element['_id']}</Card.Title>
                    <Card.Text>
                        <ListingBasicInfo element={element} />
                        <Button variant="primary" onClick={handleShow}>
                            See details
                        </Button>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated: {data[0]} at {data[1]}</small>
                </Card.Footer>
            </Card>
            <ListingModal show={show} handleClose={handleClose} element={element} />
        </Col>  
    )
}
import { Card, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faMoneyBill, faChartArea, faPeopleRoof } from '@fortawesome/free-solid-svg-icons';
import ListingModal from './ListingModal';

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
                        {/* Price */}
                        {element['price_min'] !== element['price_max'] && (
                            <p id="price">
                                <FontAwesomeIcon icon={faMoneyBill} /> 
                                {element['price_min']} - {element['price_max']}
                            </p>
                        )}
                        {element['price_min'] === element['price_max'] && (
                            <p id="price">
                                <FontAwesomeIcon icon={faMoneyBill} className="pe-1" />
                                {element['price_min']}
                            </p>
                        )}
                        
                        {/* Area */}
                        {element['area_min'] !== element['area_max'] && (
                            <p id="surface_area" className="pe-3 pb-2">
                                <FontAwesomeIcon icon={faChartArea} className="pe-1" />
                                {element['area_min']} m² - {element['area_max']} m²
                            </p>
                        )}
                        {element['area_min'] === element['area_max'] && (
                            <p id="surface_area" className="pe-3 pb-2">
                                <FontAwesomeIcon icon={faChartArea} className="pe-1" /> 
                                {element['area_min']} m²
                            </p>
                        )}
                        
                        {/* Number of rooms */}
                        {element['no_of_rooms_min'] !== element['no_of_rooms_max'] && (
                            <p id="number_of_rooms" className="pe-3 pb-2">
                                <FontAwesomeIcon icon={faPeopleRoof} className="pe-1" />
                                {element['no_of_rooms_min'] == 0 ? "Not available" : element['no_of_rooms_min']} - {element['no_of_rooms_max']}
                            </p>
                        )}
                        {element['no_of_rooms_min'] === element['no_of_rooms_max'] && (
                            <p id="number_of_rooms" className="pe-3 pb-2">
                                <FontAwesomeIcon icon={faPeopleRoof} className="pe-1" />
                                {element['no_of_rooms_min'] == 0 ? "Not available" : element['no_of_rooms_min']}
                            </p>
                        )}

                        <div className="text-center">
                            <a className="text-center">See details</a>
                        </div>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated: {data[0]} at {data[1]}</small>
                </Card.Footer>
            </Card>
            <ListingModal show={show} handleClose={handleClose} />
        </Col>  
    )
}
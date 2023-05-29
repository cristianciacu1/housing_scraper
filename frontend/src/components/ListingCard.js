import { Card, Col } from 'react-bootstrap'

export default function ListingCard({ element, index, url, url_index }) {

    function dataSeserializer(data) {
        const parts = data.split("T")
        const date = parts[0]
        const time = parts[1].substr(0, 5)
        return [date, time];
    }

    const data = dataSeserializer(element['last_modified'][url_index])

    return(
        <Col lg={3} md={6} key={index} className="pb-3 ps-2 pe-2 d-flex align-items-stretch">
            <Card className="w-100">
                <div className="image-wrapper">
                <div id='background-image' className="backgroundStyle" style={{backgroundImage: `url(${element['img_src'][url_index]})`}} />
                </div>
                <Card.Body>
                    <Card.Title>
                        <a href={url}>
                            <h5>{element['_id']}</h5>
                        </a>
                    </Card.Title>
                    <Card.Text>
                        {/* Price */}
                        <p id="price">{element['price'][url_index]}</p>
                        <p id="surface_area" className="d-inline pe-3 pb-2">{element['surface_area'][url_index]}</p>
                        <p id="number_of_rooms" className="d-inline pe-3 pb-2">{element['number_of_rooms'][url_index]}</p>
                        <p id="furniture_status" className="d-inline pb-2">{element['furniture_status'][url_index]}</p>
                        <a href={element['publish_website_url'][url_index]} className="d-block">{element['publish_website_name'][url_index]}</a>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Last updated: {data[0]} at {data[1]}</small>
                </Card.Footer>
            </Card>
        </Col>  
    )
}
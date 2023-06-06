import { Accordion, Button, Container, Modal } from 'react-bootstrap'
import ListingAdvancedInfo from './ListingAdvancedInfo'

export default function ListingModal({ show, handleClose, element }) {
    const website_names = new Map([["https://www.huurwoningen.nl", "Huurwoningen"], 
                                   ["https://www.pararius.nl", "Pararius"]])
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header className="custom_modal_header pe-4 pt-4 pb-0" closeButton />
            <Modal.Body>
                <Container>
                    <div className="d-flex flex-row align-items-stretch">
                        <div className="d-flex flex-column pe-5 align-items-stretch">
                            <h1 className="fw-bold">{element['_id']}</h1>
                            <ListingAdvancedInfo element={element} website_names={website_names} />
                        </div>
                        <div className="d-flex ms-auto align-items-stretch">
                            {/* <img className="d-flex align-items-stretch" src={element['img_src'][0]} alt={element['img_src'][0]} /> */}
                        </div>
                    </div>
                    <div id="similar_listings" className="pt-4" style={{overflowY: 'auto'}}>
                        <h3>Similar Listings</h3>
                        <hr />
                        <Accordion style={{height: 'auto', overflow: 'auto'}}>
                            {element['url'].map((currUrl, index) => {
                                return (
                                    <div className="w-100 border rounded d-flex flex-column mb-3" key={index}>
                                        <div className="my-3 mx-5 d-inline d-flex">
                                            <div id="similar_url" className="pe-3">
                                                <p className="fw-bold m-0">Name</p>
                                                <p className="m-0 text-break">{element['_id']}</p>
                                            </div>
                                            <div id="similar_url" className="pe-3">
                                                <p className="fw-bold m-0">URL</p>
                                                <a href={currUrl} target="_blank">
                                                    <p className="m-0">Open link</p>
                                                </a>
                                            </div>
                                            <div id="ofered_by" className="pe-3 ms-auto">
                                                <p className="fw-bold m-0">Ofered By</p>
                                                <p className="m-0 text-break">{element['agencies'][index]}</p>
                                            </div>
                                            <div id="available_on">
                                                <p className="fw-bold m-0">Available on</p>
                                                <p className="m-0 text-break">{website_names.get(element['publisher_websites'][index])}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </Accordion>
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
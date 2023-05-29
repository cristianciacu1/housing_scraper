import './App.css';
import axios from 'axios'
import { useState } from 'react';
import { Button, CardGroup, Container, Row } from 'react-bootstrap'
import ListingCard from './components/ListingCard';

function App() {

  const [properties, setProperties] = useState([])
  const [getWasPressed, setGetWasPressed] = useState(false)

  const handleGet = async (event) => {
    event.preventDefault()
    await axios.get('http://localhost:8000/getalllistings/')
      .then(response => {
        setGetWasPressed(true)
        setProperties(response.data)
        console.log("Retrieval was sucessful.")
      })
      .catch(error => {
        console.log('Retrieval failed.')
      })
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    await axios.get('http://localhost:8000/updateall/')
      .then(response => {
        console.log("Updated.")
      })
      .catch(error => {
        console.log('Not updated.')
      })
  }

  return (
    <Container>
      <h1 style={{textAlign: 'center'}}>Huurwoningen's listings </h1>
      <div className="d-flex align-items-center justify-content-center">
        <Button className="d-inline me-2" onClick={handleGet} variant="dark">Get</Button>        
        <Button className="d-inline ms-2" onClick={handleUpdate} variant="dark">Update</Button>        
      </div>
      <Row className="g-4 pt-3">
        <CardGroup>
          {properties.length != 0 && getWasPressed && properties.map((element, index) => {
              // console.log(element)
              let children = []
              element['url'].map((url, url_index) => {
                console.log(url)
                children.push(<ListingCard element={element} index={index} url={url} url_index={url_index} />)
              })
              return (children);
            })
          }
          {properties.length === 0 && getWasPressed && (<div><p>No listings were found.</p></div>)}
        </CardGroup>
      </Row>
    </Container>
  );
}

export default App;

import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { CardGroup, Container, Row } from 'react-bootstrap'
import ListingCard from './components/ListingCard';

function App() {

  const [properties, setProperties] = useState([])

  const handleGet = async (event) => {
    await axios.get('http://localhost:8000/getalllistings/')
      .then(response => {
        setProperties(response.data)
        console.log("Retrieval was sucessful.")
      })
      .catch(error => {
        console.log('Retrieval failed.')
      })
  }

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <Container>
      <h1 className="py-3 text-center">Listings</h1>
      <Row className="g-4">
        <CardGroup>
          {properties.length != 0  && properties.map((element, index) => {
            return (
              <ListingCard element={element} index={index} />
            )})
          }
        </CardGroup>
      </Row>
    </Container>
  );
}

export default App;

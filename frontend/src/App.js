import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Button, CardGroup, Container, Row } from 'react-bootstrap'
import ListingCard from './components/ListingCard';

function App() {

  const [properties, setProperties] = useState([])

  useEffect(() => {
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

    const handleUpdate = async (event) => {
      await axios.get('http://localhost:8000/updateall/')
        .then(response => {
          console.log("Updated.")
          handleGet()
        })
        .catch(error => {
          console.log('Not updated.')
        })
    }
    
    handleGet();

    // Set up an interval to call fetchData every 10 minutes
    const interval = setInterval(handleUpdate, 10 * 60 * 1000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
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

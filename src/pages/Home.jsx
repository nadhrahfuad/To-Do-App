import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import PlaceCard from "../components/PlaceCard";
import { PlaceContext } from "../contexts/PlaceContext";
import LittleClock from "../components/LittleClock";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomBtn"
import PackGif from "../assets/pack.gif"

const Home =()=> {
  //extract places from context
  const { places } = useContext(PlaceContext);
  const navigate = useNavigate();

  //func for no existing places button if no existing place, link to /add page
  const noPlace = () =>{
  // YELLOW
  navigate("/add")
}

function CardGroup({ places }) {
  return places.map((place) => (
    <Col lg={4} key={place.id}>
      <PlaceCard place={place} />
    </Col>
  ));
}


  return (
    <Container>
      <div className="d-flex align-content-center align-items-center justify-content-between">
      <h1 className="my-3">Your upcoming trips</h1>
      <LittleClock/>
      </div>
      {/* if places exist show */}
      {places.length > 0 ? (
        <Row>
          <CardGroup places={places} />
        </Row>
      ) : (
        // or else show button and icon to Add
         <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
      // border: 'black solid 2px'
    }}>
        <div className="d-flex align-items-center flex-column justify-content-center " style={{ width: '100%' }}>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <h5 className="">
              Psst! 
           </h5>
            <h5 className="mb-4">
              You have no upcoming trips yet...
            </h5>
          </div>
          {/* go to /add page */}
          <CustomButton className="align-self-center" onClick={noPlace}>
            Add a trip
          </CustomButton>
          {/* handle broken GIF */}
          {PackGif ?(<img src={PackGif} alt=""/>):(<p></p>)}

        </div>
        </div>
      )}
    </Container>
  );
}
export default Home;



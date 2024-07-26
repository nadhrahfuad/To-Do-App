
import { Container } from "react-bootstrap";
import Caravan from "../assets/caravan.gif";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomBtn";

export default function ErrorPage() {
  const navigate = useNavigate();
  const goBack =()=>{
     // YELLOW
    navigate(-1);
  }
  return (
    <Container className=" d-flex align-items-center justify-content-center">
  <div className="d-flex align-items-center justify-content-center flex-column ">
    <div className="text-center ">
      <h1 className="mt-5 mb-4">Oops!</h1>
      <h4 className="mb-5">Sorry, looks like we&apos;re also trying to find that page!</h4>
    </div>
    <CustomButton onClick={goBack} className="mt-4">
      Go Back
    </CustomButton>
    {Caravan ? <img src={Caravan} alt=""  /> : <p></p>}
  </div>
</Container>
  );
}


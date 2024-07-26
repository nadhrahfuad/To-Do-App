import { Button } from 'react-bootstrap';
import './css/custom.css'; 

const CustomButton = ({children, onClick}) => {
  return (
    <Button variant=" donebtn-custom" onClick={onClick} type="submit" >
      {children}
    </Button>
  );
};

export default CustomButton;



import { Button } from 'react-bootstrap';
import './css/custom.css'; 

const DeleteButton = ({children, onClick}) => {
  return (
    <Button variant=" deletebtn-custom" onClick={onClick} className="mt-3 ">
      {children}
    </Button>
  );
};

export default DeleteButton;
import { Button } from 'react-bootstrap';
import './css/custom.css'; 

const EditButton = ({children, onClick}) => {
  return (
    <Button variant=" editbtn-custom" onClick={onClick} type="submit" className="mt-3 ">
      {children}
    </Button>
  );
};

export default EditButton;



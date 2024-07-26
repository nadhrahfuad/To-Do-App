import { Button } from 'react-bootstrap';
import './css/custom.css'; 

const MainButton = ({children, onClick}) => {
  return (
    <Button variant=" mainbtn-custom" onClick={onClick} type="submit">
      {children}
    </Button>
  );
};

export default MainButton;

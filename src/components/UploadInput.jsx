import './css/custom.css'; 
import {Form} from "react-bootstrap"

export default function UploadInput(){
  return (
    <div className="custom-file-input">
    <Form.Label className="file-label">Choose a file</Form.Label>
    <Form.Input type="file" className = "file-input"></Form.Input>
  </div>
  );
}



import { useContext } from "react";
import { Container, Row, Col, Card, Form, Alert } from "react-bootstrap";
import { PhotosContext } from "../contexts/PhotosContext";
import "../components/css/custom.css";
import CustomButton from "../components/CustomBtn";
import EditButton from "../components/EditBtn";
import DeleteButton from "../components/DeleteBtn";

const MyGallery = () => {
  const {
    photos,
    selectedFile,
    error,
    handleFileChange,
    handleUpload,
    handleDescriptionChange,
    handleEditAndSavePhoto,
    handleDeletePhoto,
  } = useContext(PhotosContext);

  return (
    <Container>
      <h1 className="my-4"> Through my eyes</h1>
      <Form.Group controlId="formFile" className="mb-4">
        <Form.Label>Upload your Photo</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => handleFileChange(e.target.files[0])}
          style={{ color: '#e53958', marginTop: '8px' }}
          className="fileInput"
        />
        {/* if selectedFile exists, show upload btn */}
        {selectedFile && (
          <div className="d-flex justify-content-center mt-4">
          <CustomButton 
          onClick={handleUpload}>
            Upload!
          </CustomButton>
          </div>
        )}
        {/* if error exists, on handleFileChange call, throw error*/}
         {error && (
          <Alert className="d-flex justify-content-center align-content-center mt-3"variant="danger">
            {error}
          </Alert>
        )}
      </Form.Group>
      {/* if 0 photos render */}
      {photos.length === 0 ? (
        <div className="my-4">
          <p>No photos uploaded yet.</p>
        </div>
      ) : (
        // else render uploaded photos
        <Row className="g-4">
          {photos.map((photo, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="mb-3">
                {photo.url && (
                  <Card.Img
                    variant="top"
                    src={photo.url}
                    className="photo-image"
                  />
                )}
                <Card.Body>
                  {/* description box */}
                  <Form.Group controlId={`description-${index}`}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      className="photo-description"
                      value={photo.description}
                      onChange={(e) =>
                        handleDescriptionChange(index, e.target.value)
                      }
                      // dont allow editing of textarea if single photo object's editable is false
                      readOnly={!photo.editable}
                    />
                  </Form.Group>
                  <div className="d-flex justify-content-between">
                  {/* if photo's editable is true, call handEdit n save from PhotosContext, update bool to false at the specific index of phoito, render save in btn */}
                  {photo.editable ? (
                    <EditButton
                    onClick={() => handleEditAndSavePhoto(index, false)}>
                      Save
                    </EditButton>

                  ) : (

                    // else render edit on btn
                    <EditButton 
                    style={{ 
                      fontSize: '7px !important'}}
                    onClick={() => handleEditAndSavePhoto(index, true)}>
                      Edit
                    </EditButton>
                  )}
                  
                  <DeleteButton 
                    onClick={() => handleDeletePhoto(index)}>
                      Delete
                    </DeleteButton>
                  
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyGallery;

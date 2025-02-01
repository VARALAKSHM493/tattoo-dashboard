
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Modal, ProgressBar, Toast } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const cardStyle = {
    width: '100%',
    height: '300px', 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', 
    overflow: 'hidden', 
    backgroundColor: '#f8f9fa',
  };
  
  const imageContainerStyle = {
    flex: '1', 
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
    objectPosition: 'center', 
  };
  
  const cardBodyStyle = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '0.5rem', 
    height: '10px', 
    backgroundColor: '#fff', 
  };
  
  

  // Fetch images on mount
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('https://tattoo-backend-steel.vercel.app/api/gallery/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [images]);

  // Handle image upload
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    handleUpload(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'gallery'); 

    try {
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dfbfpq5rf/image/upload',
        formData
      );

      const uploadedImage = cloudinaryResponse.data;

      const savedImageResponse = await axios.post('https://tattoo-backend-steel.vercel.app/api/gallery/save-image', {
        public_id: uploadedImage.public_id,
        secure_url: uploadedImage.secure_url,
      });

      setImages((prevImages) => [...prevImages, savedImageResponse.data]);
      showToastMessage('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleUpdate = async () => {
    if (!newFile) {
      showToastMessage('Please select a new image to update!');
      return;
    }

    const formData = new FormData();
    formData.append('file', newFile);
    formData.append('upload_preset', 'gallery');

    try {
      const cloudinaryResponse = await axios.post(
        'https://api.cloudinary.com/v1_1/dfbfpq5rf/image/upload',
        formData
      );

      const updatedImage = cloudinaryResponse.data;

      const response = await axios.put(
        `https://tattoo-backend-steel.vercel.app/api/gallery/images/${selectedImage._id}`,
        { public_id: updatedImage.public_id, secure_url: updatedImage.secure_url }
      );

      setImages((prevImages) =>
        prevImages.map((image) => (image._id === selectedImage._id ? response.data : image))
      );
      showToastMessage('Image updated successfully!');
      setEditMode(false);
      setNewFile(null);
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tattoo-backend-steel.vercel.app/api/gallery/images/${id}`);
      setImages((prevImages) => prevImages.filter((image) => image._id !== id));
      showToastMessage('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <Container fluid className="py-5">
      <Toast show={showToast} onClose={() => setShowToast(false)} className="position-fixed top-0 end-0 m-3">
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>

      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="mb-4 text-center">Image Gallery</h2>
          <div
            {...getRootProps()}
            className="border rounded p-3 text-center bg-light"
            style={{ cursor: 'pointer' }}
          >
            <input {...getInputProps()} />
            <p className="mb-0">Drag and drop an image here, or click to select one.</p>
          </div>
        </Col>
      </Row>

      {uploading && (
        <Row className="justify-content-center mt-3">
          <Col xs={12} md={8}>
            <ProgressBar animated now={75} label="Uploading..." />
          </Col>
        </Row>
      )}

<Row className="mt-4 g-4">
  {images.map((image) => (
    <Col xs={12} sm={6} md={4} lg={3} key={image._id}>
      <Card style={cardStyle}>
        {/* Image Container */}
        <div style={imageContainerStyle}>
          <Card.Img src={image.secure_url} alt={image.public_id} style={imageStyle} />
        </div>

        {/* Buttons Section */}
        <Card.Body style={cardBodyStyle}>
          <Button variant="primary" size="sm" onClick={() => setEditMode(true) || setSelectedImage(image)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => handleDelete(image._id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>



      <Modal show={editMode} onHide={() => setEditMode(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setNewFile(e.target.files[0])}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditMode(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Gallery;



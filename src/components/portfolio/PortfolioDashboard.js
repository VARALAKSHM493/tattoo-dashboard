import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PortfolioDashboard = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    title: "",
    category: "",
    image: "",
    popularity: "New",
  });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [imageFile, setImageFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const categories = [
    "Black & Grey",
    "Traditional",
    "Realistic",
    "Neo Traditional",
    "Artist 1", "Artist 2", "Artist 3","Popular",
  "New",
  ];

  const artists = ["Artist 1", "Artist 2", "Artist 3"];

  // Fetch Portfolio Data
  const fetchPortfolio = async () => {
    try {
      const response = await axios.get("https://tattoo-backend-steel.vercel.app/api/portfolio");
      setPortfolio(response.data);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    }
  };

  // Handle Form Submit (Add/Edit)
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!currentItem.title || !currentItem.category || !currentItem.image) {
      toast.error("Please fill in all fields including the image!");
      return;
    }

    // Check if the image URL is valid (basic check)
    const isValidImageUrl = currentItem.image.match(/\.(jpeg|jpg|gif|png)$/);
    if (!isValidImageUrl) {
      toast.error("Please provide a valid image URL.");
      return;
    }

    try {
      console.log("Form data to submit:", currentItem); // Log to check the payload

      if (isEditing) {
        // Update Portfolio Item
        await axios.put(`https://tattoo-backend-steel.vercel.app/api/portfolio/${currentItem._id}`, currentItem);
        toast.success("Item updated successfully!");
      } else {
        // Add New Portfolio Item
        await axios.post("https://tattoo-backend-steel.vercel.app/api/portfolio/post", currentItem);
        toast.success("Item added successfully!");
      }

      fetchPortfolio();
      setShowModal(false);
      resetForm();
    } catch (error) {
      toast.error("Error saving item! Please check the fields.");
      console.error("Error saving portfolio item:", error.response ? error.response.data : error.message);
    }
  };

  // Handle Image Upload to Cloudinary
  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gallery"); // Cloudinary preset
    formData.append("cloud_name", "dfbfpq5rf"); // Cloudinary cloud name

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/dfbfpq5rf/image/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = response.data.secure_url;
      setCurrentItem({ ...currentItem, image: imageUrl }); // Set image URL in current item
    } catch (error) {
      toast.error("Error uploading image!");
      console.error("Error uploading image:", error.response ? error.response.data : error.message);
    }
  };

  // Handle file selection and upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleImageUpload(file);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://tattoo-backend-steel.vercel.app/api/portfolio/${id}`);
      toast.success("Item deleted successfully!");
      fetchPortfolio();
    } catch (error) {
      toast.error("Error deleting item!");
      console.error("Error deleting portfolio item:", error);
    }
  };

  // Open Modal for Add/Edit
  const handleShowModal = (item = null) => {
    setIsEditing(!!item);
    setCurrentItem(item || { title: "", category: "", image: "", popularity: "New" });
    setShowModal(true);
  };

  // Open Quick View
  const handleQuickView = (item) => {
    setCurrentItem(item);
    setShowQuickView(true);
  };

  // Reset Form
  const resetForm = () => {
    setCurrentItem({ title: "", category: "", image: "", popularity: "New" });
    setImageFile(null);
    setIsEditing(false);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-3">
        <Col>
          <h2 className="text-center">Portfolio</h2>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => handleShowModal()}>
            Add New Portfolio Item
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>
                    <img src={item.image} alt={item.title} style={{ width: "80px", height: "50px", objectFit: "cover" }} />
                  </td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => handleQuickView(item)}>
                      Quick View
                    </Button>
                    <Button variant="warning" size="sm" onClick={() => handleShowModal(item)}>
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Portfolio Item" : "Add New Portfolio Item"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentItem.title}
                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={currentItem.category}
                onChange={(e) => setCurrentItem({ ...currentItem, category: e.target.value })}
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {currentItem.image && <img src={currentItem.image} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Quick View Modal */}
      <Modal show={showQuickView} onHide={() => setShowQuickView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Portfolio Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{currentItem.title}</h4>
          <p><strong>Category:</strong> {currentItem.category}</p>
          <img src={currentItem.image} alt={currentItem.title} style={{ width: "100%", height: "auto" }} />
        </Modal.Body>
      </Modal>

      {/* Toast Notifications Container */}
      <ToastContainer />
    </Container>
  );
};

export default PortfolioDashboard;

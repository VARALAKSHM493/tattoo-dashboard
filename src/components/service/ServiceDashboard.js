// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Table, Button, Modal, Form, Alert } from "react-bootstrap";
// import axios from "axios";
// import { CloudinaryContext, Image, Video } from "cloudinary-react";

// // Add your Cloudinary cloud name here
// const CLOUDINARY_CLOUD_NAME = "dfbfpq5rf";

// const ServiceDashboard = () => {
//   const [services, setServices] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showQuickView, setShowQuickView] = useState(false);
//   const [currentService, setCurrentService] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
//   const [imageUrl, setImageUrl] = useState("");  // Store the uploaded image URL

//   // Fetch Services
//   const fetchServices = async () => {
//     try {
//       const response = await axios.get("https://tattoo-backend-steel.vercel.app/api/services");
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   // Handle Add/Edit Service
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Add the image URL to the currentService before sending it to the backend
//     currentService.image = imageUrl;

//     try {
//       if (currentService._id) {
//         // Update service
//         await axios.put(
//           `https://tattoo-backend-steel.vercel.app/api/services/${currentService._id}`,
//           currentService
//         );
//         setAlert({
//           show: true,
//           message: "Service updated successfully!",
//           variant: "success",
//         });
//       } else {
//         // Add new service
//         await axios.post("https://tattoo-backend-steel.vercel.app/api/services", currentService);
//         setAlert({
//           show: true,
//           message: "Service added successfully!",
//           variant: "success",
//         });
//       }

//       fetchServices();
//       setShowModal(false);
//       setCurrentService(null);
//       setImageUrl("");  // Reset the image URL after form submission
//     } catch (error) {
//       setAlert({
//         show: true,
//         message: "Error saving service!",
//         variant: "danger",
//       });
//       console.error("Error saving service:", error);
//     }
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://tattoo-backend-steel.vercel.app/api/services/${id}`);
//       setAlert({
//         show: true,
//         message: "Service deleted successfully!",
//         variant: "success",
//       });
//       fetchServices();
//     } catch (error) {
//       setAlert({
//         show: true,
//         message: "Error deleting service!",
//         variant: "danger",
//       });
//       console.error("Error deleting service:", error);
//     }
//   };

//   // Open Modal for Add/Edit
//   const handleShowModal = (service = null) => {
//     setCurrentService(service || { title: "", description: "", price: "", image: "" });
//     setShowModal(true);
//   };

//   // Open Quick View Modal
//   const handleQuickView = (service) => {
//     setCurrentService(service);
//     setShowQuickView(true);
//   };

//   // Image Upload Handler using Cloudinary
//   const handleImageUpload = async (e) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       const formData = new FormData();
//       formData.append("file", files[0]);
//       formData.append("upload_preset", "gallery"); // You will need to create an upload preset on Cloudinary

//       try {
//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//           formData
//         );
//         setImageUrl(response.data.secure_url); // Set the URL of the uploaded image
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   return (
//     <Container className="py-5">
//       <Row className="mb-3">
//         <Col>
//           <h2 className="text-center">Service Dashboard</h2>
//         </Col>
//       </Row>

//       {alert.show && (
//         <Alert
//           variant={alert.variant}
//           onClose={() => setAlert({ show: false, message: "", variant: "" })}
//           dismissible
//         >
//           {alert.message}
//         </Alert>
//       )}

//       <Row className="mb-3">
//         <Col>
//           <Button variant="primary" onClick={() => handleShowModal()}>
//             Add New Service
//           </Button>
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Price</th>
//                 <th>Image</th> {/* Added Image Column */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {services.map((service, index) => (
//                 <tr key={service._id}>
//                   <td>{index + 1}</td>
//                   <td>{service.title}</td>
//                   <td>{service.description}</td>
//                   <td>{service.price}</td>
//                   <td>
//                     <img
//                       src={service.image}
//                       alt={service.title}
//                       style={{ width: "50px", height: "50px", objectFit: "cover" }} // Image styling
//                     />
//                   </td>
//                   <td>
//                     <Button
//                       variant="info"
//                       size="sm"
//                       className="me-2"
//                       onClick={() => handleQuickView(service)}
//                     >
//                       Quick View
//                     </Button>
//                     <Button
//                       variant="warning"
//                       size="sm"
//                       className="me-2"
//                       onClick={() => handleShowModal(service)}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="danger"
//                       size="sm"
//                       onClick={() => handleDelete(service._id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* Add/Edit Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>
//             {currentService?._id ? "Edit Service" : "Add New Service"}
//           </Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleFormSubmit}>
//           <Modal.Body>
//             <Form.Group className="mb-3" controlId="formTitle">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter title"
//                 value={currentService?.title || ""}
//                 onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formDescription">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 placeholder="Enter description"
//                 value={currentService?.description || ""}
//                 onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formPrice">
//               <Form.Label>Price</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter price"
//                 value={currentService?.price || ""}
//                 onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formImage">
//               <Form.Label>Image Upload</Form.Label>
//               <Form.Control
//                 type="file"
//                 onChange={handleImageUpload}
//                 required
//               />
//               {imageUrl && (
//                 <img src={imageUrl} alt="uploaded" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
//               )}
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="primary">
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>

//       {/* Quick View Modal */}
//       <Modal show={showQuickView} onHide={() => setShowQuickView(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Quick View: {currentService?.title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h5>Description: {currentService?.description}</h5>
//           <h5>Price: {currentService?.price}</h5>
//           <img
//             src={currentService?.image}
//             alt={currentService?.title}
//             style={{ width: "100%", height: "auto", objectFit: "cover" }}
//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowQuickView(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default ServiceDashboard;
 












// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Table,
//   Button,
//   Modal,
//   Form,
//   Alert,
// } from "react-bootstrap";
// import axios from "axios";

// const ServiceDashboard = () => {
//   const [services, setServices] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showQuickView, setShowQuickView] = useState(false);
//   const [currentService, setCurrentService] = useState(null);
//   const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
//   const [imageFile, setImageFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const CLOUDINARY_UPLOAD_PRESET = "gallery"; // Replace with your preset
//   const CLOUDINARY_CLOUD_NAME = "dfbfpq5rf"; // Replace with your Cloudinary name

//   // Fetch Services
//   const fetchServices = async () => {
//     try {
//       const response = await axios.get("https://tattoo-backend-steel.vercel.app/api/services");
//       setServices(response.data);
//     } catch (error) {
//       console.error("Error fetching services:", error);
//     }
//   };

//   // Upload Image to Cloudinary
//   const uploadImage = async (file) => {
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//         formData
//       );
//       setUploading(false);
//       return response.data.secure_url; // Cloudinary returns a secure URL for the uploaded image
//     } catch (error) {
//       console.error("Image upload failed:", error);
//       setUploading(false);
//       return null;
//     }
//   };

//   // Handle Add/Edit Service
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     let imageUrl = currentService?.image || ""; // Keep existing image if no new upload

//     if (imageFile) {
//       const uploadedUrl = await uploadImage(imageFile);
//       if (!uploadedUrl) {
//         setAlert({ show: true, message: "Image upload failed!", variant: "danger" });
//         return;
//       }
//       imageUrl = uploadedUrl;
//     }

//     try {
//       if (currentService?._id) {
//         // Update service
//         await axios.put(
//           `https://tattoo-backend-steel.vercel.app/api/services/${currentService._id}`,
//           { ...currentService, image: imageUrl }
//         );
//         setAlert({ show: true, message: "Service updated successfully!", variant: "success" });
//       } else {
//         // Add new service
//         await axios.post("https://tattoo-backend-steel.vercel.app/api/services", {
//           ...currentService,
//           image: imageUrl,
//         });
//         setAlert({ show: true, message: "Service added successfully!", variant: "success" });
//       }

//       fetchServices();
//       setShowModal(false);
//       setCurrentService(null);
//       setImageFile(null);
//     } catch (error) {
//       setAlert({ show: true, message: "Error saving service!", variant: "danger" });
//       console.error("Error saving service:", error);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   return (
//     <Container className="py-5">
//       <Row className="mb-3">
//         <Col>
//           <h2 className="text-center">Service Dashboard</h2>
//         </Col>
//       </Row>

//       {alert.show && (
//         <Alert
//           variant={alert.variant}
//           onClose={() => setAlert({ show: false, message: "", variant: "" })}
//           dismissible
//         >
//           {alert.message}
//         </Alert>
//       )}

//       <Row className="mb-3">
//         <Col>
//           <Button variant="primary" onClick={() => setShowModal(true)}>
//             Add New Service
//           </Button>
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           <Table striped bordered hover responsive>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Title</th>
//                 <th>Description</th>
//                 <th>Price</th>
//                 <th>Image</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {services.map((service, index) => (
//                 <tr key={service._id}>
//                   <td>{index + 1}</td>
//                   <td>{service.title}</td>
//                   <td>{service.description}</td>
//                   <td>${service.price}</td>
//                   <td>
//                     <img
//                       src={service.image}
//                       alt={service.title}
//                       style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                     />
//                   </td>
//                   <td>
//                     <Button
//                       variant="info"
//                       size="sm"
//                       className="me-2"
//                       onClick={() => setShowQuickView(true)}
//                     >
//                       Quick View
//                     </Button>
//                     <Button
//                       variant="warning"
//                       size="sm"
//                       className="me-2"
//                       onClick={() => setShowModal(true)}
//                     >
//                       Edit
//                     </Button>
//                     <Button variant="danger" size="sm">
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </Col>
//       </Row>

//       {/* Add/Edit Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>{currentService?._id ? "Edit Service" : "Add New Service"}</Modal.Title>
//         </Modal.Header>
//         <Form onSubmit={handleFormSubmit}>
//           <Modal.Body>
//             <Form.Group className="mb-3">
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter title"
//                 value={currentService?.title || ""}
//                 onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter description"
//                 value={currentService?.description || ""}
//                 onChange={(e) =>
//                   setCurrentService({ ...currentService, description: e.target.value })
//                 }
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Price ($)</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter price"
//                 value={currentService?.price || ""}
//                 onChange={(e) => setCurrentService({ ...currentService, price: e.target.value })}
//                 required
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setImageFile(e.target.files[0])}
//               />
//               {uploading && <p>Uploading...</p>}
//             </Form.Group>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setShowModal(false)}>
//               Cancel
//             </Button>
//             <Button type="submit" variant="primary">
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </Container>
//   );
// };

// export default ServiceDashboard;






import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const ServiceDashboard = () => {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const CLOUDINARY_UPLOAD_PRESET = "gallery";
  const CLOUDINARY_CLOUD_NAME = "dfbfpq5rf";

  // Fetch Services
  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "https://tattoo-backend-steel.vercel.app/api/services"
      );
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Upload Image to Cloudinary
  const uploadImage = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      setUploading(false);
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      setUploading(false);
      return null;
    }
  };

  // Handle Add/Edit Service
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = currentService?.image || "";

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (!uploadedUrl) {
        setAlert({
          show: true,
          message: "Image upload failed!",
          variant: "danger",
        });
        return;
      }
      imageUrl = uploadedUrl;
    }

    try {
      if (currentService?._id) {
        await axios.put(
          `https://tattoo-backend-steel.vercel.app/api/services/${currentService._id}`,
          { ...currentService, image: imageUrl }
        );
        setAlert({
          show: true,
          message: "Service updated successfully!",
          variant: "success",
        });
      } else {
        await axios.post("https://tattoo-backend-steel.vercel.app/api/services", {
          ...currentService,
          image: imageUrl,
        });
        setAlert({
          show: true,
          message: "Service added successfully!",
          variant: "success",
        });
      }

      fetchServices();
      setShowModal(false);
      setCurrentService(null);
      setImageFile(null);
    } catch (error) {
      setAlert({
        show: true,
        message: "Error saving service!",
        variant: "danger",
      });
      console.error("Error saving service:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://tattoo-backend-steel.vercel.app/api/services/${id}`
      );
      setAlert({
        show: true,
        message: "Service deleted successfully!",
        variant: "success",
      });
      fetchServices();
    } catch (error) {
      setAlert({
        show: true,
        message: "Error deleting service!",
        variant: "danger",
      });
      console.error("Error deleting service:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-3">
        <Col>
          <h2 className="text-center">Services</h2>
        </Col>
      </Row>

      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() =>
            setAlert({ show: false, message: "", variant: "" })
          }
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      <Row className="mb-3">
        <Col>
          <Button
            variant="primary"
            onClick={() => {
              setCurrentService({
                title: "",
                description: "",
                price: "",
                image: "",
              });
              setShowModal(true);
            }}
          >
            Add New Service
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
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th style={{ width: "300px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id}>
                  <td>{index + 1}</td>
                  <td>{service.title}</td>
                  <td>{service.description}</td>
                  <td>₹{service.price}</td>
                  <td>
                    <img
                      src={service.image}
                      alt={service.title}
                      style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                  </td>
                  <td >
                    <Button
                      variant="info"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setCurrentService(service);
                        setShowQuickView(true);
                      }}
                    >
                      Quick View
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setCurrentService(service);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Quick View Modal */}
      <Modal show={showQuickView} onHide={() => setShowQuickView(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Service Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{currentService?.title}</h5>
          <p>{currentService?.description}</p>
          <p>Price: ₹{currentService?.price}</p>
          <img
            src={currentService?.image}
            alt={currentService?.title}
            style={{ width: "100%", height: "auto" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowQuickView(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentService?._id ? "Edit Service" : "Add New Service"}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={currentService?.title || ""}
                onChange={(e) =>
                  setCurrentService({ ...currentService, title: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={currentService?.description || ""}
                onChange={(e) =>
                  setCurrentService({ ...currentService, description: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (₹)</Form.Label>
              <Form.Control
                type="text"
                value={currentService?.price || ""}
                onChange={(e) =>
                  setCurrentService({ ...currentService, price: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => setImageFile(e.target.files[0])} />
              {currentService?.image && (
                <img src={currentService.image} alt="Preview" className="mt-2" style={{ width: "100px" }} />
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ServiceDashboard;

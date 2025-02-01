
// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Form,
//   Button,
//   Row,
//   Col,
//   Card,
//   Image,
//   Spinner,
//   Modal,
// } from 'react-bootstrap';
// import { EyeFill } from 'react-bootstrap-icons'; // Import the eye icon
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const NewsForm = () => {
//   const [formValues, setFormValues] = useState({
//     title: '',
//     description: '',
//     author: '',
//     image: { public_id: '', secure_url: '' },
//     date: '',
//   });
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [editing, setEditing] = useState(false);
//   const [currentId, setCurrentId] = useState(null);
//   const [preview, setPreview] = useState(null); // State for preview modal

//   const { id } = useParams(); // Get news ID from route parameters
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       fetchNewsDetails(id);
//     } else {
//       fetchNews(); // Fetch all news if no specific ID
//     }
//   }, [id]);

//   const fetchNews = async () => {
//     try {
//       const response = await axios.get('https://tattoo-backend-steel.vercel.app/api/news');
//       setNews(response.data);
//     } catch (error) {
//       console.error('Error fetching news:', error);
//     }
//   };

//   const fetchNewsDetails = async (id) => {
//     try {
//       const response = await axios.get(`https://tattoo-backend-steel.vercel.app/api/news/${id}`);
//       const newsItem = response.data;

//       setFormValues({
//         title: newsItem.title || '',
//         description: newsItem.description || '',
//         author: newsItem.author || '',
//         image: newsItem.image || { public_id: '', secure_url: '' },
//         date: newsItem.date ? new Date(newsItem.date).toISOString().split('T')[0] : '',
//       });
//       setEditing(true);
//       setCurrentId(newsItem._id);
//     } catch (error) {
//       console.error('Error fetching news details:', error.response?.data || error.message);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormValues((prevValues) => ({
//       ...prevValues,
//       [name]: value,
//     }));
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setUploading(true);
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', 'gallery'); // Replace with your Cloudinary preset

//     try {
//       const response = await axios.post(
//         'https://api.cloudinary.com/v1_1/dfbfpq5rf/image/upload',
//         formData
//       );
//       setFormValues((prevValues) => ({
//         ...prevValues,
//         image: {
//           public_id: response.data.public_id,
//           secure_url: response.data.secure_url,
//         },
//       }));
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formValues.title || !formValues.description || !formValues.date || !formValues.image.secure_url) {
//       alert('Please fill in all required fields!');
//       return;
//     }

//     setLoading(true);

//     try {
//       const url = editing
//         ? `https://tattoo-backend-steel.vercel.app/api/news/update/${currentId}`
//         : 'https://tattoo-backend-steel.vercel.app/api/news/add';
//       const method = editing ? 'put' : 'post';

//       await axios[method](url, formValues);
//       fetchNews(); // Refresh news list
//       resetForm();
//       navigate('/news'); // Redirect to the news list page after saving
//     } catch (error) {
//       console.error('Error submitting form:', error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditing(true);
//     setFormValues({
//       title: item.title,
//       description: item.description,
//       author: item.author,
//       image: item.image || { public_id: '', secure_url: '' },
//       date: item.date.split('T')[0],
//     });
//     setCurrentId(item._id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this news article?')) {
//       try {
//         await axios.delete(`https://tattoo-backend-steel.vercel.app/api/news/delete/${id}`);
//         fetchNews();
//       } catch (error) {
//         console.error('Error deleting news:', error);
//       }
//     }
//   };

//   const resetForm = () => {
//     setFormValues({
//       title: '',
//       description: '',
//       author: '',
//       image: { public_id: '', secure_url: '' },
//       date: '',
//     });
//     setEditing(false);
//     setCurrentId(null);
//   };

//   const handlePreview = (item) => {
//     setPreview(item);
//   };

//   const closePreview = () => setPreview(null);

//   return (
//     <Container fluid className="py-5">
//       <h2 className="text-center mb-4">{editing ? 'Edit News' : 'Create News'}</h2>
//       <Form onSubmit={handleSubmit}>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Title</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="title"
//                 value={formValues.title}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Author</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="author"
//                 value={formValues.author}
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col>
//             <Form.Group>
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={4}
//                 name="description"
//                 value={formValues.description}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Published Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="date"
//                 value={formValues.date}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>Upload Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 onChange={handleImageUpload}
//                 disabled={uploading}
//               />
//               {uploading && <Spinner animation="border" size="sm" className="mt-2" />}
//               {formValues.image.secure_url && (
//                 <Image src={formValues.image.secure_url} 
//                 style={{ width: '100px' }}
//                 rounded className="mt-3" fluid />
//               )}
//             </Form.Group>
//           </Col>
//         </Row>
//         <Button type="submit" variant="danger" disabled={loading} className="w-100">
//           {loading ? 'Saving...' : editing ? 'Update News' : 'Create News'}
//         </Button>
//       </Form>

//       {/* <h3 className="text-center mt-5">All News</h3>
//       <Row className="g-3 mt-3">
//         {news.map((item) => (
//           <Col xs={12} sm={6} md={4} key={item._id}>
//             <Card>
//               <Card.Img
//                 variant="top"
//                 src={item.image?.secure_url || '/default-image.jpg'}
//                 alt={item.title}
//               />
//               <Card.Body>
//                 <Card.Title>{item.title}</Card.Title>
//                 <Card.Text>{item.description}</Card.Text>
//                 <Button variant="info" onClick={() => handlePreview(item)} className="me-2">
//                   <EyeFill /> Quick View
//                 </Button>
//                 <Button variant="primary" onClick={() => handleEdit(item)} className="me-2">
//                   Edit
//                 </Button>
//                 <Button variant="danger" onClick={() => handleDelete(item._id)}>
//                   Delete
//                 </Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row> */}

//       {/* Modal for Quick View */}
//       {preview && (
//         <Modal show={true} onHide={closePreview}>
//           <Modal.Header closeButton>
//             <Modal.Title>{preview.title}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Image src={preview.image?.secure_url} fluid className="mb-3" />
//             <p><strong>Author:</strong> {preview.author}</p>
//             <p>{preview.description}</p>
//           </Modal.Body>
//         </Modal>
//       )}
//     </Container>
//   );
// };

// export default NewsForm;

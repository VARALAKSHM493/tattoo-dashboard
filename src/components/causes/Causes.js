// import React, { useState, useEffect } from 'react';
// import { Container, Form, Button, Row, Col, Spinner, Image } from 'react-bootstrap';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const CampaignForm = () => {
//   const [formValues, setFormValues] = useState({
//     title: '',
//     description: '',
//     image: { public_id: '', secure_url: '' },
//     goalAmount: '',
//     startDate: '',
//     endDate: '',
//   });
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const { id } = useParams(); 
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       fetchCampaignDetails(id);
//     }
//   }, [id]);

//   const fetchCampaignDetails = async (id) => {
//     try {
//       const response = await axios.get(`https://tattoo-backend-steel.vercel.app/api/campaigns/${id}`);
//       const campaign = response.data.campaign;

//       setFormValues({
//         title: campaign.title || '',
//         description: campaign.description || '',
//         image: campaign.image || { public_id: '', secure_url: '' },
//         goalAmount: campaign.goalAmount || '',
//         startDate: campaign.startDate ? new Date(campaign.startDate).toISOString().split('T')[0] : '',
//         endDate: campaign.endDate ? new Date(campaign.endDate).toISOString().split('T')[0] : '',
//       });
//     } catch (error) {
//       console.error('Error fetching campaign details:', error.response?.data || error.message);
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
//     formData.append('upload_preset', 'gallery'); 

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

//     if (
//       !formValues.title ||
//       !formValues.description ||
//       !formValues.goalAmount ||
//       !formValues.startDate ||
//       !formValues.endDate ||
//       !formValues.image.secure_url
//     ) {
//       alert('Please fill in all required fields!');
//       return;
//     }

//     setLoading(true);
//     const formattedStartDate = new Date(formValues.startDate).toISOString();
//     const formattedEndDate = new Date(formValues.endDate).toISOString();

//     const payload = {
//       ...formValues,
//       startDate: formattedStartDate,
//       endDate: formattedEndDate,
//     };

//     try {
//       const url = id
//         ? `https://tattoo-backend-steel.vercel.app/api/campaigns/${id}`
//         : 'https://tattoo-backend-steel.vercel.app/api/campaigns';
//       const method = id ? 'put' : 'post';

//       await axios[method](url, payload);
//       navigate('/causes'); 
//     } catch (error) {
//       console.error('Error submitting campaign form:', error.response?.data || error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container fluid className="py-5">
//       <h2 className="text-center mb-4">{id ? 'Edit Campaign' : 'Create Campaign'}</h2>
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
//               <Form.Label>Goal Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 name="goalAmount"
//                 value={formValues.goalAmount}
//                 onChange={handleChange}
//                 required
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
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="startDate"
//                 value={formValues.startDate}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//           <Col md={6}>
//             <Form.Group>
//               <Form.Label>End Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="endDate"
//                 value={formValues.endDate}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//           </Col>
//         </Row>
//         <Row className="mb-3">
//           <Col>
//             <Form.Group>
//               <Form.Label>Image</Form.Label>
//               <Form.Control
//                 type="file"
//                 onChange={handleImageUpload}
//                 disabled={uploading}
//               />
//               {uploading && <Spinner animation="border" size="sm" className="mt-2" />}
//               {formValues.image.secure_url && (
//                 <div className="mt-3">
//                   <Image
//                     src={formValues.image.secure_url}
//                     alt="Current Campaign"
//                     rounded
//                     style={{ width: '100px' }}
//                   />
//                   <p className="text-muted">Current Image</p>
//                 </div>
//               )}
//             </Form.Group>
//           </Col>
//         </Row>
//         <Button type="submit" variant="danger" disabled={loading} className="w-100">
//           {loading ? 'Saving...' : id ? 'Update Campaign' : 'Create Campaign'}
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default CampaignForm;



// import React, { useEffect, useState } from 'react';
// import { Container, Button, Table, Modal, Row, Col, Image } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';

// const CampaignsList = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedCampaign, setSelectedCampaign] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCampaigns();
//   }, []);

//   const fetchCampaigns = async () => {
//     try {
//       const response = await axios.get('https://tattoo-backend-steel.vercel.app/api/campaigns');
//       setCampaigns(response.data.campaigns || []);
//     } catch (error) {
//       console.error('Error fetching campaigns:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://tattoo-backend-steel.vercel.app/api/campaigns/${id}`);
//       fetchCampaigns();
//     } catch (error) {
//       console.error('Error deleting campaign:', error);
//     }
//   };

//   const handleView = (campaign) => {
//     setSelectedCampaign(campaign);
//     setShowModal(true);
//   };

//   const handleEdit = (campaign) => {
//     navigate(`/edit-campaign/${campaign._id}`); 
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedCampaign(null);
//   };

//   return (
//     <Container className="py-5">
//       <Row className="align-items-center mb-4">
//         <Col>
//           <h2 className="text-center text-md-start">Campaigns</h2>
//         </Col>
//         <Col className="text-center text-md-end">
//           <Button variant="danger" onClick={() => navigate('/add-campaign')}>
//             Add Campaign
//           </Button>
//         </Col>
//       </Row>
//       <Table responsive bordered hover className="text-center">
//         <thead className="table-dark">
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Goal Amount</th>
//             <th>Start Date</th>
//             <th>End Date</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {campaigns.length > 0 ? (
//             campaigns.map((campaign) => (
//               <tr key={campaign._id}>
//                 <td>{campaign.title}</td>
//                 <td>{campaign.description}</td>
//                 <td>${campaign.goalAmount.toLocaleString()}</td>
//                 <td>{new Date(campaign.startDate).toLocaleDateString()}</td>
//                 <td>{new Date(campaign.endDate).toLocaleDateString()}</td>
//                 <td>
//                   {campaign.image && (
//                     <Image src={campaign.image.secure_url} rounded style={{ width: '50px', height: '50px' }} />
//                   )}
//                 </td>
//                 <td>
//                   <BsEye className="text-info me-3 cursor-pointer" onClick={() => handleView(campaign)} />
//                   <BsPencil className="text-warning me-3 cursor-pointer" onClick={() => handleEdit(campaign)} />
//                   <BsTrash className="text-danger cursor-pointer" onClick={() => handleDelete(campaign._id)} />
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="7">No campaigns found.</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       <Modal show={showModal} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Campaign Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedCampaign && (
//             <>
//               <h4>{selectedCampaign.title}</h4>
//               <p>{selectedCampaign.description}</p>
//               <p><strong>Goal Amount:</strong> ${selectedCampaign.goalAmount.toLocaleString()}</p>
//               <p><strong>Start Date:</strong> {new Date(selectedCampaign.startDate).toLocaleDateString()}</p>
//               <p><strong>End Date:</strong> {new Date(selectedCampaign.endDate).toLocaleDateString()}</p>
//               {selectedCampaign.image && (
//                 <div>
//                   <strong>Image:</strong>
//                   <br />
//                   <Image src={selectedCampaign.image.secure_url} rounded style={{ width: '100px', height: '100px' }} />
//                 </div>
//               )}
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default CampaignsList;

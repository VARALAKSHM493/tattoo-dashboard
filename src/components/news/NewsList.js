// import React, { useEffect, useState } from 'react';
// import { Container, Button, Table, Modal, Row, Col, Image } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { BsEye, BsPencil, BsTrash } from 'react-icons/bs';

// const NewsList = () => {
//   const [news, setNews] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedNews, setSelectedNews] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchNews();
//   }, []);

//   const fetchNews = async () => {
//     try {
//       const response = await axios.get('https://tattoo-backend-steel.vercel.app/api/news/'); // Replace with your API endpoint
//       setNews(response.data);
//     } catch (error) {
//       console.error('Error fetching news:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     setDeletingId(id)
//     try {
//       setNews((prevNews) => prevNews.filter((item) => item._id !== id));
//       await axios.delete(`https://tattoo-backend-steel.vercel.app/api/news/delete/${id}`);
//       fetchNews(); // Refresh the list after deletion
//     } catch (error) {
//       console.error('Error deleting news:', error);
//     }
//   };

//   const handleView = (newsItem) => {
//     setSelectedNews(newsItem);
//     setShowModal(true);
//   };

//   const handleEdit = (newsItem) => {
//     navigate(`/edit-news/${newsItem._id}`); 
//   };

//   const handleAdd = () => {
//     navigate('/add-news'); 
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedNews(null);
//   };

//   return (
//     <Container className="py-5">
//       <Row className="align-items-center mb-4">
//         <Col>
//           <h2 className="text-center text-md-start">News</h2>
//         </Col>
//         <Col className="text-center text-md-end">
//           <Button variant="danger" onClick={handleAdd}>
//             Add News
//           </Button>
//         </Col>
//       </Row>

//       {/* Table Section */}
//       <Table responsive bordered hover className="text-center">
//         <thead className="table-dark">
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Author</th>
//             <th>Published Date</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {news.length > 0 ? (
//             news.map((item) => (
//               <tr key={item._id}>
//                 <td>{item.title}</td>
//                 <td>{item.description}</td>
//                 <td>{item.author}</td>
//                 <td>{new Date(item.date).toLocaleDateString()}</td>
//                 <td>
//                   {item.image && (
//                     <Image
//                       src={item.image.secure_url}
//                       rounded
//                       style={{ width: '50px', height: '50px' }} // Image size
//                     />
//                   )}
//                 </td>
//                 <td>
//                   <BsEye
//                     className="text-info me-3 cursor-pointer"
//                     onClick={() => handleView(item)}
//                   />
//                   <BsPencil
//                     className="text-warning me-3 cursor-pointer"
//                     onClick={() => handleEdit(item)}
//                   />
//                   <BsTrash
//                     className="text-danger cursor-pointer"
//                     onClick={() => handleDelete(item._id)}
//                   />
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No news found.</td> {/* Adjusted colspan for image column */}
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Modal for Quick View */}
//       <Modal show={showModal} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>News Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedNews && (
//             <>
//               <h4>{selectedNews.title}</h4>
//               <p>{selectedNews.description}</p>
//               <p>
//                 <strong>Author:</strong> {selectedNews.author}
//               </p>
//               <p>
//                 <strong>Published Date:</strong>{' '}
//                 {new Date(selectedNews.date).toLocaleDateString()}
//               </p>
//               {selectedNews.image && (
//                 <div>
//                   <strong>Image:</strong>
//                   <br />
//                   <Image
//                     src={selectedNews.image.secure_url}
//                     rounded
//                     style={{ width: '100px', height: '100px' }} // Larger image for modal view
//                   />
//                 </div>
//               )}
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={closeModal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default NewsList;










// import React, { useEffect, useState } from 'react';
// import { Container, Table, Modal, Spinner, Alert } from 'react-bootstrap';

// import { FaEye, FaTrashAlt } from 'react-icons/fa';
// import axios from 'axios';


// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Fetch user data from the backend
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('https://tattoo-backend-steel.vercel.app/api/users/'); 
//         setUsers(response.data);
//         console.log(response.data)
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`https://tattoo-backend-steel.vercel.app/api/users/${id}`);
//       setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id)); 
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };
  

//   const handleQuickView = (user) => {
//     setSelectedUser(user);
//     setShowModal(true); 
//   };

//   const handleCloseModal = () => {
//     setShowModal(false); 
//   };

//   return (
//     <Container fluid className="mt-5">
//       <h4 className="mb-3">Users Management</h4>
//       <p>Manage all user data here.</p>

//       {loading ? (
//         <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
//           <Spinner animation="border" />
//         </div>
//       ) : users.length > 0 ? (
//         <Table striped bordered hover responsive>
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Email</th>
//               <th>Phone Number</th>
//               <th>Amount Donated</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.FirstName || 'N/A'}</td>
//                 <td>{user.LastName || 'N/A'}</td>
//                 <td>{user.email || 'N/A'}</td>
//                 <td>{user.phoneNumber || 'N/A'}</td>
//                 <td>{user.donatedAmount ? `$${user.donatedAmount}` : 'N/A'}</td>
//                 <td className="text-center">
//                   <FaEye
//                     style={{ cursor: 'pointer', color: '#007bff', marginRight: '10px', transition: 'transform 0.2s' }}
//                     onClick={() => handleQuickView(user)}
//                     onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
//                     onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                   />
//                   <FaTrashAlt
//                     style={{ cursor: 'pointer', color: '#dc3545', transition: 'transform 0.2s' }}
//                     onClick={() => handleDelete(user._id)}
//                     onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.2)')}
//                     onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         <Alert variant="info" className="text-center">
//           No users available.
//         </Alert>
//       )}

//       {/* Modal for user details */}
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>User Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedUser ? (
//             <>
//               <p><strong>First Name:</strong> {selectedUser.FirstName}</p>
//               <p><strong>Last Name:</strong> {selectedUser.LastName}</p>
//               <p><strong>Email:</strong> {selectedUser.email}</p>
//               <p><strong>Phone Number:</strong> {selectedUser.phoneNumber || 'N/A'}</p>
//               <p><strong>Amount Donated:</strong> {selectedUser.donatedAmount ? `$${selectedUser.donatedAmount}` : 'N/A'}</p>
//             </>
//           ) : (
//             <p>No user selected.</p>
//           )}
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default Users;

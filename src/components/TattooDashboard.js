import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

const TattooDashboard = () => {
  const [tattoos, setTattoos] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentTattooId, setCurrentTattooId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all tattoos on load
  useEffect(() => {
    axios.get('https://tattoo-backend-steel.vercel.app/api/tattoos')
      .then(response => setTattoos(response.data))
      .catch(err => setError('Error fetching tattoos'));
  }, []);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle adding or updating tattoo
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);  // Clear previous error
    if (editMode) {
      // Update existing tattoo
      axios.put(`https://tattoo-backend-steel.vercel.app/api/tattoos/${currentTattooId}`, formData)
        .then(() => {
          setTattoos(tattoos.map(tattoo => tattoo._id === currentTattooId ? { ...tattoo, ...formData } : tattoo));
          setFormData({ title: '', description: '', image: '' });
          setEditMode(false);
          setCurrentTattooId(null);
          navigate('/dashboard');
        })
        .catch(() => setError('Error updating tattoo'));
    } else {
      // Add new tattoo
      axios.post('https://tattoo-backend-steel.vercel.app/api/tattoos', formData)
        .then(response => {
          setTattoos([...tattoos, response.data]);
          setFormData({ title: '', description: '', image: '' });
          navigate('/dashboard');
        })
        .catch(() => setError('Error adding tattoo'));
    }
  };

  // Handle delete tattoo
  const handleDelete = (id) => {
    axios.delete(`https://tattoo-backend-steel.vercel.app/api/tattoos/${id}`)
      .then(() => {
        setTattoos(tattoos.filter(tattoo => tattoo._id !== id));
      })
      .catch(() => setError('Error deleting tattoo'));
  };

  // Handle editing tattoo (populate form for editing)
  const handleEdit = (id) => {
    const tattoo = tattoos.find(t => t._id === id);
    setFormData({ title: tattoo.title, description: tattoo.description, image: tattoo.image });
    setEditMode(true);
    setCurrentTattooId(id);
  };

  return (
    <Container className="my-5">
      <h2>Tattoo Dashboard</h2>

      {/* Display error if any */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Tattoo Form */}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Row>
          <Col xs={12} md={6} lg={4}>
            <Form.Group controlId="formTitle">
              <Form.Label>Tattoo Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Tattoo Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Form.Group controlId="formDescription">
              <Form.Label>Tattoo Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Tattoo Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Form.Group controlId="formImage">
              <Form.Label>Tattoo Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                placeholder="Tattoo Image URL"
                value={formData.image}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="mt-3">
          {editMode ? 'Update Tattoo' : 'Add Tattoo'}
        </Button>
      </Form>

      {/* Tattoos List */}
      <h3>All Tattoos</h3>
      <Row>
        {tattoos.length === 0 ? (
          <p>No tattoos available.</p>
        ) : (
          tattoos.map(tattoo => (
            <Col xs={12} md={6} lg={4} key={tattoo._id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={tattoo.image} alt={tattoo.title} />
                <Card.Body>
                  <Card.Title>{tattoo.title}</Card.Title>
                  <Card.Text>{tattoo.description}</Card.Text>
                  <Button variant="warning" onClick={() => handleEdit(tattoo._id)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDelete(tattoo._id)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default TattooDashboard;

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Row, Col, Spinner, Toast, Form } from 'react-bootstrap';
import ReactPlayer from 'react-player'; 

const Videos = () => {
  const [videos, setVideos] = useState([]); 
  const [openModal, setOpenModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState('');
  const [loading, setLoading] = useState(true); 
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Form fields state for adding new video
  const [newVideo, setNewVideo] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnail: ''
  });

  // Edit form state for updating video details
  const [editVideo, setEditVideo] = useState({
    _id: '',
    title: '',
    description: '',
    videoUrl: '',
    thumbnail: ''
  });

  // Fetch videos from the backend
  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://tattoo-backend-steel.vercel.app/api/videos/');
      setVideos(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false); 
    }
  };

  // Add video to the database
  const handleAddVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tattoo-backend-steel.vercel.app/api/videos/save-video', newVideo);
      setToastMessage('Video added successfully!');
      setShowToast(true);
      fetchVideos(); 
      setNewVideo({ title: '', description: '', videoUrl: '', thumbnail: '' }); 
    } catch (error) {
      console.error('Error adding video:', error);
      setToastMessage('Error adding video. Please try again!');
      setShowToast(true);
    }
  };

  // Handle delete video
  const handleDeleteVideo = async (id) => {
    try {
      const response = await axios.delete(`https://tattoo-backend-steel.vercel.app/api/videos/${id}`);
      setToastMessage('Video deleted successfully!');
      setShowToast(true);
      fetchVideos(); 
    } catch (error) {
      console.error('Error deleting video:', error);
      setToastMessage('Error deleting video. Please try again!');
      setShowToast(true);
    }
  };

  // Handle open edit modal
  const handleOpenEditModal = (video) => {
    setEditVideo(video);
    setOpenModal(true);
  };

  console.log(editVideo);
  // Handle update video
  const handleUpdateVideo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://tattoo-backend-steel.vercel.app/api/videos/${editVideo._id}`, editVideo);
      // console.log('Response from backend:', response);
      setToastMessage('Video updated successfully!');
      setShowToast(true);
      fetchVideos(); 
      setOpenModal(false); 
    } catch (error) {
      console.error('Error updating video:', error);
      setToastMessage('Error updating video. Please try again!');
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchVideos(); 
  }, []);

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 className="text-center">Videos</h2>

      {/* Form to add a new video */}
      <Form onSubmit={handleAddVideo} className="mb-4">
        <h3>Add New Video</h3>
        <Form.Group controlId="videoTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter video title"
            value={newVideo.title}
            onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="videoDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter video description"
            value={newVideo.description}
            onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="videoUrl">
          <Form.Label>Video URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter video URL"
            value={newVideo.videoUrl}
            onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="thumbnailUrl">
          <Form.Label>Thumbnail URL</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter thumbnail URL"
            value={newVideo.thumbnail}
            onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="danger" type="submit" className="mt-3">
  Add Video
</Button>
      </Form>

      {/* Displaying the Videos */}
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="justify-content-center">
          {Array.isArray(videos) && videos.length > 0 ? (
            videos.map((video, index) => (
              <Col xs={12} sm={6} md={4} key={index} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={video.thumbnail}
                    onClick={() => setSelectedVideo(video.videoUrl)}
                    style={{
                      cursor: 'pointer',
                      transition: 'transform 0.3s ease',
                    }}
                    className="card-hover"
                  />
                  {/* <Card.Body>
                    <Card.Title>{video.title}</Card.Title>
                    <Card.Text>{video.description}</Card.Text>
                    <Button variant="primary" onClick={() => setSelectedVideo(video.videoUrl)}>
                      Watch Video
                    </Button>
                    <Button variant="warning" onClick={() => handleOpenEditModal(video)} className="ml-2">
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteVideo(video._id)} className="ml-2">
                      Delete
                    </Button>
                  </Card.Body> */}

<Card.Body>
  <Card.Title>{video.title}</Card.Title>
  <Card.Text>{video.description}</Card.Text>
  <Button variant="primary" onClick={() => setSelectedVideo(video.videoUrl)} style={{ marginRight: "10px" }}>
    Watch Video
  </Button>
  <Button variant="warning" onClick={() => handleOpenEditModal(video)} style={{ marginRight: "10px" }}>
    Edit
  </Button>
  <Button variant="danger" onClick={() => handleDeleteVideo(video._id)}>
    Delete
  </Button>
</Card.Body>



                </Card>
              </Col>
            ))
          ) : (
            <Col xs={12}>
              <h5 className="text-center">No videos available</h5>
            </Col>
          )}
        </Row>
      )}

      {/* Modal for Video Playback */}
      <Modal show={selectedVideo} onHide={() => setSelectedVideo('')} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Video Playback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactPlayer url={selectedVideo} playing controls width="100%" height="auto" />
        </Modal.Body>
      </Modal>

      {/* Edit Video Modal */}
      <Modal show={openModal} onHide={() => setOpenModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateVideo}>
            <Form.Group controlId="editVideoTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editVideo.title}
                onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="editVideoDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={editVideo.description}
                onChange={(e) => setEditVideo({ ...editVideo, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="editVideoUrl">
              <Form.Label>Video URL</Form.Label>
              <Form.Control
                type="url"
                value={editVideo.videoUrl}
                onChange={(e) => setEditVideo({ ...editVideo, videoUrl: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="editThumbnailUrl">
              <Form.Label>Thumbnail URL</Form.Label>
              <Form.Control
                type="url"
                value={editVideo.thumbnail}
                onChange={(e) => setEditVideo({ ...editVideo, thumbnail: e.target.value })}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Video
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast for success or error messages */}
      {showToast && (
        <Toast onClose={() => setShowToast(false)} style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
    </div>
  );
};

export default Videos;

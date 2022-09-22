import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function DeleteData({ show, handleClose, setConfirmDelete }) {
  let navigate = useNavigate();
  const handleDelete = () => {
    setConfirmDelete(true);
    handleClose();
    navigate('/dashboard');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this data?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Yes
        </Button>
        <Button variant="primary" onClick={handleClose}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

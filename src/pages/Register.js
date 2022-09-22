import React, { useState, useContext } from 'react';
import { Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import background from '../assets/background.jpg';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { API } from '../config/api';

export default function Register() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post('/register', body, config);
      if (!response) {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      } else {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
      }
      setForm({
        name: '',
        email: '',
        password: '',
      });
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };
  const Login = () => {
    navigate('/');
  };
  return (
    <>
      <Card className="text-white">
        <Card.Img src={background} alt="Card image" />
        <Card.ImgOverlay>
          <Row className="d-flex align-item-center justify-content-center mx-5 my-5" md="4">
            <Form onSubmit={handleSubmit} style={{ borderRadius: '10px', backgroundColor: 'grey', padding: '10px' }}>
              <Form.Group className="mb-3">
                <Col>
                  <Form.Label>
                    <h3>Register</h3>
                  </Form.Label>
                  {message && message}
                  <Form.Control className="mb-3" type="text" name="name" placeholder="name" value={name} onChange={handleChange} required />
                  <Form.Control className="mb-3" type="email" name="email" placeholder="Email" value={email} onChange={handleChange} required />
                  <Form.Control className="mb-3" type="password" name="password" placeholder="Password" value={password} onChange={handleChange} required />
                  <Button className="mb-3 btn-danger" type="submit">
                    Register
                  </Button>
                </Col>
                <Col>
                  <p>
                    Already have an account ?
                    <b>
                      <a
                        onClick={() => {
                          Login();
                        }}
                      >
                        Klik Here
                      </a>
                    </b>
                  </p>
                </Col>
              </Form.Group>
            </Form>
          </Row>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}

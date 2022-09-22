import React, { useContext, useState } from 'react';
import { Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import background from '../assets/background.jpg';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { API } from '../config/api';

export default function LandingPage() {
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { email, password } = form;

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
      const response = await API.post('/login', body, config);

      if (response?.status == 200) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: response.data.data.user,
        });
        console.log(response);
        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Login failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  };
  const Regist = () => {
    navigate('/register');
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
                    <h3>Login</h3>
                  </Form.Label>
                  {message && message}
                  <Form.Control className="mb-3" type="email" placeholder="Email" name="email" value={email} onChange={handleChange} required />
                  <Form.Control className="mb-3" type="password" placeholder="Password" name="password" value={password} onChange={handleChange} required />
                  <Button className="mb-3" type="submit">
                    Login
                  </Button>
                </Col>
                <Col>
                  <p>
                    Don't have an account ?
                    <b>
                      <a
                        onClick={() => {
                          Regist();
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

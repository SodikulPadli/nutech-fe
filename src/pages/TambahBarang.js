import { useState } from 'react';
import { Container, Form, Col, Button, Alert } from 'react-bootstrap';
import NavbarPage from '../components/Navbar';
import { API } from '../config/api';

export default function TambahBarang() {
  const [message, setMessage] = useState(null);
  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    name: '',
    image: '',
    harga: '',
    harga_jual: '',
    stok: '',
  });

  const { name, harga, harga_jual, stok } = form;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
    });
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const formData = new FormData();
      formData.set('name', form.name);
      formData.set('harga', form.harga);
      formData.set('harga_jual', form.harga_jual);
      formData.set('stok', form.stok);
      formData.set('image', form.image[0], form.image[0].name);

      const response = await API.post('/product', formData, config);

      setForm({
        name: '',
        image: '',
        harga: '',
        harga_jual: '',
        stok: '',
      });

      setPreview(null);

      if (!response) {
        const alert = (
          <Alert variant="danger" className="py-1 d-flex justify-content-center">
            Add Product Failed
          </Alert>
        );
        setMessage(alert);
        new FormData();
      } else {
        const alert = (
          <Alert variant="success" className="py-1 d-flex justify-content-center">
            Add Product Success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavbarPage />
      <Container>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Col>
              <Form.Label>
                <h3>Tambah Barang</h3>
              </Form.Label>
              <Form.Control type="file" id="upload" name="image" hidden onChange={handleChange} required />
              <div>
                <Form.Label htmlFor="upload" className="btn btn-danger">
                  Upload Image
                </Form.Label>
                <label>Format Gambar harus JGP/PNG (Uk.Max 100KB)</label>
                {preview && (
                  <div className="my-5">
                    <img
                      src={preview}
                      style={{
                        maxWidth: '200px',
                        maxHeight: '200px',
                        objectFit: 'cover',
                      }}
                      alt="preview"
                    />
                  </div>
                )}
                {message && message}
              </div>
              <Form.Control className="mb-3" type="text" placeholder="Nama Barang" id="name" name="name" value={name} onChange={handleChange} required />
              <Form.Control className="mb-3" type="number" placeholder="Harga Beli" id="harga" name="harga" value={harga} onChange={handleChange} required />
              <Form.Control className="mb-3" type="number" placeholder="Harga Jual" id="harga_jual" name="harga_jual" value={harga_jual} onChange={handleChange} required />
              <Form.Control className="mb-3" type="number" placeholder="Stok" id="stok" name="stok" value={stok} onChange={handleChange} required />
              <Button className="mb-3" type="submit">
                Tambah
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

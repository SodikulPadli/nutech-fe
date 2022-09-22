import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { Container, Form, Col, Button } from 'react-bootstrap';
import NavbarPage from '../components/Navbar';
import { API } from '../config/api';

export default function UbahBarang() {
  let navigate = useNavigate();
  const { id } = useParams();

  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    name: '',
    image: '',
    harga: '',
    harga_jual: '',
    stok: '',
  });

  const getProduct = async () => {
    try {
      const response = await API.get('/product/' + id);
      console.log(response.data.data);
      setForm({
        name: response.data.data.name,
        harga: response.data.data.harga,
        harga_jual: response.data.data.harga_jual,
        stok: response.data.data.stok,
      });
      setPreview(response.data.data.image);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

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
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const formData = new FormData();
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('name', form.name);
      formData.set('harga', form.harga);
      formData.set('harga_jual', form.harga_jual);
      formData.set('stok', form.stok);

      // Insert product data
      const response = await API.patch(`/product/${id}`, formData, config);
      console.log(response.data.data);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <NavbarPage />
      <Container>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Form.Group className="mb-3">
            <Col>
              <h3>Ubah Barang</h3>
              <Form.Label htmlFor="upload" className="btn btn-danger">
                Upload Image
              </Form.Label>
              <label>Format Gambar harus JGP/PNG (Uk.Max 100KB)</label>
              <p>Harap Upload Kembali Gambar</p>
              <Form.Control type="file" id="upload" name="image" onChange={handleChange} hidden required />
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt="preview"
                    className="my-3"
                  />
                </div>
              )}

              <Form.Control className="mb-3" type="text" placeholder="Nama Barang" id="name" name="name" value={form.name} onChange={handleChange} required />
              <Form.Control className="mb-3" type="number" placeholder="Harga Beli" id="harga" name="harga" value={form.harga} onChange={handleChange} required />
              <Form.Control className="mb-3" type="number" placeholder="Harga Jual" id="harga_jual" name="harga_jual" value={form.harga_jual} onChange={handleChange} required />
              <Form.Control className="mb-3" type="number" placeholder="Stok" id="stok" name="stok" value={form.stok} onChange={handleChange} required />
              <Button className="mb-3 " type="submit">
                Simpan
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

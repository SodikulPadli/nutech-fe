import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import NavbarPage from '../components/Navbar';
import { API } from '../config/api';

export default function DetailBarang() {
  let { id } = useParams();
  const [product, setProducts] = useState({});
  const getProduct = async (id) => {
    try {
      const response = await API.get('/product/' + id);
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProduct(id);
  }, []);
  return (
    <>
      <NavbarPage />
      <Container>
        <Row>
          <h3 className="mb-5">Detail Barang</h3>
          <Col md="4">
            <div>
              <img src={product.image} width={'30%'} />
            </div>
          </Col>
          <Col md="8">
            <div>
              <h3> {product.name}</h3>
              <p>Harga Beli :{product.harga}</p>
              <p>Harga Jual :{product.harga_jual}</p>
              <p>Stok :{product.stok}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

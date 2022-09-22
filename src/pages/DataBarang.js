import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import NavbarPage from '../components/Navbar';
import { useMutation } from 'react-query';
import ModalDelete from '../components/DeleteData';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { API } from '../config/api';

export default function DataBarang() {
  const [state, dispatch] = useContext(UserContext);
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await API.get('/products');
      setProducts(response.data.data.products);
      setLoading(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };
  const deleteById = useMutation(async (id) => {
    try {
      setLoading(true);
      const response = await API.delete(`/product/${id}`);

      if (response) {
        getProducts();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });
  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <NavbarPage style={{ borderBotom: '2px solid black' }} />
      <Container>
        <Row className="align-item-center justify-content-center mx-5 my-5">
          <Col>
            <h3 className="mb-3">Data Barang</h3>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Foto barang</th>
                  <th>Nama Barang</th>
                  <th>Harga Beli</th>
                  <th>Harga Jual</th>
                  <th>Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr>
                    <td key={item.id}>{index + 1}</td>
                    <td>
                      <Link to={'/product/' + item.id} style={{ textDecoration: 'none' }}>
                        <img src={item.image} width={'50'} height={'50'} />
                      </Link>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.harga}</td>
                    <td>{item.harga_jual}</td>
                    <td>{item.stok}</td>
                    <td>
                      <Link to={'/ubah/' + item.id} style={{ textDecoration: 'none' }}>
                        <Button variant="primary" size="sm">
                          Ubah
                        </Button>
                      </Link>

                      <Button
                        className="ms-3"
                        variant="danger"
                        size="sm"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Hapus
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <ModalDelete setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
        </Row>
      </Container>
    </>
  );
}

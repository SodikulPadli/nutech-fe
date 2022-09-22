import { Navbar, Container, Dropdown } from 'react-bootstrap';
import logo from '../logo.svg';
import { BsFillPersonFill, BsFillPlusSquareFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function NavbarPage() {
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();

  const Logout = () => {
    console.log(state);
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/');
  };
  const TambahBarang = () => {
    navigate('/add');
  };
  const Home = () => {
    navigate('/dashboard');
  };
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand
            onClick={() => {
              Home();
            }}
          >
            <img alt="React" src={logo} width="50" height="50" className="d-inline-block align-top" /> <p className="d-inline-block mt-2">Dashboard</p>
          </Navbar.Brand>
          <div className="d-flex">
            <Dropdown>
              <Dropdown.Toggle variant="none" id="dropdown-basic">
                <BsFillPersonFill size={20} className="me-2" />
                {state.user.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    TambahBarang();
                  }}
                >
                  <BsFillPlusSquareFill className="me-2" />
                  Tambah Barang
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    Logout();
                  }}
                >
                  <FiLogOut className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

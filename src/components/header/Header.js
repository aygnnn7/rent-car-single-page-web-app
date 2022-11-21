import './Header.scss';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Link, useNavigate} from 'react-router-dom';
import { getLoggedUser,logout } from '../../utils/http-utils/user-requests';


export function Header(){
    const loggedUser = getLoggedUser();
    const carUrl = "/user/" + loggedUser.id;
    const profileUrl = "/user/profile/" + loggedUser.id;
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout().then(() =>{
            navigate('/login');
        })
    }
    
    
    return(
        <div className="header">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/cars-list">Rent a Car</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                            <Link className='nav-link' to="/cars-list">All Offers</Link>
                            <Link className='nav-link' to={carUrl}>My Cars</Link>
                            <Link className='nav-link' to={profileUrl}>My Profile/Rents</Link>
                            <Link className='nav-link' to="/car/create">Add Car</Link>
                            </Nav>
                            <span className='nav-link logout-btn' onClick={logoutHandler}>Logout</span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </div>
    
    );
}
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getLoggedUser, login, registerUser } from "../../../utils/http-utils/user-requests";
import './Register.scss';


export function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        phone: '',
        picture: '',
        
    });
    const [error,setError] = useState();

    const onInputChange = (event) => {
        setUser((prevState)=>{
            return{
                ...prevState,[event.target.name]: event.target.value
            }
        })
        setError('');
    }
    const onFormSubmit = (event) => {
        event.preventDefault();
        registerUser(user).then(() => {
            login({
                email:user.email,
                password:user.password
            }).then(()=> {
                navigate('/cars-list');
            })
        })
        .catch(error => setError(error.message))
       
    }
    return(
        <div className="register-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                {error && <span className="text-danger">{error} </span>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" name="fName" value={user.fName} onChange={onInputChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type="text" placeholder="Enter last name" name="lName" value={user.lName} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email addres</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="picture" value={user.picture} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter Number" name="phone" value={user.phone} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                     <Form.Label>Password</Form.Label>
                     <Form.Control type="password" placeholder="Enter password" name="password" value={user.password } onChange={onInputChange} required/>
                </Form.Group>
                 <div className="btn-holder">
                    <Button variant="primary" type="submit">Submit</Button>
                    <Link className="sgn-btn" to = '/login'> Aldreay have an account?</Link>
                </div>
                    
                
            </Form>
            
        </div>
    );

}
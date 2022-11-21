import { useState } from "react";
import {  login } from "../../../utils/http-utils/user-requests";
import  Form  from "react-bootstrap/Form";
import  Button  from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import './Login.scss';
export function Login() {
    

    
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const onInputChange = (event) =>{ 
        setUser((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        login(user).then(()=> {
            navigate('/cars-list');
        }).catch(error => setError(error.message))

    }

    return (
        <div className="form-wrapper">
            <Form onSubmit={onFormSubmit}>
            <h3>Login</h3>
                {error && <span className="text-danger">{error} </span>}
                

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email addres</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} required/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" name="password" value={user.password } onChange={onInputChange} required/>
                    </Form.Group>
                    <div className="btn-holder">
                    
                    <Button variant="primary" type="submit">Submit</Button>
                        <Link className="sgn-btn" to = '/register'> Sign up</Link>
                    </div>
            </Form>
        </div>
        
    )
}

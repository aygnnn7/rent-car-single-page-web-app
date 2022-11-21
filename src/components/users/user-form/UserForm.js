import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser, getUserById, logout, saveUser } from "../../../utils/http-utils/user-requests";
import './UserForm.scss'

export function UserForm(){
    const params = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        fName: '',
        lName: '',
        email:'',
        password:'',
        phone: '',
        picture: ''
    });
    useEffect(()=>{
        if(params.id){
            getUserById(params.id).then((response) =>{

                setUser(response.data)
                
            });
        }
    }, [params.id]);

    const onInputChange = (event) =>  {
        setUser((prevState) => (
            {
                ...prevState,
                [event.target.name]:event.target.value
            }
        ))
    }

    const onUserSubmit = (event) => {
        event.preventDefault();

        saveUser(user).then(()=>{
            navigate('/user/profile/'+user.id);
        })
    };

    const onAccountDelete = () => {
        // todo: ako naematelq kola koqto e aktivna naemana, ne moje da v momenta da si iztrie akaunta 
        const confirmBox = window.confirm(
            "Do you really want to delete your account permanently? Your cars automatically will be deleted from the market!"
        )
        if(confirmBox) 
            deleteUser(user.id).then(()=>{
                logout().then(()=>{
                    navigate('/login');
                });
            })
    }

    return(
        <div className="user-form-wrapper">
            <Form onSubmit={onUserSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label> First Name </Form.Label>
                    <Form.Control type="text" placeholder="Enter first name" name="fName" value={user.fName} onChange={onInputChange} required/>
                </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label> Last Name </Form.Label>
                <Form.Control type="text" placeholder="Enter last name" name="lName" value={user.lName} onChange={onInputChange} required/>
                 </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label> Email </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label> Password </Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={user.password} onChange={onInputChange} required/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label> Phone </Form.Label>
                    <Form.Control type="text" placeholder="Enter phone number" name="phone" value={user.phone} onChange={onInputChange} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label> Picture </Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="picture" value={user.picture} onChange={onInputChange}/>
                </Form.Group>
                <div className="btns-holder">
                <Button variant="primary" type="submit">Update Details</Button>
                <Button variant="danger" onClick={()=>{navigate('/user/profile/'+user.id)}} >Cancel</Button>
                <Button variant="danger"  onClick={onAccountDelete}>Delete account</Button>
                </div>
                
            </Form>
        </div>
    );
}
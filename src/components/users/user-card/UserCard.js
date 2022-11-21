
import { getActiveElement } from '@testing-library/user-event/dist/utils';
import { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import { getLoggedUser } from '../../../utils/http-utils/user-requests';
import { getAllCars } from '../../../utils/http-utils/car-requests';
import {getAllDetailsByCustomer}  from '../../../utils/http-utils/rental-requests';
import './UserCard.scss'
import { CarRentDetailsCard } from '../../cars/car-rent-details-card/CarRentDetailsCard';

export function UserCard( {user, isProfile} ){
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();
    const isProfileStyleClass = isProfile ? 'isProfile' : '';
    const [cars,setCars] = useState([]);
    const [allDetails, setAllDetails] = useState([]);
    const [usersWithRentDetails,setUserWithRentDetails] = useState([]);
    const redirectToProfile = () => {
        navigate(`/user/profile/${user.id}`);
    }
    const redirectToEdit = () => {
        navigate(`/user/profile/edit/${user.id}`);
    }
    useEffect(()=>{
        getAllCars().then((carsResponse) => {
            setCars(carsResponse.data)
        });
        getAllDetailsByCustomer(loggedUser.id).then((detailsResponse)=>{
            setAllDetails(detailsResponse.data)
            
             
        })
       
        
    },[])

    
    
    return (
        <Card className={isProfileStyleClass} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.picture} />
            <Card.Body>
                <Card.Title className='value'>{user.fName} {user.lName}</Card.Title>
                <Card.Text>
                <span className='key'>Email: </span>
                <span className='value'>{user.email}</span> 
                </Card.Text>
                <Card.Text>
                <span className='key'>Phone: </span>
                <span className='value'>{user.phone}</span> 
                </Card.Text>
                {
                    user.id === loggedUser.id && !isProfile ? <Button variant="primary" onClick={redirectToProfile}>Profile</Button>
                    : user.id === loggedUser.id && isProfile ? <Button variant="primary" onClick={redirectToEdit}>Edit Details</Button>
                    : ''
                }
               
            </Card.Body>
        </Card>
     );

}
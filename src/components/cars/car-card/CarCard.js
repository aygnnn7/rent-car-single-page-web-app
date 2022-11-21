import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import './CarCard.scss'
import { getLoggedUser, getUserById } from '../../../utils/http-utils/user-requests';
import { useEffect, useState, } from 'react';
import Modal from 'react-bootstrap/Modal';
import {  newRent } from '../../../utils/http-utils/rental-requests';




export function CarCard( {car,onCarDelete, isVip, filtered, inUserProfile,startDate,endDate} ){

   
    const [owner, setOwner] = useState(
        {
            fName: '',
            lName: '',
            email:'',
            password:'',
            phone: '',
            picture: ''
        }
    );
    const [error,setError] = useState();
    const [lgShow, setLgShow] = useState(false);
    const [discount, setDiscount] = useState(0);
    const loggedUser = getLoggedUser();
    const navigate = useNavigate();
    useEffect(()=>{
        getUserById(car.ownerId).then((response)=>{
            setOwner(response.data);
        }).catch(error => setError(error.message))
        if(startDate) {
            setDiscount(()=>{
                if(isVip) return 15;
                const days = Math.round(getTotalDays());
                if(days>=10)  return 10;
                else if(days>=5) return 7;
                else if(days>=3) return 5;
                return 0;
            })
        }

    },[car.ownerId,car.id,discount,isVip,startDate])
    
    const redirectToOffers = () =>{
        navigate(`/user/${car.ownerId}`);
    }
    const redirectToEdit = () => {
        navigate(`/car/edit/${car.id}`);
    }
    
    const handleRent = () => {
        
        
            newRent({
                    startDateTime:startDate,
                    endDateTime: endDate,
                    vehicleId: car.id,
                    customerId: loggedUser.id,
                    active: true,
                    days: getTotalDays(),
                    discount: discount,
                    priceTotal: getTotalPrice()
                    });
            navigate(`/user/profile/${loggedUser.id}`);
           
    }

    const handleClose = () => setLgShow(false);

    const getDiscountPercent = () => {
        if(isVip) return 15;
        const days = Math.round(getTotalDays());
        if(days>=10)  return 10;
        else if(days>=5) return 7;
        else if(days>=3) return 5;
        return 0;
    }
    
    if(!car){
        return <p>No Car!</p>;
    }

    const getTotalDays = ()=>{
        var ds = new Date(startDate);
        var de = new Date(endDate)
        var dt = (de.getTime() - ds.getTime())/(1000* 3600* 24);
        return Math.round(dt);
    }

    const getTotalPrice = () => {
        return discount ? getDiscountPrice().toFixed(2) : car.pricePerDay*getTotalDays().toFixed(2);
    }
    
    const getDiscountPrice = () => {
        const x = Math.round(getTotalDays()*car.pricePerDay) - (Math.round(getTotalDays()*car.pricePerDay)/discount);
        return x;
    }

   
    const renderButtons = () => {
        if(loggedUser.id === car.ownerId) {
            return (
                <div className='btn-holder'> 
                    <Button variant="primary" onClick={ redirectToEdit } >Edit</Button> 
                    <Button variant="danger" onClick={()=> onCarDelete(car.id)}>Delete</Button>
                </div>
            )
        }
            return(
                
                <div className='btn-holder'> 
                
                    { !inUserProfile ? <Button variant="primary" onClick={ redirectToOffers } > Owners Profile</Button> : '' }
                    { filtered ?  <Button variant="success" onClick={ () => {
                        setLgShow(true); setDiscount(getDiscountPercent()) } }> Rent <em>{car.pricePerDay}lv/day</em></Button>  : '' }
                </div>
            )
    }

    
     return (
        <Card style={{ width: '18rem' }}>
        {error && <span className="text-danger">{error} </span>}
            <Card.Img  variant="top" src={car.picture} />
            {
                <Card.Body>
                    <Card.Title>{car.brand}</Card.Title>
                    <Card.Text>
                        <span className='value'>{car.brand} {car.model}, {car.year}, {car.type}, {car.fuelType}, {car.seats} seats </span> 
                    </Card.Text>
                    {
                        (loggedUser.id !== car.ownerId) ?  <Card.Text>
                                                                <span className='key'>Renter: </span>
                                                                <span className='value'>{owner.fName} {owner.lName}</span> 
                                                            </Card.Text> : !inUserProfile 
                                                        ? <Card.Text className='owner-banner'>
                                                             <h6>You are the owner!</h6>
                                                          </Card.Text> :""
                    }
                    { renderButtons() }
                    <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                    >
                        <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {car.brand} <em>by {owner.fName} {owner.lName}</em>
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            
                            <Card.Text>
                                <span className='key'>Model: </span>
                                <span className='value'>{car.model}</span> 
                            </Card.Text>
                            <Card.Text>
                                <span className='key'>Year: </span>
                                <span className='value'>{car.year}</span>
                            </Card.Text> 
                            <Card.Text>
                                <span className='key'>Type: </span>
                                <span className='value'>{car.type}</span>
                            </Card.Text> 
                            <Card.Text>
                                <span className='key'>Fuel: </span>
                                <span className='value'>{car.year}</span>
                            </Card.Text> 
                            <Card.Text>
                                <span className='key'>Seats: </span>
                                <span className='value'>{car.seats}</span>
                            </Card.Text>
                            <Card.Text>
                                <span className='key'>From: </span>
                                <span className='value'> { startDate ? startDate.toDateString() : ""}</span>
                            </Card.Text> 
                            <Card.Text>
                                <span className='key'>To: </span>
                                <span className='value'> {endDate? endDate.toDateString() :''}</span>
                            </Card.Text> 
                            <Card.Text>
                                <span className='key'>Days: </span>
                                <span className='value'>{Math.round(getTotalDays())}</span>
                            </Card.Text>
                            <Card.Text>
                                <span className='key'>Price per Day: </span>
                                <span className='value'>{Number(car.pricePerDay).toFixed(2)} leva</span>
                            </Card.Text>
                            {
                                
                                discount ?
                                <Card.Text>
                                    <span className='key'>Discount: </span>
                                    <span className='value'>{discount} % VIP Bonus</span>
                                </Card.Text> : ''

                            }
                            
                            <div className='renting-card-footer'>
                                <span className='totalPrice'> Total price:  {
                                     getTotalPrice()
                                } leva</span>
                                <Button variant='success' onClick={handleRent}>Pay</Button>
                                <Button  variant='danger' onClick={handleClose}>Cancel</Button>
                            </div>
                            
                        </Modal.Body>
                    </Modal>
                </Card.Body>
            }
            
        </Card>
     );

}
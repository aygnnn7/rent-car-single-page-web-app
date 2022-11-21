import { Card } from "react-bootstrap";

export function CarRentDetailsCard({usersWithRentDetails}){
return(<Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={usersWithRentDetails.picture} />
    <Card.Body>
        <Card.Title className='value'>{usersWithRentDetails.brand}</Card.Title>
        <Card.Text>
            <span className='value'>{usersWithRentDetails.brand} {usersWithRentDetails.model}, {usersWithRentDetails.year}, {usersWithRentDetails.type}, {usersWithRentDetails.fuelType}, {usersWithRentDetails.seats} seats </span> 
        </Card.Text>
        <Card.Text>
            <span className='key'>From: </span> 
            <span className='value'>{new Date(usersWithRentDetails.startDate).toDateString()}</span> 
        </Card.Text>
        <Card.Text>
            <span className='key'>To: </span> 
            <span className='value'>{new Date(usersWithRentDetails.endDate).toDateString()}</span> 
        </Card.Text>
        <Card.Text>
            <span className='key'>Dicount: </span> 
            <span className='value'>{usersWithRentDetails.discount}%</span> 
        </Card.Text>
        <Card.Text>
            <span className='key'>Paid: </span> 
            <span className='value'>{Number(usersWithRentDetails.priceTotal).toFixed(2)} leva {'('}{usersWithRentDetails.pricePerDay}{'lv/daily)'}</span> 
        </Card.Text>
    </Card.Body>
</Card>
)
}
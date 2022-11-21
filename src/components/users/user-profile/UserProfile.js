import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCars } from "../../../utils/http-utils/car-requests";
import { getAllDetailsByCustomer } from "../../../utils/http-utils/rental-requests";
import { getLoggedUser, getUserById } from "../../../utils/http-utils/user-requests";
import { CarRentDetailsCard } from "../../cars/car-rent-details-card/CarRentDetailsCard";
import { UserCard } from "../user-card/UserCard";
import './UserProfile.scss'
export function UserProfile(){

    const [user, setUser] =  useState([null]);
    
    const [allDetails, setAllDetails] = useState([]);
    const [cars,setCars] = useState([]);
    const loggedUser = getLoggedUser();
    const [usersWithRentDetails,setUserWithRentDetails] = useState([]);
    const params = useParams();
    useEffect(()=>{
        getUserById(params.id).then(resposne => setUser(resposne.data));
        getAllCars().then(response => setCars(response.data))
        getAllDetailsByCustomer(loggedUser.id).then((detailsResponse)=>{ setAllDetails(detailsResponse.data)})
    },[params.id])

    const setUWRD = () => {
        for (let i = 0; i < allDetails.length; i++) {
            
            if(usersWithRentDetails.length >= allDetails.length){
                return;
            }
            const c =  cars.find(car => car.id === allDetails[i].vehicleId);
            setUserWithRentDetails(prevState => [...prevState,
                {
                    id: allDetails[i].id,
                    brand: c.brand,
                    model: c.model,
                    type:c.type,
                    year: c.year,
                    fuelType: c.fuelType,
                    seats: c.seats,
                    picture: c.picture,
                    pricePerDay: c.pricePerDay,
                    days: allDetails[i].days,
                    priceTotal: allDetails[i].priceTotal,
                    startDate : allDetails[i].startDateTime,
                    endDate : allDetails[i].endDateTime,
                    discount: allDetails[i].discount
                }]
            )
         }
    }

    return(
        <div className="profile-card-wrapper">
            <UserCard user={user} isProfile={true}></UserCard>
                {setUWRD()}
            <div className='rented-cars-holder'>
                { usersWithRentDetails.map(u => <CarRentDetailsCard key={u.id} usersWithRentDetails={u}/>)   }
            </div>
        </div>
         
        
                
                
        
            
    );
}
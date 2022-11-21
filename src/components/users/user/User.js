import { useEffect, useState } from "react";
import { getLoggedUser, getUserById } from "../../../utils/http-utils/user-requests";
import { UserCard } from "../user-card/UserCard";
import { useParams } from "react-router-dom";

import './User.scss';
import { deleteCar, getAllCars, getAllCarsByOwner } from "../../../utils/http-utils/car-requests";
import { CarCard } from "../../cars/car-card/CarCard";
import { getAllDetailsByCustomer } from "../../../utils/http-utils/rental-requests";
import { CarRentDetailsCard } from "../../cars/car-rent-details-card/CarRentDetailsCard";

export function User({ownCars}){
    const params = useParams();
   const [user, setUser] =  useState([null]);
   const [cars,setCars] = useState([]);
   const loggedUser = getLoggedUser();
   const [userCars, setUserCars] = useState([]);
   const [rentedCars, setRentedCars] = useState([]);
   const [allDetails, setAllDetails] = useState([]);
   
   useEffect(()=>{
       getUserById(params.id).then(resposne => setUser(resposne.data));
       getAllCarsByOwner(params.id).then(response => setUserCars(response.data));
       getAllCars().then(response => setCars(response.data))
       getAllDetailsByCustomer(loggedUser.id).then((detailsResponse)=>{ setAllDetails(detailsResponse.data)})
       
   },[params.id])
   
   const onDeleteHandler = (id) => {
       deleteCar(id).then(()=>{
           setUserCars((prevState) => {
               return prevState.filter(car => car.id !== id);
           });
       });
   }
  
   return(
       <div className="user">
            <UserCard user = {user} /> 
            
            <div className="user-own-cars-holder ">
                {
                    userCars.length > 0 
                    ? userCars.map(car => <CarCard key={car.id} car={car} inUserProfile={true} onTaskDelete={onDeleteHandler} /> )
                    : <h1>{user.fName} has no Cars yet!</h1>
                }
            </div>
            
            
       </div>
   )
}
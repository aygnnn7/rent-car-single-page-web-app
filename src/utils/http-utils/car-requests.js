import axios from "axios";
import { getLoggedUser } from "./user-requests";

export const FuelType = {
    PETROL: 'Petrol',
    DIESEL: 'Diesel',
    HYBRID: 'Hybrid',
    ELECTRIC: 'Electric'
}

export const Seats = {
    TWO: 2,
    FOUR: 4,
    SIX: 6
}

export const Brand = {
    MERCEDES:'Mercedes-Benz',
    BMW: 'BMW',
    AUDI: 'AUDI' 
}

export const Model = {
    MODEL1: 'A100',
    MODEL2: 'B200',
    MODEL3: 'C300',
    MODEL4: 'D400'
}
export const Type = {
    ECONONMY: 'ECONOMY',
    ESTATE: 'ESTATE',
    LUXURY: 'LUXURY',
    SUV: 'SUV',
    CARGO: 'CARGO'
}

const apiUrl = 'http://localhost:3005/cars';

export function getAllCars(){
    return axios.get(apiUrl);
}

export function getAllCarsByOwner(ownerId){
    return axios.get(`${apiUrl}?ownerId=${ownerId}`); 
}

export function getCarById(carId){
    return axios.get(`${apiUrl}/${carId}`)
}


export function saveCar (car) {
 
    if(!car.id){

        const loggedUser = getLoggedUser();
        if(!car.picture)
        car.picture = "https://picsum.photos/300/200?random="+Math.random();

        car.ownerId = loggedUser.id;
        
        return axios.post(apiUrl, car);
    }
    
    return axios.put(`${apiUrl}/${car.id}`, car);
}

export function deleteCar(id) {
    return axios.delete(`${apiUrl}/${id}`);
}
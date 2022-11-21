import axios from "axios";

const apiUrl = 'http://localhost:3005/rentalDetails';

export function getAllDetails(){
    return axios.get(apiUrl);
}

export function getAllDetailsByCustomer(customerId){
    return axios.get(`${apiUrl}?customerId=${customerId}`); 
}

export function getAllDetailsByCar(carId){
    return axios.get(`${apiUrl}?vehicleId=${carId}`); 
}

export function newRent(details){
    return axios.post(apiUrl, details);
}

export function deleteRent(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

//expired rent icin put
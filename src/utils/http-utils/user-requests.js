import axios from 'axios';

const apiUrl = 'http://localhost:3005/users';
const loggedUserKey = 'loggedUser';

export function getLoggedUser(){
    return JSON.parse(localStorage.getItem('loggedUser'));
}
export async function logout(){
    return localStorage.removeItem(loggedUserKey);
}
export function getAllUsers(){
    return axios.get(apiUrl); 
}

export function getUserById(id){
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteUser(id){
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveUser(user) {
    
        user.picture = "https://picsum.photos/200/300?random="+Math.random();

    if(user.id){
        return axios.put(`${apiUrl}/${user.id}`, user);
    }
    return axios.post(apiUrl, user);
}

export  async function registerUser(user){
    const existingUsers = (await axios.get(`${apiUrl}?email=${user.email}`)).data;
    if(existingUsers.length > 0){
        throw new Error('User with this email already exists.');
    }
    return saveUser(user);
}  

export async function login(user) {
    const allUsers = (await getAllUsers()).data;

    const foundUser = allUsers.find(u => u.email === user.email && u.password === user.password);

    if(!foundUser)
        throw new Error('Invalid username/password');
   
    localStorage.setItem(loggedUserKey,JSON.stringify(foundUser));
    return foundUser;
}
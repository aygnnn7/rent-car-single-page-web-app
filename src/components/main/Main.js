import {Route, Routes} from "react-router-dom"; 
import { CarForm } from "../cars/car-form/CarForm";
import { CarsList } from "../cars/cars-list/CarsList";
import { UserForm } from "../users/user-form/UserForm";
import { UserProfile } from "../users/user-profile/UserProfile";
import { User } from "../users/user/User";
export function Main(){
    
    
    return(
        
        <div className="main-content">
            <Routes>
                <Route path="/user/:id" element= {<User/>} />
                <Route path="/cars-list" element={<CarsList/> }/> 
                <Route path="/car/edit/:id" element={<CarForm/>}/>
                <Route path="/car/create" element={<CarForm/>}/>
                <Route path="/user/profile/:id" element={<UserProfile/>}/>
                <Route path="/user/profile/edit/:id" element={<UserForm/>}/>
            </Routes>
        </div>
    );
}
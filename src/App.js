import { Routes,Route } from 'react-router-dom';
import './App.css';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import { Layout } from './components/layout/layout';
import { CarsList } from './components/cars/cars-list/CarsList';
import {AuthenticatedRoute} from  './utils/guards/AuthenticatedRoute';
import {NonAuthenticatedGuard} from './utils/guards/NonAuthenticatedGuard';
import { CarForm } from './components/cars/car-form/CarForm';
import { User } from './components/users/user/User';
import { UserProfile } from './components/users/user-profile/UserProfile';
import { UserForm } from './components/users/user-form/UserForm';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<NonAuthenticatedGuard><Register/></NonAuthenticatedGuard>} />
        <Route exact path="/login" element={<NonAuthenticatedGuard><Login/></NonAuthenticatedGuard>}/>
        <Route exact path="/"  element={<AuthenticatedRoute><Layout/></AuthenticatedRoute>}>
          <Route path="/car/edit/:id" element={<CarForm/>}/>
          <Route path="/cars-list" element={<CarsList/> }/> 
          <Route path="/car/create" element={<CarForm/>}/>
          <Route  path="/user/:id" element= {<User/>} />
          <Route path="/user/profile/:id" element={<UserProfile/>}/>
          <Route path="/user/profile/edit/:id" element={<UserForm/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import Button  from "react-bootstrap/Button";
import Form  from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { Brand, FuelType, getCarById, Model, Models, saveCar, Seats, Type } from "../../../utils/http-utils/car-requests";
import './CarForm.scss';

export function CarForm(){
    const params = useParams();
    const navigate = useNavigate();
    const defaultCar = {
        brand: Brand.MERCEDES,
        model: Model.MODEL1,
        fuelType: FuelType.PETROL,
        seats: Seats.TWO,
        type: Type.SUV,
        year: '',
        picture: '',
        pricePerDay: ''
        
    } 
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year:'',
        fuelType:'',
        type:'',
        seats: '',
        picture: '',
        pricePerDay: ''
    });
    
    useEffect(()=>{
        if(params.id){
            getCarById(params.id).then((response) =>{

                setCar(response.data);
            });
        }else{
            setCar(defaultCar)
        }
    }, [params.id]);

    const onInputChange = (event) =>  {
        setCar((prevState) => (
            {
                ...prevState,
                [event.target.name]:event.target.value
            }
        ))
    }

    const onCarSubmit =  (event) => {
         event.preventDefault();
        
        saveCar(car).then(()=>{
            navigate('/cars-list')
        });
    };

   

    return(
        <div className="car-form-wrapper">
        <Form onSubmit={onCarSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Category </Form.Label>
            <Form.Select placeholder="Select Type" name="type" value={car.type} onChange={onInputChange} required>
                { Object.keys(Type).map(type => <option key={type} value={Type[type]}>{Type[type]}</option>)}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Brand </Form.Label>
            <Form.Select placeholder="Select Brand" name="brand" value={car.brand} onChange={onInputChange} required>
                { Object.keys(Brand).map(brand => <option key={brand} value={Brand[brand]}>{Brand[brand]}</option>)}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Model </Form.Label>
            <Form.Select placeholder="Select model" name="model" default={car.model} value={car.model} onChange={onInputChange} required>
               { Object.keys(Model).map(model => <option key={model} value={Model[model]}>{Model[model]}</option>)}
        </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Fuel </Form.Label>
            <Form.Select placeholder="Select fuel type" name="fuelType" value={car.fuelType} onChange={onInputChange} required>
                { Object.keys(FuelType).map(fuelType => <option key={fuelType} value={FuelType[fuelType]}>{FuelType[fuelType]}</option>)}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Seats </Form.Label>
            <Form.Select placeholder="Select seats number" name="seats" value={car.seats} onChange={onInputChange} required>
                { Object.keys(Seats).map(seats => <option key={seats} value={Seats[seats]}>{Seats[seats]}</option>)}
            </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Year </Form.Label>
            <Form.Control   type="number" min="1990" max="2022" step="1"  placeholder="Enter year" name="year" value={car.year} onChange={onInputChange} required/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Picture </Form.Label>
            <Form.Control  type="text" placeholder="Enter picture url" name="picture" value={car.picture} onChange={onInputChange}/>
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Price Per Day </Form.Label>
            <Form.Control type="number" min="20"  max="1000000" step="1" placeholder="Enter price" name="pricePerDay" value={car.pricePerDay} onChange={onInputChange} required/>
        </Form.Group>
        
        <div className="btns-holder">
            <Button variant="primary" type="submit">{car.id?'Edit Car' : 'Add Car' }</Button>
            <Button variant="danger" onClick={()=>{navigate("/cars-list")}}>Cancel</Button>
        </div>

    </Form>
        </div>
    );
}
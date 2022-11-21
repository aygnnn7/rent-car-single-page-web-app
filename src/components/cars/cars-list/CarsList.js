import { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

import { deleteCar, getAllCars } from '../../../utils/http-utils/car-requests';
import { getAllDetails, getAllDetailsByCustomer } from '../../../utils/http-utils/rental-requests';
import { getLoggedUser } from '../../../utils/http-utils/user-requests';
import { CarCard } from '../car-card/CarCard';
import './CarsList.scss'
export function CarsList({filtered}) {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const currentDateTime = new Date();
    const loggedUser = getLoggedUser();
    const [isVip, setIsVip] = useState(false);
    const [datePicked, setDatePicked] = useState(false);
    const [startDate, setStartDate] = useState(currentDateTime);
    const [endDate, setEndDate] = useState(currentDateTime);
    const [allDetails, setAllDetails ]= useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {      
        if(!datePicked){
            getAllDetails().then(response => {
                setAllDetails(response.data)
            });
            getAllCars().then(response => {
                setCars(response.data);
            });
        }
        if(endDate){
            getAllDetailsByCustomer(loggedUser.id).then((response)=>{
                if(response.data.length < 3) setIsVip(false);
                let count = 0;
                var threeMonthsBefore = new Date();
    
                threeMonthsBefore.setMonth(threeMonthsBefore.getMonth()-3);
                for (let i = 0; i < response.data.length; i++) {
                   var x = new Date(response.data[i].endDateTime);
                   if(x.getTime() > threeMonthsBefore.getTime()) count++;
                    
                }
                if(count>=3) setIsVip(true);
                else{
                    setIsVip(false);
                } 
            })
        }
    },[datePicked,loggedUser.id,endDate])
    
    const onDeleteHandler = (id) => {
        deleteCar(id).then(()=>{
            setCars((prevState) => {
                return prevState.filter(car => car.id !== id);
            });
        });
    }

    const checkIfRented = (car) => {
        const halfDayInMillSec = 43200000;
        const carRentDetails = allDetails.filter(detail => detail.vehicleId === car.id)
        if(carRentDetails.length === 0) return false; 
        for (let i = 0; i < carRentDetails.length; i++) {
            const x1 = (Date.parse(carRentDetails[i].startDateTime) - halfDayInMillSec) < endDate.getTime() &&  endDate.getTime() < (Date.parse(carRentDetails[i].endDateTime) + halfDayInMillSec);
            const x2 = (Date.parse(carRentDetails[i].startDateTime) - halfDayInMillSec) < startDate.getTime() && startDate.getTime() < (Date.parse(carRentDetails[i].endDateTime) + halfDayInMillSec);
            const x3 = (Date.parse(carRentDetails[i].startDateTime) - halfDayInMillSec) > startDate.getTime() && startDate.getTime() > (Date.parse(carRentDetails[i].endDateTime) + halfDayInMillSec);
            
            if(x1 || x2 || x3) return true;
        }
        return false;
    }

    
    const  showAvailables  =  () => {
        if(getTotalDays() <= 0) {
            setShow(true);
            return;
        }
       
        setShow(false);
        setDatePicked(true);
        setFilteredCars(cars.filter(car => !checkIfRented(car)));
    }
    
    const getTotalDays = ()=>{
        var ds = new Date(startDate);
        var de = new Date(endDate)
        var dt = (de.getTime() - ds.getTime())/(1000* 3600* 24);
        return dt;
    }
    return(
            <div className="cars-list-outer">
            {
                isVip ? <h2 ><strong style={{color:'red'}}>VIP</strong> Member</h2> : ''
            }
                <div className="dateRange">
                    <h5>Start time</h5>
                    <DateTimePicker className="dtPicker"
                        selected={startDate}
                        onChange={(date)     => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        minDate={currentDateTime}
                        value={startDate}
                    />
                    <br></br>
                    <h5>End time</h5>
                    <DateTimePicker className="dtPicker"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        value={endDate}
                    />
                </div>
                <Button onClick={showAvailables} className="show-availables-btn">Check Availability</Button>
                
                <Alert className='dateAlert' show={show} variant="danger">
                    <Alert.Heading>Caution</Alert.Heading>
                    <p>
                    Please be sure that there's mininum 1 day between starting and ending day of the date range!
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                    <Button onClick={() => setShow(false)} variant="outline-danger">
                        I got it!
                    </Button>
                    </div>
                </Alert>
                {
                    datePicked  ?   <div className="cars-list-wrapper">
                                        { filteredCars.map(car => <CarCard startDate={startDate} endDate={endDate} key={car.id} car={car} filtered={true} isVip={isVip} onCarDelete={onDeleteHandler} />)}
                                    </div>
                                :   <div className="cars-list-wrapper">
                                        { cars.map(car => <CarCard key={car.id} car={car} onCarDelete={onDeleteHandler} />)}
                                    </div>
                }
                
            </div>
            
    )


}
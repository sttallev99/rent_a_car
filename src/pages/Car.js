import React, { useState } from 'react'
import Layout from '../components/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux'
import { rentCar } from '../redux/actions/rent.js';



const Car = () => {

  const dispatch = useDispatch();

  const { RangePicker } = DatePicker;

  const navigate = useNavigate();

  const [car, setCar] = useState([]);
  const [from, setFrom] = useState([]);
  const [to, setTo] = useState([]);
  const [totalDays, setTotalDays] = useState(0);
  const [driver, setDriver] = useState(false);
  const [total, setTotal] = useState(0);

  const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

  const params = useParams();
  const {carId} = params;

  useEffect(() => {
    if(!localStorage.getItem('user')) {
      navigate('/login');
    }

    const fetchData = async () => {

      try {
        const result = await axios.get(`/api/cars/car/${carId}`);
        setCar(result.data);

      } catch(error) {
        console.log('Error!');
      }

    }
    fetchData();

    setTotal((totalDays * car.payPerDay));
    if(driver) {
      setTotal(total + 40 *totalDays);
    }
  },[carId, navigate, driver, car.payPerDay, totalDays]);

  const selectTime = (values) => {
    setFrom(moment(values[0]).format('MMM:DD:yy HH:MM'));
    setTo(moment(values[1]).format('MMM:DD:yy HH:MM'));

    setTotalDays(values[1].diff(values[0], 'Days'));
  }

  const rentNow = () => {
    const reqObj = {
      user: userInfo._id,
      car: car._id,
      totalDays,
      total,
      driverRequired: driver,
      bookingTimeSlot: {
        from,
        to
      }
    }

    dispatch(rentCar(reqObj));
    navigate('/')
  }

  return (
    <Layout>
      <div className='car-container'>
        <h3 className='rent-car-title'>Rent a Car</h3>
        <div className='car-row'>
          <div className='car-col'>
            <div className='car-groups'>
              <div className='car-group'>
                <h2 className='car-subtitle'>****Car Info****</h2>
                <div className='car-info'>
                  <span>{car.name}</span>
                  <span>${(car.payPerDay)?.toFixed(2)} per day</span>
                  <span>Fuel Type: {car.fuelType}</span>
                  <span>Max persons: {car.capacity}</span>
                </div>
              </div>
              <div className='car-group'>
                <h2 className='car-subtitle'>****Rent A Car****</h2>
                <div className='car-info'>
                <RangePicker format="YYYY/MM/DD" onChange={selectTime}/>
                <span>Total Days: {totalDays}</span>
                <span>Pey per Day: ${(car.payPerDay)?.toFixed(2)} </span>
                  <p className='driver'>
                    <input type='checkbox' onChange={(e) => {
                      if(e.target.checked) {
                        setDriver(true);
                      } else {
                        setDriver(false);
                      }
                    }} id='driver'/> 
                    <label htmlFor='driver'>Driver Required</label>
                  </p>
                  <div className='total'>
                    <h1 className='totalTitle'>Total Amount: ${(total).toFixed(2)}</h1>
                  </div>
                  <button className='rent-now' onClick={rentNow}>Rent Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className='car-col'>
            <div className='car-image'>
              <img src={car.image} className='car-img' alt={car.name} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Car

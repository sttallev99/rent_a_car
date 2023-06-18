import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout'
import Loading from '../components/Loading';
import { getAllCars } from '../redux/actions/actions';
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const Home = () => {

  const navigate = useNavigate();

  const {cars} = useSelector(state => state.reducer);
  const {loading} = useSelector(state => state.loading);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);

  useEffect(() => {
    if(!localStorage.getItem('user')) {
      navigate('/login');
    }
  });


  

  return (
    <Layout>
      <div className='slider'>
        <div className='left'>
          <h1 className='title'>Stalev Rent a Car</h1>
        </div>
        <div className='right'>
          <img src='/images/slider/logo2.png' alt='' />
        </div>
      </div>
      <div className='content'>
        <div className='content-row'>
          <h1 className='big-title'>Top Cars for Rent</h1>
        </div>
        <div className='content-flex'>
          <div className='content-row flex-2'>
            {loading ? (<Loading />) : (
              <div className='content-groups'>
                {cars.map((car) => (
                <div className='card' key={car._id}>
                  <div className='card-body'>
                    <img src={car.image} className='image-cars' alt={car.name} />
                  </div>
                  <div className='card-footer'>
                    <div className='card-footer-top'>
                      <h3 className='car-title'>{car.name}</h3>
                      <p className='per-dey'>Pey per Day: <span className='bold-price'>${(car.payPerDay).toFixed(2)}</span></p>
                    </div>
                    <div className='card-footer-top'>
                      <button className='rent-now'><Link to={`/car/${car._id}`} className='rent-link'>Rent Now</Link></button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home

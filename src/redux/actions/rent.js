import axios from "axios";
import { toast } from "react-toastify";

export const rentCar = (reqObj) => async dispatch => {
    console.log(reqObj)
    dispatch({type: 'LOADING', payload: true});

    try{
        await axios.post('/api/rent/rentcar', reqObj);
        toast.success('Successfully reserved a car!');
        dispatch({type: 'LOADING', payload: false});
    } catch(error) {
        console.log(error);
        dispatch({type: 'LOADING', payload: false});
        toast.error('Error, Please try again!')
    }
}
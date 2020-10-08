import axios from "axios";
import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from "../constants/orderConstants";

export const createOrder = order => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        });

        const { 
            userLogin: { userInfo } 
        } = getState();

        // Setting headers for the Axios request
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        };
        // POST request to login API endpoint
        const { data } = await axios.post(
            "/api/orders",
            order, 
            config
        );

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });
    }
}
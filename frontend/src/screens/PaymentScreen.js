import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    // If no shipping address in state, redirect them to /shipping
    if (!shippingAddress) {
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    
    const dispatch = useDispatch();

    // Prevent default form submit, save their address, then proceed to /payment
    const submitHandler = e => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        history.push("/placeorder");
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        {/* TO DO: Add another Form.Check for Stripe */}
                        <Form.Check 
                            type="radio" 
                            label="PayPal or Credit Card" 
                            id="PayPal" 
                            name="paymentMethod" 
                            value="PayPal" 
                            checked onChange={e => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary" className="rounded">
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen;

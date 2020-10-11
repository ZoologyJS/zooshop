import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Card, Button, Image, ListGroup, Row, Col, Form} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { listProductDetails } from "../actions/productActions";

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, products } = productDetails;

    useEffect(()=> {
        dispatch(listProductDetails(match.params.id))
        // if (products.image) console.log("tst",[...Array(products.image)][0])
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    // const returnCaro = () => {

        // return products.image.map((img,i) => (
        //     <Carousel.Item>
        //         <Image
        //             className="d-block w-100"
        //             src={img}
        //             alt={`Picture ${i}`}
        //         />
        //     </Carousel.Item>
        // ))
    // }
    

    return (
        <>
            <Link className="btn btn-dark my-3 rounded" to="/">
               Back
            </Link>
            {loading 
                ? <Loader /> 
                : error 
                    ? <Message variant="danger">{error}</Message>
                    : 
                    <>
                        <Meta title={products.name} />
                        <Row>
                            <Col md={5}>
                            <Carousel interval={null}>
                                {/* WHY DOES THIS WORK??? */}
                                { products.image && [...Array(products.image).values()].map((img,i) => 
                                    img.map(x => 
                                    <Carousel.Item>
                                        <Image
                                            className="d-block w-100"
                                            src={x}
                                            alt={`Picture ${i}`}
                                            key={i}
                                        />
                                    </Carousel.Item>
                                        )
           
                                )}
                            </Carousel>
                   
                            </Col>
                            <Col md={4}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h3>{products.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={products.rating} text={`${products.numReviews} reviews`}></Rating>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price: ${products.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {products.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col> 
                            <Col>
                                <Card>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Price:
                                                </Col>
                                                <Col>
                                                    ${products.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Status:
                                                </Col>
                                                <Col>
                                                    {products.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {products.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty:</Col>
                                                    <Col>
                                                        <Form.Control 
                                                            as="select" 
                                                            alue={qty} 
                                                            onChange={e => setQty(e.target.value)}>
                                                                {[...Array(products.countInStock).keys()].map(x => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item> 
                                        )}
                                        <ListGroup.Item>
                                            <Button 
                                                onClick={addToCartHandler}
                                                className="btn-block rounded" 
                                                type="button" 
                                                disabled={products.countInStock === 0 ? true : false}>
                                                Add to Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                    </>
            }
        </>
    )
}

export default ProductScreen

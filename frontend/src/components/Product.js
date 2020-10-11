import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ products }) => {
    return (
        <Card className="my-3 p-3 rounded shadow mb-5 bg-white">
            <Link to={`/products/${products._id}`}>
                <Card.Img src={products.image[0]} className="border border-secondary rounded" variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/products/${products._id}`}>
                    <Card.Title as="div">
                        <b>{products.name}</b>
                        {' '}{products.price > 100 && <Badge variant="success" className="rounded">New</Badge>}
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating value={products.rating} text={`${products.numReviews} reviews`}>

                    </Rating>
                </Card.Text>
                <Card.Text className="mt-2" as="h3">
                    ${products.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product

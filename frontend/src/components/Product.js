import React from "react";
import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
    return (
        <Card className="my-3 p-3 rounded shadow mb-5 bg-white">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} className="border border-secondary rounded" variant="top" />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <b>{product.name}</b>
                        {' '}{product.price > 100 && <Badge variant="success" className="rounded">New</Badge>}
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}>

                    </Rating>
                </Card.Text>
                <Card.Text className="mt-2" as="h3">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product

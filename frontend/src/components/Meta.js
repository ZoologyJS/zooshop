import React from 'react'
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}></meta>
            <meta name="keyword" content={keywords}></meta>
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "Welcome to ZooShop",
    description: "The best kind of shop",
    keywords: "electronics, buy things, shop, zoology, zoo, fradella"
}

export default Meta

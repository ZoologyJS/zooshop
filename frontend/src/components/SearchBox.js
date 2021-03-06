import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const submitHandler = e => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push("/");
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control 
                type="text"
                name="q"
                onChange={e => setKeyword(e.target.value)}
                placeholder="Search products..."
                className="mr-sm-2 ml-sm-5 rounded"
                style={{ width:"600px" }}>
            </Form.Control>
            <Button 
                type="submit"
                variant="outline-success"
                className="pt-2 pb-2 pl-3 pr-3  rounded">
                {<i style={{fontSize:"14px"}} className="fa fa-search"/>}
            </Button>
        </Form>
    )
}

export default SearchBox

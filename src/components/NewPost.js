import React, {Component} from 'react';
import {Form} from 'react-bootstrap'
import Button from "react-bootstrap/Button";

class NewPost extends Component {
    render() {
        return (
            <div>
                <h1>Create a New Post</h1>
                <div className="container-new" style={{padding: "10px"}}>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label></Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>

                        <button className="button-post"> Submit Post </button>
                    </Form>
                </div>

            </div>
        );
    }
}

export default NewPost;
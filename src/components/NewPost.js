import React, {Component} from 'react';
import {Form} from 'react-bootstrap'
import {connect} from "react-redux";
import {handleAddPost} from "../actions/post";
import {Redirect} from "react-router-dom";

class NewPost extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            toHome: false,
            newPost: {
                title: '',
                category: '',
                body: '',
                author: 'Alan',
            }
        }
    }

    handleInputChange(e) {
        let newPost = Object.assign({}, this.state.newPost);
        console.log(e.target.value);
        newPost[e.target.name] = e.target.value;
        this.setState({newPost})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {newPost} = this.state;
        console.log('new post is: ', newPost);
        this.props.handleAddPost(newPost)
        this.setState({toHome: true})
    };

    render() {
        const {newPost, toHome} = this.state;
        if(toHome === true) {
            return <Redirect to='/'/>
        }
        return (
            <div>
                <h1>Create a New Post</h1>
                <div className="container-new" style={{padding: "10px"}}>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="postTitle">
                            <Form.Label>Post Title</Form.Label>
                            <Form.Control
                                name="title"
                                placeholder="Enter Title Here."
                                defaultValue={newPost.title}
                                onChange={this.handleInputChange}/>
                        </Form.Group>
                        <Form.Group controlId="postCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select"
                                          defaultValue={newPost.category}
                                          onChange={this.handleInputChange}
                                          name="category">
                                <option> Select</option>
                                {
                                    this.props.categories.map((category) => (
                                        <option key={category.path} value={category.path}>
                                            {category.name}
                                        </option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="postText">
                            <Form.Label></Form.Label>
                            <Form.Control
                                as="textarea"
                                rows="3"
                                defaultValue={newPost.body}
                                onChange={this.handleInputChange}
                                name="body"/>
                        </Form.Group>

                        <button className="button-post"> Submit Post</button>
                    </Form>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
};

export default connect(mapStateToProps, {handleAddPost})(NewPost)
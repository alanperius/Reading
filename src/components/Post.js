import React, {Component} from 'react';
import {Card, Col, Container, Row, Modal, Button, Form} from "react-bootstrap";
import {formatDate} from "../utils/helpers";
import {FaCommentAlt, FaPencilAlt, FaThumbsDown, FaThumbsUp, FaTrashAlt} from 'react-icons/fa';
import {handleDislikePost, handleLikePost, handleDeletePost, handleEditPost} from "../actions/post";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import EditModalPost from './EditModalPost'

class Post extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);


        this.state = {
            show: false,
            id: '',
            title: '',
            body: ''
        }
    }

    handleInputChange(e) {
        console.log(e.target.value);
        this.props.post.title = "dasdasadsdas"
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow(id, body, title) {
        this.setState({
            show: true,
            id: id,
            body: body,
            title: title

        })
    }

    render() {
        const {id, timestamp, title, body, author, category, voteScore, deleted, commentCount} = this.props.post;


        return (
            <div key={id}>
                <div className="container-post margin-post" key={id}>
                    <Card style={{width: '100%'}}>
                        <Card.Body>
                            <Card.Title>
                                {title}
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{author} {formatDate(timestamp)}</Card.Subtitle>
                            <Card.Text>
                                {body}
                            </Card.Text>
                            <Container>
                                <div className="post-action-margin">
                                    <Row>
                                        <Col xs={3}>
                                            <div className="post-action post-action-button"
                                                 onClick={() => this.props.handleLikePost(id)}>
                                                <Card.Link href="#">
                                                    <div className="post-vote-icon">
                                                        <span className="margin-vote">Like</span>
                                                        <FaThumbsUp/>
                                                    </div>
                                                </Card.Link>
                                            </div>
                                        </Col>

                                        <Col xs={1}>
                                            <div className="post-action post-action-button">
                                                <Card.Link href="#">
                                                    <div className="post-vote-icon">
                                                        <span className="margin-vote">{voteScore}</span>
                                                    </div>
                                                </Card.Link>
                                            </div>
                                        </Col>

                                        <Col xs={3}>
                                            <div className="post-action post-action-button"
                                                 onClick={() => this.props.handleDislikePost(id)}>
                                                <Card.Link href="#">
                                                    <div className="post-vote-icon">
                                                        <span className="margin-vote">Dislike</span>
                                                        <FaThumbsDown/>
                                                    </div>
                                                </Card.Link>
                                            </div>
                                        </Col>

                                        <Col xs={2}>
                                            <NavLink to={'/post/' + id} exact activeClassName='active'>
                                                <div className="post-action post-action-button">

                                                    <span className="margin-vote">{commentCount}</span>
                                                    <Card.Link href="#">
                                                        <div className="post-vote-icon">
                                                            <FaCommentAlt/>
                                                        </div>
                                                    </Card.Link>

                                                </div>
                                            </NavLink>
                                        </Col>

                                        <Col sm={2}>
                                            <Card.Link href="#">
                                            <div className="post-action-button2" onClick={() => this.props.handleDeletePost(id)}><FaTrashAlt/></div>
                                            <span className="margin-vote"></span>
                                            <div className="post-action-button2" onClick={() => this.handleShow(id,body,title)}><FaPencilAlt/></div>
                                            </Card.Link>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>

                        </Card.Body>
                    </Card>
                </div>

                <EditModalPost
                    show={this.state.show}
                    body={this.state.body}
                    id={this.state.id}
                    title={this.state.title}
                    onClose={this.handleClose}
                    onHandleSubmit={this.props.handleEditPost}
                />
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
};

export default connect(mapStateToProps, {handleLikePost, handleDislikePost, handleDeletePost, handleEditPost})(Post)
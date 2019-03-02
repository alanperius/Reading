import React, {Component} from 'react';
import Post from './Post'
import {connect} from "react-redux";
import {getQtyComments, handlePostById} from "../actions/post";
import {
    handleAddComment,
    handleDeleteComment,
    handleDislikeComment,
    handleEditComment,
    handleLikeComment,
    handlePostCommentsById
} from "../actions/comments";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {FaPencilAlt, FaThumbsDown, FaThumbsUp, FaTrashAlt} from 'react-icons/fa';
import {IoMdSend} from "react-icons/io";
import EditModalComment from './EditModalComment'


class PostPage extends Component {

    initialState = {
        show: false,
        id: '',
        body: '',
        newComment: {
            body: '',
            author: '',
            parentId: this.props.match.params.id
        }
    };

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = this.initialState;
    }

    resetState() {
        this.setState(this.initialState);
    }

    componentDidMount() {
        this.props.handlePostById(this.props.match.params.id);
        this.props.handlePostCommentsById(this.props.match.params.id)
    }

    handleInputChange(e) {
        let newComment = Object.assign({}, this.state.newComment);
        newComment[e.target.name] = e.target.value;
        this.setState({newComment})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {newComment} = this.state;
        this.props.handleAddComment(newComment);
        this.props.getQtyComments(newComment)
        this.resetState()
    };

    handleClose() {
        this.setState({show: false});
    }

    handleShow(id, body) {
        this.setState({
            show: true,
            id: id,
            body: body,
        })
    }

    render() {
        const {posts, comments} = this.props;
        return (
            <div>

                {posts.length > 0 ? (
                <div className="container-comment ">
                    <div>
                        <Form onSubmit={this.handleSubmit}>

                            {posts.map((post) => (
                                <Post post={post}/>
                            ))}
                            <div className="post-comment-box card comment-margin-content">
                                <Container>
                                    <Row>
                                        <Col sm={2}>

                                            <input className="input-comment"
                                                   name="author"
                                                   required={true}
                                                   value={this.state.newComment.author}
                                                   placeholder="Author name"
                                                   onChange={this.handleInputChange}>
                                            </input>
                                        </Col>

                                        <Col xs={8}>

                                            <input className="input-comment"
                                                   name="body"
                                                   required={true}
                                                   value={this.state.newComment.body}
                                                   placeholder="Write a comment..."
                                                   onChange={this.handleInputChange}>
                                            </input>
                                        </Col>
                                        <Col sm={2}>
                                            <div className="comment-action-button">
                                                <button>
                                                    <IoMdSend></IoMdSend>
                                                </button>
                                            </div>

                                        </Col>
                                    </Row>
                                </Container>

                                {comments.map((comment => (

                                    <Container>
                                        <div className="comment  ">
                                            <Row>
                                                <Col sm={2}>
                                                    <span>{comment.author}</span>
                                                </Col>

                                                <Col sm={8}>
                                                    <span>{comment.body}</span>
                                                </Col>

                                                <Col sm={2}>
                                                    <div className="comment-action-button"
                                                         onClick={() => this.props.handleDeleteComment(comment.id)}>
                                                        <FaTrashAlt/></div>
                                                    <span className="margin-vote"></span>
                                                    <div className="comment-action-button"
                                                         onClick={() => this.handleShow(comment.id, comment.body)}>
                                                        <FaPencilAlt/></div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Row className="text-left">
                                            <Col className="comment-action">
                                                <Card.Link href="#">
                                                    <div className="post-vote-icon"
                                                         onClick={() => this.props.handleLikeComment(comment.id)}>
                                                        <span>Like</span>
                                                    </div>
                                                    <span> - </span>
                                                    <div className="post-vote-icon"
                                                         onClick={() => this.props.handleDislikeComment(comment.id)}>
                                                        <span>Dislike</span>
                                                    </div>
                                                </Card.Link>
                                                <Card.Link href="#">
                                            <span className="margin-vote comment-like">
                                                {comment.voteScore >= 0 ? <FaThumbsUp/> : <FaThumbsDown/>}
                                                <span className="margin-vote"/>
                                                {comment.voteScore}
                                            </span>
                                                </Card.Link>
                                            </Col>
                                        </Row>
                                    </Container>


                                )))}

                            </div>

                        </Form>
                    </div>

                    <EditModalComment
                        id={this.state.id}
                        body={this.state.body}
                        show={this.state.show}
                        editComment={this.props.handleEditComment}
                        onClose={this.handleClose}
                    />

                </div>
                ) : (
                    <div>
                        <h1>
                            Post Not Found.
                        </h1>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        comments: state.comments
    }
};

export default connect(mapStateToProps,
    {
        handlePostById,
        handlePostCommentsById,
        handleAddComment,
        handleLikeComment,
        handleDislikeComment,
        handleDeleteComment,
        handleEditComment,
        getQtyComments
    })(PostPage)
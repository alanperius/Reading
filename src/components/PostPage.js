import React, {Component} from 'react';
import Post from './Post'
import {connect} from "react-redux";
import {handlePostById} from "../actions/post";
import {handlePostCommentsById, handleAddComment, handleLikeComment, handleDislikeComment, handleDeleteComment} from "../actions/comments";
import {Card, Col, Container, Form, Row} from "react-bootstrap";
import {FaThumbsDown, FaThumbsUp, FaTrashAlt, FaTrash, FaPencilAlt} from 'react-icons/fa';
import Alert from "react-bootstrap/Alert";



class PostPage extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = this.initialState;
    }

    initialState = {
        newComment: {
            body: '',
            author: 'Alan',
            parentId: this.props.match.params.id
        }
    };
    resetState() {
        this.setState(this.initialState);
    }

    componentDidMount() {
        this.props.handlePostById(this.props.match.params.id);
        this.props.handlePostCommentsById(this.props.match.params.id)
    }

    handleInputChange(e) {
        let newComment = Object.assign({}, this.state.newComment);
        console.log(e.target.value);
        newComment[e.target.name] = e.target.value;
        this.setState({newComment})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {newComment} = this.state;
        this.props.handleAddComment(newComment)
        this.resetState()
    };

    render() {
        const {posts, comments} = this.props;

        return (
            <div className="container-comment ">
                <div>
                    <Form onSubmit={this.handleSubmit}>

                        {posts.map((post) => (
                            <Post post={post}/>
                        ))}
                        <div className="post-comment-box card comment-margin-content">
                            <Container>
                                <Row>
                                    <Col>

                                        <input className="input-comment"
                                               name="body"
                                               required={true}
                                               value={this.state.newComment.body}
                                               placeholder="Write a comment..."
                                               onChange={this.handleInputChange}>
                                        </input>
                                    </Col>
                                </Row>

                            </Container>

                            {comments.map((comment => (

                                <Container>
                                    <div className="comment ">
                                        <Row>
                                            <Col sm={2}>
                                                <span>{comment.author}</span>
                                            </Col>

                                            <Col sm={8}>
                                                <span>{comment.body}</span>
                                            </Col>

                                            <Col sm={2}>
                                               <div className="comment-action-button" onClick={() => this.props.handleDeleteComment(comment.id)}><FaTrashAlt/></div>
                                                <span className="margin-vote"></span>
                                                <div className="comment-action-button"><FaPencilAlt/></div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Row className="text-left">
                                        <Col className="comment-action">
                                            <Card.Link href="#">
                                                <div className="post-vote-icon" onClick={() => this.props.handleLikeComment(comment.id)}>
                                                    <span>Like</span>
                                                </div>
                                                <span> - </span>
                                                <div className="post-vote-icon" onClick={() => this.props.handleDislikeComment(comment.id)}>
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
        handleDeleteComment
    })(PostPage)
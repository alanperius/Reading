import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {formatDate} from "../utils/helpers";
import {FaThumbsDown, FaThumbsUp} from 'react-icons/fa';
import {handleLikePost} from "../actions/post";
import {connect} from "react-redux";


class Post extends Component {



    render() {
        const {id, timestamp, title, body, author, category, voteScore, deleted} = this.props.post;
       /* TODO: talvez modificar server para aceitar 2 likes
        const likes = voteScore > 0 ? voteScore : 0
        const dislikes = voteScore < 0 ? voteScore : 0*/

        return (
            <div key={id}>
                <div className="container-post" key={id}>
                    <Card style={{width: '100%'}}>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{author} {formatDate(timestamp)}</Card.Subtitle>
                            <Card.Text>
                                {body}
                            </Card.Text>
                            <Card.Link href="#">
                                <div className="post-vote-icon" onClick={() => this.props.handleLikePost(id)}>
                                    <FaThumbsUp />
                                </div>
                            </Card.Link>
                            <span className="margin-vote">{voteScore}</span>
                            <Card.Link href="#">
                                <div className="post-vote-icon" onClick={() => this.props.handleLikePost(id)}>
                                    <FaThumbsDown />
                                </div>
                            </Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            </div>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
};

export default connect(mapStateToProps, {handleLikePost})(Post)
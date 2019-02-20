import React, {Component} from 'react';
import {handleAllPosts, handlePostsForCategories} from "../actions/shared";
import {connect} from "react-redux";
import ListPosts from "./ListPosts";

class Dashboard extends Component {
    componentDidMount() {
        this.props.handleAllPosts();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.category !== this.props.match.params.category) {
            this.loadPostsByCategory()
        }
    }

    loadPostsByCategory = () => {
        const {match, dispatch} = this.props;
        this.props.handlePostsForCategories(match.params.category)
    };


    render() {
        const {posts} = this.props;
        return (
            <div className="container">
                <ListPosts posts={posts}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
};

export default connect(mapStateToProps, {handleAllPosts, handlePostsForCategories})(Dashboard)
import React, {Component} from 'react';
import { handlePostsForCategories} from "../actions/shared";
import {handleAllPosts} from "../actions/post";
import {connect} from "react-redux";
import ListPosts from "./ListPosts";
import {LoadingBar} from "react-redux-loading";

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
        const {match} = this.props;
        this.props.handlePostsForCategories(match.params.category)
    };


    render() {
        const {posts} = this.props;
        return (
            <div>
                <LoadingBar/>
                <div className="container">
                    {this.props.loading === true ? null :
                        <ListPosts posts={posts}/>
                    }
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        loading: false

    }
};

export default connect(mapStateToProps, {handleAllPosts, handlePostsForCategories})(Dashboard)
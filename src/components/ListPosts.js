import React, {Component} from 'react';
import Post from './Post'
import _ from 'underscore';
import {connect} from "react-redux";

class ListPosts extends Component {
    state = {
        sortBy: '',
        listPost: this.props.posts
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };


    renderPosts = () => {
        let posts = this.props.posts;
        posts = _.sortBy(posts, this.state.sortBy).reverse();

        if (posts.length > 0) {
            return (
                <div>
                    {this.props.loading === 0 && (
                        <div>
                            <div className="container-post card">
                                <p>Sort by:</p>
                                <select name="sortBy" value={this.state.sortBy} onChange={this.handleInputChange}
                                        className="combo-box">
                                    <option value="" disabled>Option</option>
                                    <option value="voteScore">Vote</option>
                                    <option value="timestamp">Date</option>
                                </select>
                            </div>

                            {posts.map((post) => (
                                <div key={post.id}>
                                    <Post post={post}/>
                                </div>
                            ))}
                        </div>


                    )}
                </div>
            );
        }


    }




    render() {


        return (
            <div>
                {this.renderPosts()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loadingBar.default,
    }
};


export default connect(mapStateToProps)(ListPosts)
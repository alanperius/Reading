import React, {Component} from 'react';
import Post from './Post'
import _ from 'underscore';

class ListPosts extends Component {
    state = {
        sortBy: '',
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        let posts = this.props.posts;
        posts = _.sortBy(posts, this.state.sortBy).reverse();
        return (
            <div>
                <div className="container-post card" >
                    <p>Sort by:</p>
                    <select name="sortBy" value={this.state.sortBy} onChange={this.handleInputChange} className="combo-box">
                        <option value="" disabled>Option</option>
                        <option value="voteScore">Vote</option>
                        <option value="timestamp">Date</option>
                    </select>
                </div>

                {posts.map((post) => (
                    <div key={post.postId}>
                        <Post post={post}/>
                    </div>

                ))}


            </div>
        );
    }
}

export default ListPosts;
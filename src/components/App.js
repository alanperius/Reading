import React, {Component} from 'react';
import '../App.css';
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Categories from "./Categories";
import {connect} from "react-redux";


class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <div>
                    <Navbar/>
                    <Categories/>
                        <Route path='/' exact component={Dashboard}/>
                        <Route path='/post/:id' exact component={PostPage}/>
                        <Route path='/new' exact component={NewPost}/>
                        <Route path='/:category' exact component={Dashboard}/>
                    </div>


                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.categories === null
    }
};

export default connect(mapStateToProps)(App);

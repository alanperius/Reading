import React, {Component} from 'react';
import '../App.css';
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Categories from "./Categories";


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
                            <Switch>
                                <Route path='/new' exact component={NewPost}/>
                                <Route path='/:category' exact component={Dashboard}/>
                            </Switch>
                        </div>
                </div>
            </Router>
        );
    }
}
export default App;

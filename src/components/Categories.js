import React, {Component} from 'react';
import {connect} from "react-redux";
import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {handleAllCategories, handlePostsForCategories} from "../actions/shared";

class Categories extends Component {
    componentDidMount =  () => {
        this.props.handleAllCategories();
    }

    render() {

        return (
            <div>
                <div className="container jumbotron">
                    <Nav className="justify-content-center" activeKey="/home">
                        {this.props.categories !== null && (
                            this.props.categories.map((categorie) => (
                                <Nav.Item>
                                    <div className="nav-padding nav-menu">
                                            <NavLink to={'/'+categorie.path} exact activeClassName='active' >
                                                {categorie.name}
                                            </NavLink>
                                    </div>
                                </Nav.Item>
                            ))
                        )}
                    </Nav>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, {handleAllCategories})(Categories);

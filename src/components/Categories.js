import React, {Component} from 'react';
import {connect} from "react-redux";
import {Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {handleAllCategories} from "../actions/shared";

class Categories extends Component {
    componentDidMount = () => {
        this.props.handleAllCategories();
    };

    render() {

        return (
            <div>
                <div className="container jumbotron">
                    <Nav className="justify-content-center" activeKey="/home">
                        {this.props.loading === 0 && (
                            this.props.categories.map((categorie) => (
                                <Nav.Item key={categorie.path}>
                                    <div className="nav-padding nav-menu" key={categorie.path}>

                                            <NavLink to={'/' + categorie.path} exact activeClassName='active' key={categorie.path}>
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
    console.log("state.loadingBar.defaultstate.loadingBar.default = " + state.loadingBar.default);
    return {
        categories: state.categories,
        loading: state.loadingBar.default,
    }
};

export default connect(mapStateToProps, {handleAllCategories})(Categories);

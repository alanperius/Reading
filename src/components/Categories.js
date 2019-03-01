import React, {Component} from 'react';
import {connect} from "react-redux";
import {Nav} from "react-bootstrap";
import {NavLink, Link} from "react-router-dom";
import {handleAllCategories} from "../actions/categories";

class Categories extends Component {

    componentDidMount = () => {
        this.props.handleAllCategories();
    };

    render() {

        return (
            <div>
                <div className="container jumbotron">
                    <Nav className="justify-content-center">
                        {this.props.loading === 0 && (
                            this.props.categories.map((categorie) => (
                                <Nav.Item key={categorie.path}>
                                    <div className="nav-padding nav-menu" key={categorie.path}>

                                            <Link to={'/' + categorie.path} exact activeClassName='active' key={categorie.path} >
                                                {categorie.name}
                                            </Link>


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
        categories: state.categories,
        loading: state.loadingBar.default,
    }
};

export default connect(mapStateToProps, {handleAllCategories})(Categories);

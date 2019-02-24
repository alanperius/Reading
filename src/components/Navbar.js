import React from 'react'
import {NavLink} from "react-router-dom";
import {IoMdAddCircleOutline} from "react-icons/io";
import { IconContext } from "react-icons";
import { Container, Row, Col } from 'react-bootstrap';



export default function Navbar() {
    return (
        <div>
            <div className='banner fixed-top'>
                <Container >
                    <Row>
                        <Col></Col>
                        <Col xs={6}>
                            <NavLink to='/' className=""> <span className="title" >Projeto Leitura </span></NavLink>
                        </Col >
                        <Col>
                            <NavLink to='/new' exact activeClassName='active'>
                                <IconContext.Provider value={{ color: "white", className: "global-class-name", size:"3em"}}>
                                    <IoMdAddCircleOutline/>
                                </IconContext.Provider>
                            </NavLink>

                        </Col>
                    </Row>

                </Container>
            </div>
        </div>

    )
}
import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import {Redirect,Link } from 'react-router-dom'

class AdminRegister extends React.Component{
    constructor(){
        super()
        this.state={
            username:'',
            email:'',
            password:'',
            redirect:false
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.username==="" || this.state.email==="" || this.state.password===""){
            alert('All fields are required')
        }
        if(this.state.password.length < 6){
            alert("password must be more than or equal to 6 characters")
        }
        else{
            const formData={ 
                username:this.state.username,
                email:this.state.email,
                password:this.state.password
            }
            console.log(formData)
            axios.post('http://localhost:5000/admin/register',formData)
            .then((response)=>{
                if(response.data.error){
                    alert(response.data.error)
                }else{
                    this.setState({
                        username:'',
                        email:'',
                        password:'',
                        redirect:true
                    })
                }
            })
            .catch((error)=>{
                console.log('reject',error)
            })
            
        }
 
        
     
    }
    render(){
        if(this.state.redirect){
            return <Redirect to="/admin/login"/>
        }
        return(
            <Container>
                <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={6} className="col-register">
                
                        <h1>Admin Registration</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>User Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter name" 
                                    name="username"
                                    vlaue={this.state.username}
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control 
                                type="email" 
                                name="email"
                                vlaue={this.state.email}
                                onChange={this.handleChange}
                                placeholder="Enter email" />
                        </Form.Group>
                            <br/>
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                name="password"
                                vlaue={this.state.password}
                                onChange={this.handleChange}
                                placeholder="Enter password" />
                        </Form.Group>
                            <br/>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                            <br />
                            <Link to={"/admin/login"}>Already Registered</Link>
                        </form>
                    </Col>
                    <Col xs={12} md={3}></Col>
                </Row>
                
            </Container>
        )
    }
}
export default AdminRegister
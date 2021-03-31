import React from 'react'
import axios from 'axios'
import {Redirect } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from "react-bootstrap"

class AdminLogin extends React.Component{
    constructor(){
        super()
        this.state={
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
        if(this.state.email==="" || this.state.password===""){
            alert('All fields are required')
        }else{
            const formData={ 
                email:this.state.email,
                password:this.state.password
            }
            axios.post('http://localhost:5000/admin/login',formData)
            .then((response)=>{
                if(response.data.error){
                    alert(response.data.error)
                }else{
                    localStorage.setItem("token", response.data.token)
                    this.setState({
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
            return<Redirect to='/users'/>
        }
        return(
            <Container>
                <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={6} className="col-register">
                        <h1>Admin Login</h1>

                        <form onSubmit={this.handleSubmit}>
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
                        </form>
                     </Col>
                    <Col xs={12} md={3}></Col>
                </Row>
            </Container>
        )
    }
}
export default AdminLogin
import React from 'react'
import axios from 'axios'
import { Container, Row, Col, Form, Button } from "react-bootstrap"

class ApplicationForm extends React.Component{
    constructor(){
        super()
            this.state={
                firstName:'',
                lastName:'',
                mobileNumber:'',
                fullAddress:'',
                adharNumber:''

            }

    }
    handelChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.firstName===""|| this.state.lastName===""||this.state.mobileNumber===""||this.state.fullAddress===""||this.state.adharNumber===""){
            alert('All fields are required')
        }else{
            const formData={
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                mobileNumber:this.state.mobileNumber,
                fullAddress:this.state.fullAddress,
                adharNumber:this.state.adharNumber

        }
    // console.log(formData)
        axios.post('http://localhost:5000/users',formData)
            .then((response)=>{
                    this.setState({
                        firstName:'',
                        lastName:'',
                        mobileNumber:'',
                        fullAddress:'',
                        adharNumber:''

                    })
                    alert('Successfully registered')
                
                
            })
            .catch((error)=>{
                console.log('reject',error)
            })
        

        }
        
     }
    
    render(){
        return(
            <Container>
                <Row>
                    <Col xs={12} md={3}></Col>
                    <Col xs={12} md={6} className="col-register">
                        <h1>Enter your details</h1>
                        <form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter First name" 
                                        name="firstName"
                                        value={this.state.firstName}
                                        onChange={this.handelChange}
                                    />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Last name" 
                                        name="lastName"
                                        value={this.state.lastName}
                                        onChange={this.handelChange}
                                    />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Mobile Number</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Mobile Number"
                                        name="mobileNumber"
                                        value={this.state.mobileNumber}
                                        onChange={this.handelChange}
                                    />
                            </Form.Group>
                            <br/>
                            <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Full Address</Form.Label>
                                    <Form.Control name="fullAddress"
                                        value={this.state.fullAddress}
                                        placeholder="Enter your address"
                                        onChange={this.handelChange}
                                    />
                                        
                            </Form.Group>
                        
                            
                            <br/>
                            <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Adhar Number</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter Adhar Number"
                                        name="adharNumber"
                                        value={this.state.adharNumber}
                                        onChange={this.handelChange}
                                    />
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
export default ApplicationForm
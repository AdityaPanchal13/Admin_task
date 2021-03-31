import React from 'react'
import axios from 'axios'
import {Table, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

class AdminDashboard extends React.Component{
    constructor(){
        super()
        this.state={
            users:[],
            redirect: false
        }
    }
    componentDidMount(){
        if(localStorage.getItem('token') === null){
            this.setState({ redirect: true })
        }else {
            axios.get('http://localhost:5000/users')
            .then((response)=>{
                const users=response.data
                this.setState({users})
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }

    render(){
        const user=this.state.users
        console.log(user)
        if(this.state.redirect){
            return <Redirect to="/admin/register" />
        }
        
        return(
            
            <div>
                <h2>Admin Dashboard</h2>
                <Button onClick={() => {
                    localStorage.removeItem("token")
                    this.setState({redirect: true})
                }}>Logout</Button>
                {
                    user.length === 0 ? <span>There is no data</span> : 
                        <Table striped bordered hover variant="light" responsive>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Mobile Number</th>
                                    <th>Full Address</th>
                                    <th>Adhar Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            {
                                user.map(function(ele){
                                    return(
                                        <tr key={ele.id}>
                                            <td>{ele.firstName}</td>
                                            <td>{ele.lastName}</td>
                                            <td>{ele.mobileNumber}</td>
                                            <td>{ele.fullAddress}</td>
                                            <td>{ele.adharNumber}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                 }
            </div>
        )
    }
}
export default AdminDashboard
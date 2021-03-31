import React from 'react'
import { Redirect } from "react-router-dom"

class Home extends React.Component {
    constructor(){
        super()
        this.state = {
            redirect: false
        }
    }
    componentDidMount(){
        if(!!localStorage.getItem('token')){
            this.setState({ redirect: true })
        }
    }
    render(){
        if(this.state.redirect){
            return <Redirect to="/users" />
        }
        return (
            <div className="home">
                <h2>
                    Welcome to Demo app
                </h2>
            </div>
        )
    }
}

export default Home
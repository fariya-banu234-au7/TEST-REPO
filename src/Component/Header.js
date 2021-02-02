import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import './Header.css';

const url = "http://localhost:5000/api/auth/userinfo";

class Header extends Component {
    constructor(){
        super()
        this.state={
            username:'',
            user:'',
            error:''

        }
    }
    conditional_headerGit = () => {
        if(sessionStorage.getItem('username')===null||sessionStorage.getItem('username')===undefined){
            return(
                <li><a href="https://github.com/login/oauth/authorize?client_id=100cc18d754140bbced1">Sign In With Git</a></li>
            )     
        }else{
            return(
                <li><a href=""><span className="glyphicon glyphicon-user"></span>Welcome {sessionStorage.getItem('username')}</a></li>
            ) 
        }
        
    }
    handleLogout=() => {
        sessionStorage.removeItem('_ltk');
        sessionStorage.removeItem('_rtk');
        sessionStorage.removeItem('name')
        this.props.history.push('/login')
    }

    conditional_headerJWT = () => {
        if(this.state.user.name ==='' || this.state.user.name ===undefined || this.state.user.name === null){
            return(
                <>
                    <li><Link to="/register">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </>
            )     
        }else{
            
            return(
                <>
                    <li className="welcome-messge">Welcome, {sessionStorage.getItem('name')}</li>
                    <li><button className="btn btn-danger"
                    onClick={this.handleLogout}>
                        Logout
                    </button></li>
                    
                </>
            ) 
        }
        
    }

    

    render(){
        return(
            <nav class="navbar navbar-inverse" style={{background:'teal'}}>
                <div class="container-fluid">
                    <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>                        
                    </button>
                    <a class="navbar-brand" href="#">Developer Funnel</a>
                    </div>
                    <div class="collapse navbar-collapse" id="myNavbar">
                    <ul class="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li ><Link to="/viewbooking">Booking</Link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        {this.conditional_headerGit()}
                        {this.conditional_headerJWT()}
                        
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }

    componentDidMount(){
        const code = (this.props.location.search).split('=')[1];
        if(code){
            var requestData={
                code:code
            }
            fetch("http://localhost:3001/user",{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then((data) => {
                console.log(data)

                sessionStorage.setItem('username',data.login)
                this.setState({username:data.login})
            })
        }

        fetch(url,{
            method:'GET',
            headers:{
                'x-access-token':sessionStorage.getItem('_ltk')
            }
        })
        .then((res) => res.json())
        .then((data) => {
            sessionStorage.setItem('name',data.name)
            console.log(sessionStorage.getItem('name'))
            this.setState({ user:data })
        })

        if(this.props){
            this.setState({error:this.props.location.search.split('=')[1]})
        }
    }
    }
    



export default withRouter(Header);
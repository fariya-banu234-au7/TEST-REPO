import React from 'react';
import Search from './Search';
import QuickSearch from './QuickSearch';
import Header from '../Header';
import Footer from '../Footer'

const url = "http://localhost:5000/api/auth/userinfo";

class Home extends React.Component {

    constructor(){
        super()

        this.state={
            user:'',
            error:''
        }
    }

    render(){

        sessionStorage.setItem('_rtk',this.state.user.role)
        return(
            <div>
                <Header/>
                <Search/>
                <QuickSearch/>
                <Footer/>
            </div>
        )
    }

    componentDidMount(){
        fetch(url,{
            method:'GET',
            headers:{
                'x-access-token':sessionStorage.getItem('_ltk')
            }
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                user:data
            })
        })

        if(this.props){
            this.setState({error:this.props.location.search.split('=')[1]})
        }
    }
}

export default Home;
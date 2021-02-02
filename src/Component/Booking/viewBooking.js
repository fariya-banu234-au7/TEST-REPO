import React,{Component} from 'react';
import BookingDisplay from './bookingDisplay';
import axios from 'axios';
import Footer from '../Footer';
import Header from '../Header';

const burl="http://localhost:8900/bookings";

class Booking extends Component{
    constructor(){
        super()

        this.state={
            booking:''
        }
    }

    render(){
        return(
            <div className="container">
                <Header/>
                <BookingDisplay bookdata={this.state.booking}/>
                <Footer/>
            </div>
        )
    }

    async componentDidMount(){
        const response = await axios.get(burl);
        this.setState({booking:response.data})
    }
}

export default Booking;
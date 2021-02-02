import React ,{Component} from 'react';
import axios from 'axios';
import ListingDisplay from './listingDisplay';
import RoomFilter from '../filters/roomfilter'

import Footer from '../Footer';
import Header from '../Header';

const url = "https://developerfunnel.herokuapp.com/hotellist";

class Listing extends Component{
    constructor(){
        super()

        this.state={
            hoteldata:''
        }
    }

    setDataPerFilter(sortedData){
        this.setState({hoteldata:sortedData})
    }
    render(){
        return(
            <React.Fragment>
                <Header/>
            <div className="row">
                <div className="col-md-2">
                    <RoomFilter hotelperRoom={(data) => {this.setDataPerFilter(data)}}/>
                </div>
                <div className="col-md-10">
                   <ListingDisplay hotellist={this.state.hoteldata}/>
                </div>
            </div>
            <Footer/>
            </React.Fragment>
        )
    }

    componentDidMount(){
        var tripid = this.props.match.params.id;
        sessionStorage.setItem('tripid',tripid);
        axios.get(`${url}/${tripid}`)
        .then((response) => this.setState({hoteldata:response.data}))
    }
}

export default Listing
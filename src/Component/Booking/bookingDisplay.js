import React from 'react';
const burl="http://localhost:8900/bookings";
const BookingView = (props) => {

    const updateAccept =(e)=>{
        console.log('updateAccept')
        fetch(burl+'/'+e.target.value)
        .then((res) => res.json())
        .then((data) => {
            const resData = data;
            resData.status = 'Confirmed';

            fetch(burl+'/'+e.target.value, {
                method:'PUT',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(resData)
            })
            .then(window.location.reload())
        })
    }    
    const updateReject =(e)=>{
        console.log('updateReject')
        fetch(burl+'/'+e.target.value)
        .then((res) => res.json())
        .then((data) => {
            const resData = data;
            resData.status = 'Rejected';

            fetch(burl+'/'+e.target.value, {
                method:'PUT',
                headers: {
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(resData)
            })
            .then(window.location.reload())
        })
    }
    const renderTable = ({bookdata}) => {
        if(bookdata){
            return bookdata.map((item) => {
                return(
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.hotelname}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.date}</td>
                        <td>{item.status}</td>
                        
                        {sessionStorage.getItem('_rtk')==='Admin'&&     
                        <td>
                            <button className="btn btn-success" value={item.id} 
                            onClick={(event)=>{updateAccept(event)}}>
                                Accept</button>
                                &nbsp;
                            <button className="btn btn-danger" 
                            value={item.id}
                            onClick={(event)=>{updateReject(event)}}>reject</button>
                        </td>
                        }
                    </tr>
                )
            })
        }
    }
    const changeHandler=()=>{
        console.log('hotel list')
    }
    const renderHotel=(data)=>{
        // console.log('test')
        if(data){
            console.log('data')
            return data.map((item) => {
                return (
                    <option key={item.id}>
                        {item.hotelname}
                    </option>
                );
            })
        }
    }
    const changeDate=()=>{
        console.log('based on date')
    }
    console.log(props)
    return(
        
        <div className="container">            
            <div className="row">
                <div className="col-md-6">
                    <h3>Bookings List</h3>
                </div>

                <div className="col-md-6">
                    <div className="BookingsFilter">
                    <select onChange={changeHandler} className="HotelDropDown">
                            <option>----Filter By HotelName----</option>
                            {()=>{renderHotel(props.bookdata)}}
                        </select>
                        &nbsp;
                        or By Date
                        &nbsp;
                        <input onChange={changeDate} className="DateFilter" type="date"></input>
                    </div>  
                </div>
            </div>
            <hr/>
            <center><h3>Bookings</h3></center>
            <table className="table table-responsive">
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Hotel Name</th>
                        <th>User Name</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Status</th>                        
                        {sessionStorage.getItem('_rtk')==='Admin'&&                        
                            <th>Update Status</th>                        
                        }                   
                                              
                    </tr>
                </thead>
                <tbody>
                    {renderTable(props)}
                </tbody>
            </table>
            
            
        </div>
    )
}

export default BookingView;

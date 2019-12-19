import React, {Component} from 'react';

class Profile extends Component{
    constructor(){
        super()
        this.state={
            time:null,
            week:null,
            filters: []
        }
    }
    checkStatus(sid, status){
        console.log(sid);
        if(sid==null){
            alert("Please select student first")
        }
        else if(this.state.week==null){
            alert("Please select week")
        }
        else{
            fetch("http://localhost:9000/student/check/"+sid,{
                method: "POST",
                body: JSON.stringify({
                    status: status,
                    week: this.state.week
                }),
                headers: {"Content-type": "application/json"}
            })
            .then(function(response){
                return response.json()
            })
            .then(function(body){
                console.log(body);
                alert(body.name+" "+body.sirname +" is "+status)
            })
        }
    }
    onChangeWeek(event){
        this.setState({week: event.target.value})
    }
    weekFilter(){
        var weeks =[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
        var filter =[]
        if(this.props.data.val.attdance!=undefined){
            var length = this.props.data.val.attdance.length
            filter = weeks.filter(function(num){
                return num > length
            })
        }
        var options = filter.map(function(num){
        return(<option value={num}>{num}</option>)
        })
        return options
    }
    render(){   
        const date = new Date()
        var options = this.weekFilter()
        console.log(options);
        
        return(
            <div className ="container">
                <div className="row mb-3">
                    <img className="rounded mx-auto d-block" src="https://drive.google.com/uc?id=1ELh12Hrs9T4Qy_oUBVDWqIU6thRTbUgO"  style={{width:"60%"}}></img>
                </div>
                <div className="text-center">
                        <p className="mb-2">Name: {this.props.data.val.name}</p>
                        <p className="mb-2">Student ID: {this.props.data.val.sid}</p>
                        <p className="mb-2">Section: {this.props.data.val.section}</p>
                        <p className="mb-2">Time: {date.getHours()}:{date.getMinutes()}</p>
                        <label className="mr-2 ml-2">Week: </label>
                        <select className="col-4" style={{border: "1px solid #FFFFF", borderRadius:"2px"} } onChange={this.onChangeWeek.bind(this)}>
                            <option value={null}>Select week</option>
                            {
                                options
                            }
                        </select>
                        <div className="mb-5">
                            <button className="btn btn-primary mr-2" onClick={()=>this.checkStatus(this.props.data.val.sid, "Present")}>Present</button>
                            <button className="btn btn-warning mr-2" onClick={()=>this.checkStatus(this.props.data.val.sid, "Late")}>Late</button>
                            <button className="btn btn-danger mr-2" onClick={()=>this.checkStatus(this.props.data.val.sid, "Absent")}>Absent</button> 
                        </div>
                </div>
            </div>
        )
    }
}

export default Profile
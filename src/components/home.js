import React, {Component} from 'react';
import Profile from './profile.js';

class Table extends Component{
    constructor(){
        super()
        this.state = {
            val:{},
            apiResponse:[]
        }
    }
    onClick(val){
        this.setState({
            val: val
        })
    }
    onChangeSection(event){
        if(event.target.value!=""){
        fetch("https://class-attendance-260503.appspot.com/student/section/"+event.target.value)
        .then(res=>res.json())
        .then(data=> this.setState({apiResponse: data}))
        }
        else{
            this.setState({apiResponse: []})
        }
    }

    render(){
        return(
        <div className="text-center">
            <h1 style={{marginTop:"10px", marginBottom:"20px"}}>Class Attendance</h1>
            <div className="container">
                <div className="container">
                    <div className="row ml-2 mb-2">
                        <label className="mr-2">Section: </label>
                        <select style={{border: "1px solid #FFFFF", borderRadius:"2px", width:"7%"} } onChange={this.onChangeSection.bind(this)}>
                            <option value="">section</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    
                    <div className="row">
                    <div className="col-8 table-responsive-lg" style={{borderRadius: "6px"}}>
                    <table className="table table-bordered table-hover col-12 text-left">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">
                                    Order
                                </th>
                                <th scope="col">
                                    Student id
                                </th>
                                <th scope="col">
                                    Name
                                </th>
                                <th scope="col">
                                    Section
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.apiResponse.map((value, index)=>{
                                return(
                                <tr key={index} onClick={() => this.onClick(value)} style={{cursor: "pointer"}}>
                                    <th scope="row">{index+1}</th>
                                    <th scope="row">{value.sid}</th>
                                    <th>{value.name+" "+value.sirname}</th>
                                    <th>{value.section}</th>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    </div>
                    <div className="col-4 sticky-top" style={{boxShadow: "5px 10px 10px #c8cdcf", height:"450px"}}>
                        <Profile
                            data = {this.state}
                        />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Table;
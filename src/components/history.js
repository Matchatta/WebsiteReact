import React, {Component, useState} from 'react';

class History extends Component{
    constructor(){
        super()
        this.state = {
            apiResponse:[],
            personal:{},
            val: [],
            late:0,
            absent:0,
            on_time:0,
            show: false,
            textShow: "Show history"
        }
        this.hideShow = this.hideShow.bind(this)
    }
    hideShow =()=>{
        const {show} = this.state
        this.setState({
            show: !show
        })
        if(!show){
            this.setState({
                textShow: "Hide"
            })
        }
       else{
            this.setState({
                textShow: "Show history"
            })
        }
    }
    componentDidMount(){
        fetch("https://class-attendance-260503.appspot.com/student/all")
        .then(res=> res.json())
        .then(data => this.setState({apiResponse: data}))
        .catch(error=> console.log(error)
        )
    }
    onChangeSection(event){
        if(event.target.value!=""){
            fetch("https://class-attendance-260503.appspot.com/student/section/"+event.target.value)
            .then(res=>res.json())
            .then(data=> this.setState({apiResponse: data}))
        }
        else{
            fetch("https://class-attendance-260503.appspot.com/student/all")
            .then(res=>res.json())
            .then(data=> this.setState({apiResponse: data}))
        }
    }
    onClick(val){
        var late=0, on_time =0, absent=0
        var length = val.attdance.length
        console.log(val);
        for(var i=0; i<length; i++){
            if(val.attdance[i].status=="Absent"){
                absent++
            }
            else if(val.attdance[i].status=="Present"){
                on_time++
            }
            else if(val.attdance[i].status=="Late"){
                late++
            }
        }
        val.attdance.sort((a, b) => (a.week > b.week) ? 1 : -1)
        this.setState({val:val.attdance,
            personal: val,
            late: late, 
            on_time: on_time,
            absent: absent})
    }
    render(){
        
        return(
        <div className="text-center">
            <h1 style={{marginTop:"10px", marginBottom:"20px"}}>Attendance</h1>
            <div className="container">
                <div className="row ml-2 mb-2">
                    <label className="mr-2">Section: </label>
                        <select style={{border: "1px solid #FFFFF", borderRadius:"2px", width:"7%"} } onChange={this.onChangeSection.bind(this)}>
                            <option value="">all</option>
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
                                    <tr key={index} onClick={()=> this.onClick(value)} style={{cursor: "pointer"}}>
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
                    <div className="col-4 sticky-top" style={{boxShadow: "5px 10px 10px #c8cdcf"}}>
                        <div className ="container">
                            <div className="row mb-3">
                                <img className="rounded mx-auto d-block" src="https://drive.google.com/uc?id=1ELh12Hrs9T4Qy_oUBVDWqIU6thRTbUgO"  style={{width:"60%"}}></img>
                            </div>
                            <div className="text-center">
                                    <p className="mb-2">Name: {this.state.personal.name}</p>
                                    <p className="mb-2">Student ID: {this.state.personal.sid}</p>
                                    <p className="mb-2">Section: {this.state.personal.section}</p>
                                    <div className="mb-5">
                                        <p className="mb-2">on-time: {this.state.on_time}/ late: {this.state.late}/ absent: {this.state.absent}</p>
                                        <button className="btn btn-primary mr-2 mb-2" onClick={this.hideShow}>{this.state.textShow}</button>
                                        {this.state.show && 
                                        <div className="container">
                                            <table className="table table-bordered table-hover col-12 text-left">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            Week
                                                        </th>
                                                        <th scope="col">
                                                            Date
                                                        </th>
                                                        
                                                        <th scope="col">
                                                            Status
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.val.map((value, index)=>{
                                                        return(
                                                        <tr key={index}>
                                                            <th scope="row">{value.week}</th>
                                                            <th scope="row">{new Date(value.date).getDate()+"/ "+new Date(value.date).getMonth()+"/ "+new Date(value.date).getFullYear()}</th>
                                                            <th scope="row">{value.status}</th>
                                                        </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default History;
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
    componentDidMount(){
        fetch("http://localhost:9000/student/eligible")
        .then(res=> res.json())
        .then(data => this.setState({apiResponse: data}))
        .catch(error=> console.log(error)
        )
    }

    render(){
        return(
        <div className="text-center">
            <h1 style={{marginTop:"10px", marginBottom:"20px", color:"#a8324a"}}>Ineligible to test</h1>
            <div className="container">
                <div className="container">
                    <div className="row">
                    <div className="col-12 table-responsive-lg" style={{borderRadius: "6px"}}>
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
                                <tr key={index} style={{cursor: "pointer"}}>
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
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default Table;
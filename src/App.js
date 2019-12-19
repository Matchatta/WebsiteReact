import React, {Component} from 'react';
import Home from './components/home.js'
import Navigation from './components/navigation.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import History from './components/history.js'
import EligibleTest from './components/eligible.js'


class App extends Component{
  constructor(props){
    super(props)
    this.state = { apiResponse:[], Name: "Class Attendance"}
  }
  render(){
    
    return(
      <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/history" component={History} exact/>
             <Route path="/ineligible" component={EligibleTest} exact/>
           </Switch>
        </div> 
      </BrowserRouter>

                
    )
  }
}

export default App;

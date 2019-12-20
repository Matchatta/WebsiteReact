import React from 'react';
 
import { NavLink } from 'react-router-dom';
const Navigation = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">
    Parallel class attendance
  </a>
            <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <NavLink to="/"><a class="nav-link">Home</a></NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to="/history"><a class="nav-link">History</a></NavLink>
                    </li>
                    <li class="nav-item">
                         <NavLink to="/ineligible"><a class="nav-link">Ineligible test</a></NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
 
export default Navigation;

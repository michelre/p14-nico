import { BrowserRouter, Routes, Route } from "react-router";
import Home from './pages/Home'
import Employees from './pages/Employees'

import EmployeesContext from "./context";
import { useState } from "react";

const App = () => {
    const defaultEmployees = localStorage.getItem('employees') || '[]'
    const [employees, setEmployees] = useState(JSON.parse(defaultEmployees));

    return <EmployeesContext.Provider value={{employees, setEmployees}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<Employees />} />
            </Routes>
        </BrowserRouter>
    </EmployeesContext.Provider>    
}

export default App;
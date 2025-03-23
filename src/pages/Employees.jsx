import { useContext } from "react";
import EmployeesContext from "../context";
import EmployeeTable from "../components/table/EmployeeTable";
import { Link } from "react-router";

const Employees = () => {
    const {employees} = useContext(EmployeesContext)

    console.log(employees)


    return <div className="container">
        <h1>Current Employees</h1>
        <EmployeeTable 
            employees={employees}
        />        
        <Link to="/" className="text-center">Home</Link>
    </div>
}

export default Employees;
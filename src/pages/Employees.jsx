import { useContext } from "react";
import EmployeesContext from "../context";

const Employees = () => {
    const {employees} = useContext(EmployeesContext)


    return <>
        <h1>Current Employees</h1>
        {JSON.stringify(employees)}
    </>
}

export default Employees;
import { useContext, useState } from "react";
import { Link } from "react-router";

import DatePicker from "react-datepicker";
import { fr } from 'date-fns/locale/fr';
import "react-datepicker/dist/react-datepicker.css";
import Select from "../components/select/Select";

import EmployeesContext from "../context";


const Home = () => {
    const {employees, setEmployees} = useContext(EmployeesContext)
    const [form, setForm] = useState({
        'firstName': '',
        'lastName': '',
        'dateOfBirth': new Date(),
        'startDate': new Date(),
        'street': '',
        'city': '',
        'state': 'AL',
        'zipCode': '',
        'department': 'Sales'
    })

    const updateForm = (field, value) => {
        setForm({...form, [field]: value})    
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setEmployees(employees.concat(form))
    }


    return <div className='form'>
        <h1>HRNet</h1>
        <Link to='/employees'>View Current Employees</Link>
        <h2>Create Employee</h2>

        <form>
            <div>
                <label htmlFor="first-name">First Name</label>
                <input type="text" id="first-name" onChange={(e) => updateForm('firstName', e.target.value)}/>                     
            </div>

            <div>
                <label htmlFor="last-name">Last Name</label>
                <input type="text" id="last-name" onChange={(e) => updateForm('lastName', e.target.value)}/>                     
            </div>

            <div>
                <label htmlFor="date-of-birth">Date of Birth</label>
                <DatePicker 
                    id="date-of-birth"
                    selected={form['dateOfBirth']} 
                    onChange={(date) => updateForm('dateOfBirth', date)} 
                    locale={fr}
                />
            </div>

            <div>
                <label htmlFor="start-date">Start Date</label>
                <DatePicker 
                    id="start-date"
                    selected={form['startDate']} 
                    onChange={(date) => updateForm('startDate', date)} 
                    locale={fr}
                />
            </div>

            <fieldset>
                <legend>Address</legend>
                <div>
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" onChange={(e) => updateForm('street', e.target.value)}/>                     
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" onChange={(e) => updateForm('city', e.target.value)}/>                     
                </div>

                <div>
                    <label htmlFor="state">State</label>
                    <Select 
                        options={[
                            {label: 'Alabama', value: 'AL'},
                            {label: 'Colorado', value: 'COL'},
                        ]}
                        onChange={(value) => updateForm('state', value)}
                    
                    />
                </div>

                <div>
                    <label htmlFor="zip-code">Zip Code</label>
                    <input type='number' id="zip-code" onChange={(e) => updateForm('zipCode', e.target.value)}/>                     
                </div>


            </fieldset>

            <div>
                    <label htmlFor="department">Department</label>
                    <Select 
                        options={[
                            {label: 'Sales', value: 'Sales'},
                            {label: 'Marketing', value: 'Marketing'},
                        ]}
                        onChange={(value) => updateForm('department', value)}
                    
                    />
                </div>




            <button type="submit" onClick={handleSubmit}>Save</button>

        </form>
    </div>
}

export default Home;
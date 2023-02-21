import axios from 'axios';
/**
 * employee client to send HTTP request
 * @author Jing Huang
 * @author Biniyam 
 */

let getAllEmployees = (employees) => {
    axios.get(`http://localhost:8080/employees`)
        .then(result => {
            result.data.forEach(element => {
                employees.push(element);
            })

        });
    return employees;
};

let getEmployeeById = (employee, employeeNum) => {
    axios.get(`http://localhost:8080/employees/${employeeNum}`).then(result => {
        employee.push(result.data);
    });
};

let deleteEmployeeById = (employeeNum) => {
    axios.delete(`http://localhost:8080/employees/${employeeNum}`);
};

let saveEmployee = (emoloyeeData, array) => {
    axios.put("http://localhost:8080/employees/", emoloyeeData).then(result => {
        array.push(result.data);
    });
}

export { getAllEmployees, getEmployeeById, deleteEmployeeById, saveEmployee }

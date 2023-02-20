import axios from 'axios';
/**
 * employee client to send HTTP request
 * @author Jing Huang
 */
export default function employee() {
    async function getById(id) {
        const response = axios.get("http://localhost:8080/employees/" + id);
        return response;
    }

    async function getAll() {
        const response = axios.get("http://localhost:8080/employees");
        return response;
    }

    return (
        getAll,
        getById
    );
}
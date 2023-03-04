import axios from 'axios';
/**
 * account client to send HTTP request
 * @author Isaac Handy
 */

/** This client needs to enable HR Employees to: 
 * view all accounts, create an account, delete an account. 
 * There also needs to be the ability for a user to signup 
 * and process a login attempt.*/

let getAllAccounts = (accounts) => {
    axios.get(`http://localhost:8080/accounts`)
        .then(result => {
            result.data.forEach(element => {
                accounts.push(element);
            })

        });
    return accounts;
};

let createAccount = (accountData, array) => {
    axios.post("http://localhost:8080/accounts/", accountData).then(result => {
        array.push(result.data);
    });
}

let deleteAccount = (accountData, array) => {
    axios.delete("http://localhost:8080/accounts/", accountData).then(result => {
        array.push(result.data);
    });
}

let loginToAccount = (accountData, array) => {
    axios.get("http://localhost:8080/accounts/", accountData).then(result => {
        array.push(result.data);
    });
}

export default {getAllAccounts, createAccount, deleteAccount, loginToAccount}

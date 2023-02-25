import axios from 'axios';
/**
 * employee client to send HTTP request
 * @author Juan Franco Pinilla 
 * @author Zayda Cummings
 */



let getAllJobPPostings = (jobPostings) => {
  axios.get(`http://localhost:8080/jobpostings`)
      .then(result => {
          result.data.forEach(element => {
              employees.push(element);
          })

      });
  return employees;
};
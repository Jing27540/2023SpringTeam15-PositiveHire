package com.positivehire.phtalent.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import com.positivehire.phtalent.models.Employee;
import com.positivehire.phtalent.services.EmployeeService;

import junit.framework.Assert;

/**
 * Tests the APIEmployeeController class,
 * Employee Service, and Employee Repository class 
 * 
 * @author Jing Huang
 * @author Biniyam Sima
 */
@SuppressWarnings("deprecation")
@RunWith( SpringRunner.class )
@SpringBootTest
@AutoConfigureMockMvc
class APIEmployeeControllerTest {

	/**
	 * Creates a mock web application beans for testing
	 */
	private MockMvc mvc;
	
	/**
	 * Web application context
	 */
	@Autowired
	private WebApplicationContext context;
	
	/**
	 * Service class for employees
	 */
	@Autowired
	private EmployeeService employeeServ;
	
	/**
	 * Tests GETing using the controller,
	 * and saving using the service class.
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	void testEmployeeController() throws Exception {
		mvc = MockMvcBuilders.webAppContextSetup(context).build();	
		
		//Create fake employees to test with
		// final Employee employee1 = new Employee("Black", "Male", "IT", "Seattle", "Employed", LocalDate.of(2017, 4, 4), LocalDate.of(2017, 4, 6), "Software Engineer", 31, 120000, "Bachelor's", 3, 0, 0, 0, "good", "excellent", "average", LocalDate.of(2017, 4, 5), 2017, 6000, 40);
		// final Employee employee2 = new Employee("White", "Female", "Engineering", "Seattle", "Employed", LocalDate.of(2020, 4, 3), LocalDate.of(2022, 6, 10), "HR", 39, 60000, "Bachelor's", 23, 0, 0, 0, "good", "excellent", "average",  LocalDate.of(2021, 1, 1), 2021, 4000, 20);
		// final Employee employee3 = new Employee("Asian", "Female", "HR", "Seattle", "Employed", LocalDate.of(2021, 4, 3), LocalDate.of(2022, 4, 10), "Buisness Admin", 23, 300000, "Master's", 0, 0, 0, 0, "good", "excellent", "average",  LocalDate.of(2022, 1, 1), 2022, 10000, 25);
		final Employee employee1 = new Employee((long) 0, "Jing");
        final Employee employee2 = new Employee((long) 1, "Biniyam");
        final Employee employee3 = new Employee((long) 2, "Isaac");
		//Save employees to service
		employeeServ.saveEmployee(employee1);
		employeeServ.saveEmployee(employee2);
		employeeServ.saveEmployee(employee3);
		
		//Get employees
		mvc.perform( get("/employees")).andExpect( status().isOk() );
		
		//Test getting employees
		List<Employee> employees = employeeServ.findAll();
		Assert.assertEquals(3, employees.size());
		Assert.assertEquals(employee1, employees.get(0));
		Assert.assertEquals(employee2, employees.get(1));
		Assert.assertEquals(employee3, employees.get(2));
		
		System.out.print(employees);
		
	}

}
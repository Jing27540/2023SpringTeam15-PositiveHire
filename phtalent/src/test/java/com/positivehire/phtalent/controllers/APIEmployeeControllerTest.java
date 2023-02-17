package com.positivehire.phtalent.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import java.time.LocalDate;
import java.util.ArrayList;
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

import com.positivehire.phtalent.common.TestUtils;
import com.positivehire.phtalent.models.Employee;
import com.positivehire.phtalent.models.Skill;
import com.positivehire.phtalent.services.EmployeeService;
import org.junit.Before;
import junit.framework.Assert;
import org.springframework.http.MediaType;

/**
 * Tests the APIEmployeeController class,
 * Employee Service, and Employee Repository class
 * 
 * @author Jing Huang
 * @author Biniyam Sima
 */
@SuppressWarnings("deprecation")
@RunWith(SpringRunner.class)
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

	private static Employee employee1;

	private static Employee employee2;

	private static Employee employee3;

	// @Before
	// public void setup() {

	// mvc = MockMvcBuilders.webAppContextSetup(context).build();

	// //employeeServ.deleteAllEmployees();
	// //Create fake employees to test with
	// Skill s1 = new Skill("c#", "Expert", 4);
	// Skill s2 = new Skill("Docker", "Expert", 4);
	// Skill s3 = new Skill("Communication", "Advanced", 3);
	// List<Skill> skills = new ArrayList<Skill>();
	// skills.add(s1);
	// skills.add(s2);
	// skills.add(s3);
	// //System.out.print(skills.toString());
	// //Create fake employees to test with
	// employee1 = new Employee();
	// employee1.setEmployeeName("Jing");
	// employee1.setEmployeeNum((long) 1);
	// employee1.setTechnicalSkills(skills);
	// employee1.setAccessRole("HR");
	// employee2 = new Employee();
	// employee2.setEmployeeName("Biniyam");
	// employee1.setEmployeeNum((long) 2);
	// employee2.setAccessRole("Manager");
	// employee2.setWorkEthic(skills);
	// employee3 = new Employee();
	// employee3.setEmployeeName("Isaac");
	// employee1.setEmployeeNum((long) 3);
	// employee3.setAccessRole("Engineer");
	// employee3.setPeopleSkills(skills);
	// //Save employees to service
	// employeeServ.saveEmployee(employee1);
	// employeeServ.saveEmployee(employee2);
	// employeeServ.saveEmployee(employee3);
	// }

	/**
	 * Tests GETing using the controller,
	 * and saving using the service class.
	 * 
	 * @throws Exception
	 */
	@Test
	@Transactional
	public void testEmployeeController() throws Exception {
		mvc = MockMvcBuilders.webAppContextSetup(context).build();
		List<Employee> employees = employeeServ.findAll();
		// if(employees.size() != 0 ) {
		employeeServ.deleteAllEmployees();
		// }

		// Create fake employees to test with
		Skill s1 = new Skill("c#", "Expert", 4);
		Skill s2 = new Skill("Docker", "Expert", 4);
		Skill s3 = new Skill("Communication", "Advanced", 3);
		List<Skill> skills = new ArrayList<Skill>();
		skills.add(s1);
		skills.add(s2);
		skills.add(s3);
		// System.out.print(skills.toString());
		// Create fake employees to test with
		employee1 = new Employee();
		employee1.setEmployeeName("Jing");

		employee1.setTechnicalSkills(skills);
		employee1.setAccessRole("HR");
		employee2 = new Employee();
		employee2.setEmployeeName("Biniyam");

		employee2.setAccessRole("Manager");
		employee2.setWorkEthic(skills);
		employee3 = new Employee();
		employee3.setEmployeeName("Isaac");

		employee3.setAccessRole("Engineer");
		employee3.setPeopleSkills(skills);
		// Save employees to service
		employeeServ.saveEmployee(employee1);
		employeeServ.saveEmployee(employee2);
		employeeServ.saveEmployee(employee3);
		// Get employees
		mvc.perform(get("/employees")).andExpect(status().isOk());
		System.out.println(employee1.getId());
		// Test getting employees
		employees = employeeServ.findAll();
	//	System.out.println(employees.toString());
		Assert.assertEquals(3, employees.size());
		Assert.assertEquals(employee1, employeeServ.findById((long) employee1.getId()));
		Assert.assertEquals(employee2, employeeServ.findById((long) employee2.getId()));
		Assert.assertEquals(employee3, employees.get(2));

		// employeeServ.deleteEmployee((long) employee2.getId());

		employees = employeeServ.findAll();
		// Assert.assertEquals(2, employees.size());

		employee2.setManagerName("Johnny Dep");
		employee2.setEmployeeName("John Cena");
		mvc.perform(put("/employees").contentType(MediaType.APPLICATION_JSON)
				.content(TestUtils.asJsonString(employee2)));

		employees = employeeServ.findAll();
		Assert.assertEquals(3, employees.size());

		Assert.assertEquals(employee2.getManagerName(),
				employeeServ.findById((long) employee2.getId()).getManagerName());
		// System.out.println(employees.toString());

		Employee employee4 = new Employee();
		// jakarta.servlet.ServletException: Request processing failed:
		// java.lang.NullPointerException: Cannot invoke "java.lang.Long.longValue()"
		// because the return value of
		// "com.positivehire.phtalent.models.Employee.getId()" is null

		employee4.setEmployeeName("Fourth Employee");
		employee4.setManagerName("Fourth employees Manager");
		mvc.perform(post("/employees").contentType(MediaType.APPLICATION_JSON)
				.content(TestUtils.asJsonString(employee4)));

		employees = employeeServ.findAll();
		Assert.assertEquals(4, employees.size());

		mvc.perform(delete("/employees/2").contentType(MediaType.APPLICATION_JSON));
				

		employees = employeeServ.findAll();
		Assert.assertEquals(3, employees.size());

		mvc.perform(get("/employees/3").contentType(MediaType.APPLICATION_JSON)).andExpect( status().isOk() );
	}

}
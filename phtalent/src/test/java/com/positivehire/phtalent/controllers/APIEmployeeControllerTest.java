package com.positivehire.phtalent.controllers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import com.positivehire.phtalent.common.TestUtils;
import com.positivehire.phtalent.models.Certification;
import com.positivehire.phtalent.models.Employee;
import com.positivehire.phtalent.models.Skill;
import com.positivehire.phtalent.services.EmployeeService;

import junit.framework.Assert;

/**
 * Tests the APIEmployeeController class, Employee Service, and Employee
 * Repository class
 *
 * @author Jing Huang
 * @author Biniyam Sima
 * @author Zayda Cummings
 */
@SuppressWarnings ( "deprecation" )
@RunWith ( SpringRunner.class )
@SpringBootTest
@AutoConfigureMockMvc
public class APIEmployeeControllerTest {

    /**
     * Creates a mock web application beans for testing
     */
    private MockMvc               mvc;

    /**
     * Web application context
     */
    @Autowired
    private WebApplicationContext context;

    /**
     * Service class for employees
     */
    @Autowired
    private EmployeeService       employeeServ;

    private static Employee       employee1;

    private static Employee       employee2;

    private static Employee       employee3;

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
     * Tests GETing using the controller, and saving using the service class.
     *
     * @throws Exception
     */
    @Test
    @Transactional
    public void testEmployeeController () throws Exception {
        mvc = MockMvcBuilders.webAppContextSetup( context ).build();
        List<Employee> employees = new ArrayList();
        // if(employees.size() != 0 ) {
        employeeServ.deleteAll();
        // }

        final Employee emp = new Employee( (long) 2, "employeeName", 500, 1, 1, 1, 1, 1, 1, 39, 55.55, "NC", 22222,
                "DOB", "Male", "married", "US", "Latino", "race", "dateOfHire", 5, "dateOfTermination",
                "reasonForTermination", "employementStatus", "department", "position", "managerName", "employeeSource",
                "accessRole", "performanceScore", "annualBonus", 5.5, null, null, null, null );
        final Date d = new Date(); 
        final Certification cert = new Certification( "Leadership", "NC State", d, "2234",
                "Teamwork, communication, leadership" );
        final List<Certification> li = new ArrayList<Certification>();
        li.add( cert );
        // Create fake employees to test with
        final Skill s1 = new Skill( "c#", "Expert", 4 );
        final Skill s2 = new Skill( "Docker", "Expert", 4 );
        final Skill s3 = new Skill( "Communication", "Advanced", 3 );
        final List<Skill> skills = new ArrayList<Skill>();
        skills.add( s1 );
        skills.add( s2 );
        skills.add( s3 );
        // System.out.print(skills.toString());
        // Create fake employees to test with
        employee1 = new Employee();
        employee1.setEmployeeName( "Jing" );
        employee1.setEmployeeNum( 54645394 );
        employee1.addTechSkills( skills );
        employee1.setAccessRole( "HR" );
        employee1.addCertifications( li );

        employee2 = new Employee();
        employee2.setEmployeeName( "Biniyam" );
        employee2.setEmployeeNum( 54645294 );
        employee2.setAccessRole( "Manager" );
        employee2.addWorkEthic( skills );

        employee3 = new Employee();
        employee3.setEmployeeName( "Isaac" );
        employee3.setEmployeeNum( 54645494 );
        employee3.setAccessRole( "Engineer" );
        employee3.addPeopleSkills( skills );
        // Save employees to service
        employeeServ.save( employee1 );
        employeeServ.save( employee2 );
        employeeServ.save( employee3 );
        // Get employees
        mvc.perform( get( "/employees" ) ).andExpect( status().isOk() );
        System.out.println( employee1.getId() );
        // Test getting employees
        employees = employeeServ.findAll();
        // System.out.println(employees.toString());
        Assert.assertEquals( 3, employees.size() );
        Assert.assertEquals( employee1, employeeServ.findById( (long) employee1.getId() ) );
        Assert.assertEquals( employee2, employeeServ.findById( (long) employee2.getId() ) );
        Assert.assertEquals( employee3, employeeServ.findById( (long) employee3.getId() ) );

        // employeeServ.deleteEmployee((long) employee2.getId());

        employees = employeeServ.findAll();
        // Assert.assertEquals(2, employees.size());

        employee2.setManagerName( "Johnny Dep" );
        employee2.setEmployeeName( "John Cena" );
        final Skill s4 = new Skill( "Communication", "Mid", 3 );
        employee2.getTechnicalSkills().add( s4 );
        // employee1.updateEmployee( employee2 );
        mvc.perform( put( "/employees" ).contentType( MediaType.APPLICATION_JSON )
                .content( TestUtils.asJsonString( employee2 ) ) );

        employees = employeeServ.findAll();
        Assert.assertEquals( 3, employees.size() );

        Assert.assertEquals( "Johnny Dep", employeeServ.findById( (long) employee2.getId() ).getManagerName() );
        // System.out.println(employees.toString());

        final Employee employee4 = new Employee();
        // jakarta.servlet.ServletException: Request processing failed:
        // java.lang.NullPointerException: Cannot invoke
        // "java.lang.Long.longValue()"
        // because the return value of
        // "com.positivehire.phtalent.models.Employee.getId()" is null

        employee4.setEmployeeName( "Fourth Employee" );
        employee4.setManagerName( "Fourth employees Manager" );
        employee4.setEmployeeNum( 54645354 );
        mvc.perform( post( "/employees" ).contentType( MediaType.APPLICATION_JSON )
                .content( TestUtils.asJsonString( employee4 ) ) ).andExpect( status().isOk() );

        employees = employeeServ.findAll();
        Assert.assertEquals( 4, employees.size() );

        mvc.perform( delete( "/employees/" + 54645494 ).contentType( MediaType.APPLICATION_JSON ) )
                .andExpect( status().isOk() );
        mvc.perform( get( "/employees/" + 000000 ).contentType( MediaType.APPLICATION_JSON ) )
                .andExpect( status().isNotFound() );

        employees = employeeServ.findAll();
        Assert.assertEquals( 3, employees.size() );

        final String firstEmp = employee1.toString();

        Assert.assertNotNull( firstEmp );

        // mvc.perform(get("/employees/" +
        // employees.get(2).getId()).contentType(MediaType.APPLICATION_JSON)).andExpect(
        // status().isOk() );

        // employees.get(2).setEmployeeNum("54645354");

        mvc.perform(
                get( "/employees/" + employees.get( 2 ).getEmployeeNum() ).contentType( MediaType.APPLICATION_JSON ) )
                .andExpect( status().isOk() );
        employeeServ.save( emp );
    }

}

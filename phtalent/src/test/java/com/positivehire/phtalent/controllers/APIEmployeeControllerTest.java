package com.positivehire.phtalent.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
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
import com.positivehire.phtalent.models.Education;
import com.positivehire.phtalent.models.Employee;
import com.positivehire.phtalent.models.JobRecord;
import com.positivehire.phtalent.models.Skill;
import com.positivehire.phtalent.services.EducationService;
import com.positivehire.phtalent.services.EmployeeService;
import com.positivehire.phtalent.services.JobRecordService;
import com.positivehire.phtalent.services.SkillService;

import junit.framework.Assert;

/**
 * Tests the APIEmployeeController class, Employee Service, and Employee
 * Repository class
 *
 * @author Jing Huang
 * @author Biniyam Sima
 * @author Zayda Cummings
 */
@SuppressWarnings("deprecation")
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class APIEmployeeControllerTest {

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

        @Autowired
        private JobRecordService jrServ;

        @Autowired
        private SkillService skillServ;

        @Autowired
        private EducationService eduServ;

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
         * Tests GETing using the controller, and saving using the service class.
         *
         * @throws Exception
         */
        @Test
        @Transactional
        public void testEmployeeController() throws Exception {
                mvc = MockMvcBuilders.webAppContextSetup(context).build();
                List<Employee> employees = new ArrayList();
                // if(employees.size() != 0 ) {
                employeeServ.deleteAll();
                // }

                final Employee emp = new Employee((long) 2, "employeeName", 500, 1, 1, 1, 1, 1, 1, 39, 55.55, "NC",
                                22222,
                                "DOB", "Male", "married", "US", "Latino", "race", "dateOfHire", 5, "dateOfTermination",
                                "reasonForTermination", "employementStatus", "department", "position", "managerName",
                                "employeeSource",
                                "accessRole", "performanceScore", "annualBonus", 5.5, null, null, null, null, null,
                                null);
                final Date d = new Date();

                // Certifications
                final Certification cert = new Certification("Leadership", "NC State", d, "2234",
                                "Teamwork, communication, leadership");
                final List<Certification> li = new ArrayList<Certification>();
                li.add(cert);

                // Create fake employees to test with

                // Skills
                final Skill s1 = new Skill("c#", "Expert", 4);
                final Skill s2 = new Skill("Docker", "Expert", 4);
                final Skill s3 = new Skill("Communication", "Advanced", 3);
                final List<Skill> skills = new ArrayList<Skill>();
                skills.add(s1);
                skills.add(s2);
                skills.add(s3);

                // JobRecord skills
                final Skill sx = new Skill("Java", "Expert", 2);
                final Skill sy = new Skill("Presentations", "Expert", 5);
                List<Skill> jrSkills = new ArrayList<Skill>();
                jrSkills.add(sx);

                // JobRecords
                final JobRecord jr1 = new JobRecord("CISO", "Senior", "RedHat", null, new Date(2013, 3, 20),
                                new Date(2018, 3, 20),
                                jrSkills);

                jrSkills.remove(sx);

                jrSkills.add(sy);

                final JobRecord jr2 = new JobRecord("Server", "Noob", "Marcos", null, new Date(1884, 1, 1),
                                new Date(1884, 1, 2),
                                jrSkills);
                List<JobRecord> jrList = new ArrayList<JobRecord>();
                jrList.add(jr1);

                employee1 = new Employee();
                employee1.setEmployeeName("Jing");
                employee1.setEmployeeNum(54645394);
                employee1.addTechSkills(skills);
                employee1.setAccessRole("HR");
                employee1.addCertifications(li);

                employee2 = new Employee();
                employee2.setEmployeeName("Biniyam");
                employee2.setEmployeeNum(54645294);
                employee2.setAccessRole("Manager");
                employee2.addWorkEthic(skills);
                employee2.addJobRecord(jrList);

                employee3 = new Employee();
                employee3.setEmployeeName("Isaac");
                employee3.setEmployeeNum(54645494);
                employee3.setAccessRole("Engineer");
                employee3.addPeopleSkills(skills);
                // employee3.addJobRecord(jrList);
                // Save employees to service
                employeeServ.save(employee1);
                employeeServ.save(employee2);
                employeeServ.save(employee3);
                // Get employees
                mvc.perform(get("/employees")).andExpect(status().isOk());
                System.out.println(employee1.getId());
                // Test getting employees
                employees = employeeServ.findAll();
                // System.out.println(employees.toString());
                Assert.assertEquals(3, employees.size());
                Assert.assertEquals(employee1, employeeServ.findById((long) employee1.getId()));
                Assert.assertEquals(employee2, employeeServ.findById((long) employee2.getId()));
                Assert.assertEquals(employee3, employeeServ.findById((long) employee3.getId()));

                // employeeServ.deleteEmployee((long) employee2.getId());

                employees = employeeServ.findAll();
                // Assert.assertEquals(2, employees.size());

                assertEquals(employees.size(), 3);

                employee2.setManagerName("Johnny Dep");
                employee2.setEmployeeName("John Cena");
                final Skill s4 = new Skill("Communication", "Mid", 3);
                employee2.getTechnicalSkills().add(s4);
                // employee1.updateEmployee( employee2 );
                mvc.perform(put("/employees").contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(employee2)));

                employees = employeeServ.findAll();
                Assert.assertEquals(3, employees.size());

                Assert.assertEquals("Johnny Dep", employeeServ.findById((long) employee2.getId()).getManagerName());
                System.out.println(employeeServ.findById((long) employee2.getId()).getTechnicalSkills().size());
                // Assert.assertEquals(employeeServ.findById((long)
                // employee2.getId()).getTechnicalSkills().size(), 0);
                // System.out.println(employees.toString());

                final Employee employee4 = new Employee();
                // jakarta.servlet.ServletException: Request processing failed:
                // java.lang.NullPointerException: Cannot invoke
                // "java.lang.Long.longValue()"
                // because the return value of
                // "com.positivehire.phtalent.models.Employee.getId()" is null

                employee4.setEmployeeName("Fourth Employee");
                employee4.setManagerName("Fourth employees Manager");
                employee4.setEmployeeNum(54645354);
                mvc.perform(post("/employees").contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(employee4))).andExpect(status().isOk());

                employees = employeeServ.findAll();
                Assert.assertEquals(4, employees.size());

                mvc.perform(delete("/employees/" + 54645494).contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
                mvc.perform(get("/employees/" + 000000).contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isNotFound());

                employees = employeeServ.findAll();
                Assert.assertEquals(3, employees.size());

                final String firstEmp = employee1.toString();

                Assert.assertNotNull(firstEmp);

                // mvc.perform(get("/employees/" +
                // employees.get(2).getId()).contentType(MediaType.APPLICATION_JSON)).andExpect(
                // status().isOk() );

                // employees.get(2).setEmployeeNum("54645354");

                mvc.perform(
                                get("/employees/" + employees.get(2).getEmployeeNum())
                                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());
                employeeServ.save(emp);

                // *************************** */

                // JobRecord functionality testing (CRUD)

                JobRecord newJR1 = new JobRecord("firstEmp", "entry", null, null, null, null, null);

                List<Skill> moreskills = new ArrayList<Skill>();
                Skill soccer = new Skill("Soccer", "pro", 5);
                moreskills.add(soccer);

                JobRecord newJR2 = new JobRecord("secJR", "junior", null, null, null, null, moreskills);

                System.out.println(newJR2.getId());
                mvc.perform(post("/employees/" + employee1.getEmployeeNum() + "/jobrecords")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(newJR1))).andExpect(status().isOk());

                // employees = employeeServ.findAll();

                Employee check = employeeServ.findByEmployeeNum(employee1.getEmployeeNum());

                assertEquals(check.getJobRecords().get(0).getJobTitle(), newJR1.getJobTitle());
                assertEquals(check.getJobRecords().get(0).getJobLevel(), newJR1.getJobLevel());

                mvc.perform(post("/employees/" + employee1.getEmployeeNum() + "/jobrecords")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(newJR2))).andExpect(status().isOk());
                Employee check2 = employeeServ.findByEmployeeNum(employee1.getEmployeeNum());

                assertEquals(check2.getJobRecords().get(1).getJobTitle(), newJR2.getJobTitle());
                assertEquals(check2.getJobRecords().get(1).getJobLevel(), newJR2.getJobLevel());

                JobRecord updateMe1 = null;
                JobRecord updateMe2 = null;
                for (JobRecord x : jrServ.findAll()) {
                        if (x.getJobTitle().equals(newJR2.getJobTitle())) {
                                updateMe2 = x;
                        } else if (x.getJobTitle().equals(newJR1.getJobTitle())) {
                                updateMe1 = x;
                        }
                }

                Long updateMeId1 = Long.parseLong(updateMe1.getId().toString());
                Long updateMeId2 = Long.parseLong(updateMe2.getId().toString());

                // Attempt to update a JobRecords level
                newJR1.setJobLevel("newlevel");
                mvc.perform(put("/employees/" + employee1.getEmployeeNum() + "/jobrecords/" + updateMeId1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(newJR1))).andExpect(status().isOk());

                Employee check4 = employeeServ.findByEmployeeNum(employee1.getEmployeeNum());
                assertEquals(2, check4.getJobRecords().size());

                assertEquals("newlevel", check4.getJobRecords().get(0).getJobLevel());

                // Attempt to to add a new skill to the JobRecord
                Skill emptySkill = new Skill("", "", 1);
                // moreskills.add(emptySkill);
                // newJR2.setJobSkills(moreskills);

                mvc.perform(post("/employees/" + employee1.getEmployeeNum() + "/jobrecords/" + updateMeId2 + "/skills")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(emptySkill))).andExpect(status().isOk());

                Employee check6 = employeeServ.findByEmployeeNum(employee1.getEmployeeNum());
                assertEquals(2, check6.getJobRecords().size());
                assertEquals(2, check6.getJobRecords().get(1).getJobSkills().size());
                assertEquals(check6.getJobRecords().get(1).getJobSkills().get(1).getName(), emptySkill.getName());

                // assertEquals("newlevel", check6.getJobRecords().get(0).getJobLevel());

                // Attempt to update a JobRecords skill
                // moreskills.get(0).setLevel("5");
                // moreskills.get(0).setScore(1);
                // newJR2.setJobSkills(moreskills);

                Long skillId1 = null;
                for (Skill x : skillServ.findAll()) {
                        if (x.getName().equals("")) {
                                skillId1 = Long.parseLong(x.getId().toString());
                        }
                }

                emptySkill.setName("New Skill Name");

                mvc.perform(put("/employees/" + employee1.getEmployeeNum() + "/jobrecords/" + updateMeId2 + "/skills/"
                                + skillId1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(emptySkill))).andExpect(status().isOk());

                Employee check5 = employeeServ.findByEmployeeNum(employee1.getEmployeeNum());
                assertEquals(2, check5.getJobRecords().size());
                assertEquals(emptySkill.getLevel(), check5.getJobRecords().get(1).getJobSkills().get(1).getLevel());
                assertEquals(emptySkill.getName(), check5.getJobRecords().get(1).getJobSkills().get(1).getName());
                assertEquals(emptySkill.getScore(), check5.getJobRecords().get(1).getJobSkills().get(1).getScore());
                assertEquals(1, check5.getJobRecords().get(1).getJobSkills().get(1).getScore());
                assertEquals(2, check5.getJobRecords().get(1).getJobSkills().size());

                assertEquals("newlevel", check5.getJobRecords().get(0).getJobLevel());

                // Attempt to delete a skill

                mvc.perform(delete(
                                "/employees/" + employee1.getEmployeeNum() + "/jobrecords/" + updateMeId2 + "/skills/"
                                                + skillId1)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(emptySkill))).andExpect(status().isOk());

                Employee check7 = employeeServ.findByEmployeeNum(employee1.getEmployeeNum());
                assertEquals(1, check7.getJobRecords().get(1).getJobSkills().size());
                assertEquals("Soccer", check7.getJobRecords().get(1).getJobSkills().get(0).getName());

                // // Attempt to use put to add a new skill to the JobRecord
                // emptySkill = new Skill("", "", 1);
                // moreskills.add(emptySkill);
                // newJR2.setJobSkills(moreskills);

                // mvc.perform(put("/employees/" + employee1.getEmployeeNum() + "/jobrecords/" +
                // updateMeId2)
                // .contentType(MediaType.APPLICATION_JSON)
                // .content(TestUtils.asJsonString(newJR2))).andExpect(status().isOk());

                // check6 = employeeServ.findByEmployeeNum(employee1.getEmployeeNum());
                // assertEquals(2, check6.getJobRecords().size());
                // assertEquals(2, check6.getJobRecords().get(1).getJobSkills().size());

                // assertEquals("newlevel", check6.getJobRecords().get(0).getJobLevel());

                // Attempt to delete a JobRecord from an Employee
                mvc.perform(delete("/employees/" + employee1.getEmployeeNum() + "/jobrecords/" + updateMeId2)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());

                Employee check3 = employeeServ.findByEmployeeNum(employee1.getEmployeeNum());
                assertEquals(1, check3.getJobRecords().size());

                assertEquals(check3.getJobRecords().get(0).getJobTitle(), newJR1.getJobTitle());
                assertEquals(check3.getJobRecords().get(0).getJobLevel(), newJR1.getJobLevel());

                // For database data to use on frontend
                Skill refSkill = new Skill("Jings Assistant", "High", 6);
                Skill refSkill2 = new Skill("Java", "Low", 3);
                moreskills = new ArrayList<Skill>();
                moreskills.add(refSkill);
                moreskills.add(refSkill2);

                JobRecord newJR3 = new JobRecord("Basketball", "junior", "NCSU", null, null, null, moreskills);

                mvc.perform(post("/employees/" + employee1.getEmployeeNum() + "/jobrecords")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(newJR3))).andExpect(status().isOk());

                /* ******************************************* */

                List<Skill> eduSkills = new ArrayList<Skill>();
                Skill nSkill = new Skill("csskill", "advanced", 5);
                eduSkills.add(nSkill);
                Education newEd = new Education("BS CS", "NCSU", "BS", null, eduSkills);
                Employee newEmpForEd = new Employee();
                newEmpForEd.setEmployeeName("empFOrEd");
                newEmpForEd.setEmployeeNum(8889888);

                employeeServ.save(newEmpForEd);

                mvc.perform(post("/employees/" + newEmpForEd.getEmployeeNum() + "/education")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(newEd))).andExpect(status().isOk());
                List<Education> eduli = eduServ.findAll();
                Long id = (Long) eduli.get(0).getId();

                Education newEd2 = new Education("BS CS", "other inst", "BS", null,
                                eduSkills);
                newEd2.setId((Long) eduServ.findAll().get(0).getId());

                eduSkills.add(nSkill);
                newEd2.setSkills(eduSkills);

                mvc.perform(put("/employees/" + newEmpForEd.getEmployeeNum() + "/education")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(newEd2))).andExpect(status().isOk());

                Skill benTen = new Skill("benten", "ten", 10);

                mvc.perform(post("/employees/" + newEmpForEd.getEmployeeNum() + "/education/"
                                + id + "/skills")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(benTen))).andExpect(status().isOk());

                Long skId = null;
                int size = skillServ.findAll().size();
                for (Skill sk : skillServ.findAll()) {
                        if (sk.getName().equals("benten")) {
                                skId = (Long) sk.getId();
                        }
                }
                Skill benTenTwo = new Skill("bententwo", "twenty", 20);

                mvc.perform(put("/employees/" + newEmpForEd.getEmployeeNum() + "/education/"
                                + id + "/skills/" + skId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(TestUtils.asJsonString(benTenTwo))).andExpect(status().isOk());

                mvc.perform(delete(
                                "/employees/" + newEmpForEd.getEmployeeNum() + "/education/" + id +
                                                "/skills/" + skId)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());

                mvc.perform(delete("/employees/" + newEmpForEd.getEmployeeNum() +
                                "/education/" + id)
                                .contentType(MediaType.APPLICATION_JSON))
                                .andExpect(status().isOk());

                assertEquals(0, eduServ.findAll().size());

                /* ********************************************** */

                // List<JobRecord> x = jrServ.findAll();
                // System.out.println(x);

                // Skill newSkill = new Skill("hi", "boss", 20);

                // Skill spp = null;
                // for (JobRecord inside : x) {
                // if (inside.getJobTitle().equals("CISO")) {
                // spp = inside.getJobSkills().get(0);
                // spp.setName("foo");
                // skillServ.save(spp);

                // inside.getJobSkills().add(newSkill);
                // jrServ.save(inside);
                // }
                // }

                // JobRecord newJobRecord = new JobRecord("", "", null, null, null);
                // employee2.getJobRecords().add(newJobRecord);
                // employeeServ.save(employee2);

                // // Check Employee1 has no JobRecords

                // final String c1 = mvc.perform(
                // get("/employees/" + "54645394")
                // .contentType(MediaType.APPLICATION_JSON))
                // .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

                // assertTrue(c1.contains("\"jobRecords\":[]"));

                // // Add JobRecords
                // jrList.remove(0);
                // jrList.add(jr2);
                // employee1.addJobRecord(jrList);
                // assertEquals(1, jrList.size());

                // employeeServ.save(employee1);

                // mvc.perform(put("/employees").contentType(MediaType.APPLICATION_JSON)
                // .content(TestUtils.asJsonString(employee1))).andExpect(status().isOk());

                // // Verify Job Records

                // final String c2 = mvc.perform(
                // get("/employees/" + "54645394")
                // .contentType(MediaType.APPLICATION_JSON))
                // .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

                // assertTrue(c2.contains("\"jobRecords\":[{"));

                // assertTrue(c2.contains("\"jobTitle\":\"Server\""));

                // assertTrue(c2.contains("\"jobLevel\":\"Noob\""));

                // assertTrue(c2.contains(
                // "\"jobSkills\":[{\"name\":\"Presentations\",\"level\":\"Expert\",\"score\":5}]}]"));

                // // // Update Job Records
                // jrList.get(0).setJobLevel("Advanced");
                // employee1.setJobRecords(jrList);
                // assertEquals(employee1.getJobRecords().size(), 1);
                // assertEquals(employee1.getJobRecords().get(0).getJobTitle(), "Server");
                // assertEquals(employee1.getJobRecords().get(0).getJobLevel(), "Advanced");

                // // assertEquals(jrService.findAll().size(), 1);
                // // JobRecord jrRecord1InDB = jrService.findAll().get(0);
                // // assertEquals(jrRecord1InDB.getJobTitle(), "CISO");
                // // assertEquals(jrRecord1InDB.getJobLevel(), "Expert");

                // // mvc.perform(put("/employees").contentType(MediaType.APPLICATION_JSON)
                // // .content(TestUtils.asJsonString(employee1))).andExpect(status().isOk());

                // // // Verify Job Records

                // // final String c3 = mvc.perform(
                // // get("/employees/" + "54645394")
                // // .contentType(MediaType.APPLICATION_JSON))
                // //
                // .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

                // // assertTrue(c3.contains("\"jobRecords\":[{"));

                // // assertTrue(c3.contains("\"jobTitle\":\"CISO\""));

                // // assertTrue(c3.contains("\"jobLevel\":\"Advanced\""));

                // // Delete Job Records

                // jrList.remove(jr2);
                // employee1.setJobRecords(jrList);
                // assertEquals(employee1.getJobRecords().size(), 0);

                // mvc.perform(put("/employees").contentType(MediaType.APPLICATION_JSON)
                // .content(TestUtils.asJsonString(employee1)));

                // final String c4 = mvc.perform(
                // get("/employees/" + "54645394")
                // .contentType(MediaType.APPLICATION_JSON))
                // .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

                // assertTrue(c4.contains("\"jobRecords\":[]"));

                // *************************** */
        }

}

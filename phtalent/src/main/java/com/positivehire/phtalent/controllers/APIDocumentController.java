package com.positivehire.phtalent.controllers;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.positivehire.phtalent.models.Document;
import com.positivehire.phtalent.services.DocumentService;

@RestController
@CrossOrigin("http://localhost:3000/")
public class APIDocumentController extends APIController {
    
    @Autowired
    private DocumentService docService;
    /**
     * Create a document
     */
    @PostMapping("/documents")
    public ResponseEntity<String> createDocument(@RequestBody MultipartFile doc, @RequestBody int employeeNum) {
        Document newDoc = null;
        Document exists = docService.findByEmployeeNum(employeeNum);
        try{
            newDoc = new Document(null, employeeNum, doc.getBytes());
        } catch(Exception e) {
            return new ResponseEntity<String>(
                successResponse("Error saving document"),
                HttpStatus.BAD_REQUEST);
        }

        if (exists != null) {
            docService.delete(exists);
            docService.save(newDoc);
            return new ResponseEntity<String>(successResponse("successfully created"),
            HttpStatus.OK);
        } else {
            docService.save(newDoc);
            return new ResponseEntity<String>(successResponse("successfully created"),
                    HttpStatus.OK);
        }
    }

    /**
     * Delete a document
     * @param employeeNum the employee num to use 
     * @return
     */
    @DeleteMapping("/documents/{employeeNum}")
    public ResponseEntity<String> deleteDocument(@PathVariable("employeeNum") final int employeeNum) {
        Document doc = docService.findByEmployeeNum(employeeNum);

        if(doc == null) {
            return new ResponseEntity<String>(errorResponse("No document associated with the employee number exists"), HttpStatus.NOT_FOUND);
        }

        docService.delete(doc);

        return new ResponseEntity<String>(successResponse("Document was deleted successfully"), HttpStatus.OK);
    }

    @GetMapping("/documents/{employeeNum}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable("employeeNum") final int employeeNum) {
        Document toReturn = docService.findByEmployeeNum(0);

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(toReturn.getDocType()))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment:filename=" + toReturn.getEmployeeNum() + "_resume" + "")
                .body(new ByteArrayResource(toReturn.getData()));
    }

}

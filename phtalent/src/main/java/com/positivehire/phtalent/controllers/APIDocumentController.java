package com.positivehire.phtalent.controllers;

import java.util.Base64;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
    @PostMapping("/documents/{employeeNum}")
    public ResponseEntity<String> createDocument(@RequestBody String doc,
            @PathVariable("employeeNum") final int employeeNum) {

        // Create substring that removes the trailing and leading " symbol on the passed
        // in base64 encoded string
        String removeTrailer = doc.substring(1, doc.length() - 1);

        byte[] decodedBytes = Base64.getDecoder().decode(removeTrailer);

        System.out.println("Decoded bytes");
        Document newDoc = null;
        Document exists = docService.findByEmployeeNum(employeeNum);
        System.out.println("Searched for existing document");

        try {
            newDoc = new Document(employeeNum, decodedBytes);
            System.out.println("Created new document object");

        } catch (Exception e) {
            e.getStackTrace();
            return new ResponseEntity<String>(
                    successResponse(e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }

        if (exists != null) {
            System.out.println("Attempt to delete doc");
            docService.delete(exists);
            docService.save(newDoc);
            return new ResponseEntity<String>(successResponse("successfully saved file"),
                    HttpStatus.OK);
        } else {
            docService.save(newDoc);
            System.out.println("Saved the document");
            return new ResponseEntity<String>(successResponse("successfully saved file"),
                    HttpStatus.OK);
        }
    }

    /**
     * Delete a document
     * 
     * @param employeeNum the employee num to use
     * @return
     */
    @DeleteMapping("/documents/{employeeNum}")
    public ResponseEntity<String> deleteDocument(@PathVariable("employeeNum") final int employeeNum) {
        Document doc = docService.findByEmployeeNum(employeeNum);

        if (doc == null) {
            return new ResponseEntity<String>(errorResponse("No document associated with the employee number exists"),
                    HttpStatus.NOT_FOUND);
        }

        docService.delete(doc);

        return new ResponseEntity<String>(successResponse("Document was deleted successfully"), HttpStatus.OK);
    }

    @GetMapping("/documents/{employeeNum}")
    public ResponseEntity<ByteArrayResource> downloadFile(@PathVariable("employeeNum") final int employeeNum) {
        Document toReturn = docService.findByEmployeeNum(employeeNum);

        return ResponseEntity.ok().contentType(MediaType.parseMediaType(MediaType.APPLICATION_PDF_VALUE))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" +
                        toReturn.getEmployeeNum() + "\"")
                .body(new ByteArrayResource(toReturn.getData()));
    }

}

package com.api.test.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.api.test.helper.FileUploadHelper;

@RestController
public class FileUploadController 
{
	@Autowired
	private FileUploadHelper fileUploadHelper;
	
	@PostMapping("/upload-file")
	public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file)
	{
		System.out.println(file.getOriginalFilename());
		System.out.println(file.getSize());
		System.out.println(file.getContentType());
		
		try
		{
			if(file.isEmpty())
			{
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File should not be empty");
			}
			
			if(!file.getContentType().equals("image/jpeg"))
			{
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File Accept only image/jpg content type");
			}
		}
		catch(Exception e) {System.out.println(e);}
		
		 boolean status =  fileUploadHelper.uploadFile(file);
		
		 if(status)
		 {
			 return ResponseEntity.ok("File uploaded sucessfully");
			 
//			 return ResponseEntity.ok(ServletUriComponentsBuilder.fromCurrentContextPath().path("/image/").path(file.getOriginalFilename()).toUriString());
			 
		 }
		 
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong !! try again !");
	}

}

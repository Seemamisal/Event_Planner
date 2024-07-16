package com.api.test.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.api.test.entity.*;
import com.api.test.service.EmployeeService;

@RestController
public class EmployeeController 
{
	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping("/employee")
	public ResponseEntity<List<Employee>> getAllEmployees()
	{
		List<Employee> list = employeeService.getAllEmployeeList();
		
		if(list.size()<=0)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(list);
	}
	
	@PostMapping("/employee")
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee)
	{
		Employee emp = null;
		try
		{
			emp = this.employeeService.AddEmployee(employee);
			return  ResponseEntity.of(Optional.of(emp));
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("/employee/{empId}")
	public ResponseEntity<Employee> getEmployee(@PathVariable("empId")int empId)
	{
		Employee emp = this.employeeService.getEmployeeById(empId);
		if(emp==null)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.of(Optional.of(emp));
	}
	
	
	@DeleteMapping("/employee/{empId}")
	public ResponseEntity<Void> deleteEmployee(@PathVariable("empId")int empId)
	{
		try
		{
			this.employeeService.deleteEmployee(empId);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PutMapping("/employee/{empId}")
	public ResponseEntity<Employee> updateEmployee(@RequestBody Employee employee, @PathVariable("empId") int empId)
	{
		try
		{
			this.employeeService.updateEmployee(employee, empId);
			return ResponseEntity.ok().body(employee);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
}

package com.api.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.api.test.dao.*;
import com.api.test.entity.*;

@Component
public class EmployeeService 
{
	@Autowired
	private EmployeeEpository employeeEpository;
	
	// get all employees
	public List<Employee> getAllEmployeeList()
	{
		List<Employee> list = (List<Employee>) this.employeeEpository.findAll();
		return list;
	}
	
	// get single employee by id
	public Employee getEmployeeById(int id)
	{
		Employee emp=null;
		try
		{
			emp = this.employeeEpository.findById(id);
		}
		catch(Exception e) {System.out.println(e);}
		
		return emp;
	}
	
	// Adding the new employee
	public Employee AddEmployee(Employee emp)
	{
		Employee obj = new Employee();
		obj = this.employeeEpository.save(emp);
		return obj;
	}
	
	// delete employee
	public void deleteEmployee(int id)
	{
		this.employeeEpository.deleteById(id);
	}

	
	// update employee 
	public void updateEmployee(Employee emp,int id)
	{
		emp.setId(id);
		this.employeeEpository.save(emp);
	}
	
	
	
	
	
	
}

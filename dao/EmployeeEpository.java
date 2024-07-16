package com.api.test.dao;

import org.springframework.data.repository.CrudRepository;
import com.api.test.entity.*;

public interface EmployeeEpository extends CrudRepository<Employee, Integer> 
{
	public Employee findById(int id);
}

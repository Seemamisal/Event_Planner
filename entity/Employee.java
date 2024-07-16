package com.api.test.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class Employee 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="empId")
	private int id;
	
	private String name;
	private String position;
	private int salary;
	
	@OneToOne(cascade=CascadeType.ALL)
	@JsonManagedReference
	private Company company;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary(int salary) {
		this.salary = salary;
	}

	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", name=" + name + ", position=" + position + ", salary=" + salary + ", company="
				+ company + "]";
	}

	public Employee( String name, String position, int salary, Company company) {
		super();
		this.name = name;
		this.position = position;
		this.salary = salary;
		this.company = company;
	}

	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

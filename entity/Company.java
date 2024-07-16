package com.api.test.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Company 
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="comId")
	private int id;
	
	@OneToOne(mappedBy="company")
	@JsonBackReference
	private Employee employee;
	
	private String sector;
	private int revenue;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSector() {
		return sector;
	}
	public void setSector(String sector) {
		this.sector = sector;
	}
	public int getRevenue() {
		return revenue;
	}
	public void setRevenue(int revenue) {
		this.revenue = revenue;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	
	@Override
	public String toString() {
		return "Company [id=" + id + ", sector=" + sector + ", revenue=" + revenue + "]";
	}
	
	public Company(String sector, int revenue) {
		super();
		this.sector = sector;
		this.revenue = revenue;
	}
	
	public Company() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	
	
}

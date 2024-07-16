package com.api.test.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="Vendor")
public class Vendor 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="VND_id")
	private int id;
	
	@Column(name="VND_name")
	private String name;
	
	@Column(name="VND_contactNo")
	private String contactNo;

	@Column(name="VND_address")
	private String address;

	@Column(name="vnd_gstn")
	private String gstn;
	
	@OneToMany(cascade=CascadeType.ALL)
	private List<Item> item;

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

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getGstn() {
		return gstn;
	}

	public void setGstn(String gstn) {
		this.gstn = gstn;
	}

	public List<Item> getItem() {
		return item;
	}

	public void setItem(List<Item> item) {
		this.item = item;
	}
	
	
}

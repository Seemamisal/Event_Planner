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
@Table(name="Quotation")
public class Quotation 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="Quot_id")
	private int id;

	@Column(name="Quot_name")
	private String name;
	
	@Column(name="Quot_date")
	private String date;
	
	@Column(name="Quot_no")
	private String contactNo;
	
	@Column(name="Quot_address")
	private String address;

	@Column(name="Quot_mail")
	private String mail;
	
	@Column(name="Quot_gstn")
	private String gstn;
	
	@Column(name="Quot_time")
	private String time;

	@Column(name="Quot_venue")
	private String venue;

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
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
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
	public String getMail() {
		return mail;
	}
	public void setMail(String mail) {
		this.mail = mail;
	}
	public String getGstn() {
		return gstn;
	}
	public void setGstn(String gstn) {
		this.gstn = gstn;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getVenue() {
		return venue;
	}
	public void setVenue(String venue) {
		this.venue = venue;
	}
	public List<Item> getItem() {
		return item;
	}
	public void setItem(List<Item> item) {
		this.item = item;
	}
}

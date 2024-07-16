package com.api.test.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Item")
public class Item 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="ITM_id")
	private int id;
	
	@Column(name="ITM_name")
	private String name;
	
	@Column(name="ITM_quanity")
	private int quantity;
	
	@Column(name="ITM_price")
	private int price;
	
	@Column(name="ITM_totalAMT")
	private int total_AMT;
	
	@Column(name="ITM_payableAMT")
	private int payable_AMT;
	
	@Column(name="ITM_misc")
	private String misc;

	
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

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getTotal_AMT() {
		return total_AMT;
	}

	public void setTotal_AMT(int total_AMT) {
		this.total_AMT = total_AMT;
	}

	public int getPayable_AMT() {
		return payable_AMT;
	}

	public void setPayable_AMT(int payable_AMT) {
		this.payable_AMT = payable_AMT;
	}

	public String getMisc() {
		return misc;
	}

	public void setMisc(String misc) {
		this.misc = misc;
	}
	
}

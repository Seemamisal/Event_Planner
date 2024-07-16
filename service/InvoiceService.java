package com.api.test.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.api.test.entity.*;
import com.api.test.dao.*;

import java.util.*;


@Component
public class InvoiceService 
{
	@Autowired
	private InvoiceRepository invoiceRepository;
	
	// get all employees
	public List<Invoice> getAllInvoiceList()
	{
		List<Invoice> list = (List<Invoice>) this.invoiceRepository.findAll();
		return list;
	}
	
	// get single employee by id
	public Invoice getInvoiceById(int id)
	{
		Invoice inc=null;
		try
		{
			inc = this.invoiceRepository.findById(id);
		}
		catch(Exception e) {System.out.println(e);}
		
		return inc;
	}
	
	// Adding the new employee
	public Invoice AddInvoice(Invoice invoice)
	{
		Invoice inc = new Invoice();
		inc = this.invoiceRepository.save(invoice);
		return inc;
	}
	
	// delete employee
	public void deleteInvoice(int id)
	{
		this.invoiceRepository.deleteById(id);
	}

	
	// update employee 
	public void updateInvoice(Invoice inc,int id)
	{
		inc.setId(id);
		this.invoiceRepository.save(inc);
	}
	

}

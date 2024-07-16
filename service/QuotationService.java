package com.api.test.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.api.test.dao.QuotationRepository;
import com.api.test.entity.Quotation;

@Component
public class QuotationService 
{
	@Autowired
	private QuotationRepository quotationRepository;
	
	// get all employees
	public List<Quotation> getAllQuotationList()
	{
		List<Quotation> list = (List<Quotation>) this.quotationRepository.findAll();
		return list;
	}
	
	// get single employee by id
	public Quotation getQuotationById(int id)
	{
		Quotation quo=null;
		try
		{
			quo = this.quotationRepository.findById(id);
		}
		catch(Exception e) {System.out.println(e);}
		
		return quo;
	}
	
	// Adding the new quotation
	public Quotation AddQuotation(Quotation quotation)
	{
		Quotation quo = new Quotation();
		quo = this.quotationRepository.save(quotation);
		return quo;
	}
	
	// delete employee
	public void deleteQuotation(int id)
	{
		this.quotationRepository.deleteById(id);
	}

	
	// update employee 
	public void updateQuotation(Quotation quo,int id)
	{
		quo.setId(id);
		this.quotationRepository.save(quo);
	}
}

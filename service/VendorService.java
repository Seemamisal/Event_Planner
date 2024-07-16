package com.api.test.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.api.test.dao.VendorRepository;
import com.api.test.entity.Vendor;

@Component
public class VendorService 
{
	
	@Autowired
	private VendorRepository vendorRepository;
	
	// get all employees
	public List<Vendor> getAllIVendorList()
	{
		List<Vendor> list = (List<Vendor>) this.vendorRepository.findAll();
		return list;
	}
	
	// get single employee by id
	public Vendor getVendorById(int id)
	{
		Vendor vnd=null;
		try
		{
			vnd = this.vendorRepository.findById(id);
		}
		catch(Exception e) {System.out.println(e);}
		
		return vnd;
	}
	
	// Adding the new employee
	public Vendor AddVendor(Vendor vendor)
	{
		Vendor vnd = new Vendor();
		vnd = this.vendorRepository.save(vendor);
		return vnd;
	}
	
	// delete employee
	public void deleteVendor(int id)
	{
		this.vendorRepository.deleteById(id);
	}

	
	// update employee 
	public void updateVendor(Vendor vendor, int vnid)
	{
		vendor.setId(vnid);
		this.vendorRepository.save(vendor);
	}
}

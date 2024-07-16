package com.api.test.dao;

import org.springframework.data.repository.CrudRepository;

import com.api.test.entity.Vendor;

public interface VendorRepository extends CrudRepository<Vendor, Integer>
{
	public Vendor findById(int id);
}



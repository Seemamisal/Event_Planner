package com.api.test.dao;

import org.springframework.data.repository.CrudRepository;

import com.api.test.entity.Quotation;

public interface QuotationRepository extends CrudRepository<Quotation, Integer>
{
	public Quotation findById(int id);
}
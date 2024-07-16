package com.api.test.dao;

import org.springframework.data.repository.CrudRepository;

import com.api.test.entity.Invoice;

public interface InvoiceRepository extends CrudRepository<Invoice, Integer>
{
	public Invoice findById(int id);
}

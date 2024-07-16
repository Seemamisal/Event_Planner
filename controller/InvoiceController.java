package com.api.test.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.test.service.InvoiceService;
import com.api.test.entity.*;

@RestController
public class InvoiceController 
{
	@Autowired
	private InvoiceService invoiceService;
	
	@GetMapping("/invoice")
	public ResponseEntity<List<Invoice>> getAllInvoices()
	{
		List<Invoice> list = invoiceService.getAllInvoiceList();
		
		if(list.size()<=0)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(list);
	}
	
	@PostMapping("/invoice")
	public ResponseEntity<Invoice> addInvoice(@RequestBody Invoice invoice)
	{
		Invoice inc = null;
		try
		{
			inc = this.invoiceService.AddInvoice(invoice);
			return  ResponseEntity.of(Optional.of(inc));
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("/invoice/{incId}")
	public ResponseEntity<Invoice> getInvoice(@PathVariable("incId")int incId)
	{
		Invoice inc = this.invoiceService.getInvoiceById(incId);
		if(inc==null)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.of(Optional.of(inc));
	}
	
	
	@DeleteMapping("/invoice/{incId}")
	public ResponseEntity<Void> deleteInvoice(@PathVariable("incId")int incId)
	{
		try
		{
			this.invoiceService.deleteInvoice(incId);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PutMapping("/invoice/{incId}")
	public ResponseEntity<Invoice> updateInvoice(@RequestBody Invoice invoice, @PathVariable("incId") int incId)
	{
		try
		{
			this.invoiceService.updateInvoice(invoice, incId);
			return ResponseEntity.ok().body(invoice);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
}

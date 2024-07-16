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

import com.api.test.entity.Quotation;
import com.api.test.service.QuotationService;

@RestController
public class QuotationController 
{		
	@Autowired
	private QuotationService quotationService;
	
	@GetMapping("/quotation")
	public ResponseEntity<List<Quotation>> getAllQuotations()
	{
		List<Quotation> list = quotationService.getAllQuotationList();
		
		if(list.size()<=0)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(list);
	}
	
	@PostMapping("/quotation")
	public ResponseEntity<Quotation> addQuotation(@RequestBody Quotation quotation)
	{
		Quotation quo = null;
		try
		{
			quo = this.quotationService.AddQuotation(quotation);
			return  ResponseEntity.of(Optional.of(quo));
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("/quotation/{quoId}")
	public ResponseEntity<Quotation> getQuotation(@PathVariable("quoId")int quoId)
	{
		Quotation quo = this.quotationService.getQuotationById(quoId);
		if(quo==null)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.of(Optional.of(quo));
	}
	
	
	@DeleteMapping("/quotation/{quoId}")
	public ResponseEntity<Void> deleteQuotation(@PathVariable("quoId")int quoId)
	{
		try
		{
			this.quotationService.deleteQuotation(quoId);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PutMapping("/quotation/{quoId}")
	public ResponseEntity<Quotation> updateQuotation(@RequestBody Quotation quotation, @PathVariable("quoId") int quoId)
	{
		try
		{
			this.quotationService.updateQuotation(quotation, quoId);
			return ResponseEntity.ok().body(quotation);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}

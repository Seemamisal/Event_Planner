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

import com.api.test.entity.Vendor;
import com.api.test.service.VendorService;

@RestController
public class VendorController 
{
	@Autowired
	private VendorService vendorService;
	
	@GetMapping("/vendor")
	public ResponseEntity<List<Vendor>> getAllVendors()
	{
		List<Vendor> list = vendorService.getAllIVendorList();
		
		if(list.size()<=0)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(list);
	}
	
	@PostMapping("/vendor")
	public ResponseEntity<Vendor> addVendor(@RequestBody Vendor vendor)
	{
		Vendor vnd = null;
		try
		{
			vnd = this.vendorService.AddVendor(vendor);
			return  ResponseEntity.of(Optional.of(vnd));
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@GetMapping("/vendor/{vndId}")
	public ResponseEntity<Vendor> getVendor(@PathVariable("vndId")int vndId)
	{
		Vendor vnd = this.vendorService.getVendorById(vndId);
		if(vnd==null)
		{
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		return ResponseEntity.of(Optional.of(vnd));
	}
	
	
	@DeleteMapping("/vendor/{vndId}")
	public ResponseEntity<Void> deleteVendor(@PathVariable("vndId")int vndId)
	{
		try
		{
			this.vendorService.deleteVendor(vndId);
			return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	@PutMapping("/vendor/{vndId}")
	public ResponseEntity<Vendor> updateVendor(@RequestBody Vendor vendor, @PathVariable("vndId") int vndId)
	{
		try
		{
			this.vendorService.updateVendor(vendor, vndId);
			return ResponseEntity.ok().body(vendor);
		}
		catch(Exception e)
		{
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}

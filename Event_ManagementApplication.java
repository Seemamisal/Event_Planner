package com.api.test;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Event_ManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(Event_ManagementApplication.class, args);
		
		System.out.println("\n*Note:- While doing delete and update operations. Id of table need to be provide *\n");
	}

}

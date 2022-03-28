package dev.pomyharry.stocksimulator.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.service.CustomerService;

@CrossOrigin(origins = "*")
@RestController
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @RequestMapping("/login")
    @PostMapping
    public ResponseEntity<?> login(@RequestBody(required = true) CustomerDTO customer) {

        try {
            CustomerDTO c = customerService.login(customer);
            return ResponseEntity.ok().body(c);
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @RequestMapping("/join")
    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody(required = true) CustomerDTO customer) {

        try {
            Customer c = customerService
                    .create(new Customer(customer.getName(), customer.getEmail(), customer.getPassword()));
            return ResponseEntity.ok().body(c);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

}

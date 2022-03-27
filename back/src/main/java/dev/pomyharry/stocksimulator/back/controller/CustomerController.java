package dev.pomyharry.stocksimulator.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.service.CustomerService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/login")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping
    public ResponseEntity<?> login(@RequestBody(required = true) CustomerDTO customer) {
        try {
            CustomerDTO c = customerService.findId(customer.getEmail(), customer.getPassword());
            return ResponseEntity.ok().body(c);
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

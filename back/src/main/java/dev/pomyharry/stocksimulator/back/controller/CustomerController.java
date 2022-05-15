package dev.pomyharry.stocksimulator.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.service.AccountService;
import dev.pomyharry.stocksimulator.back.service.CustomerService;
import dev.pomyharry.stocksimulator.back.service.WatchStockService;

@CrossOrigin(origins = "*")
@RestController
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private WatchStockService watchStockService;

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
            System.out.println(e.getMessage());
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
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/info/customer")
    public ResponseEntity<?> getCustomerInfo(@RequestBody(required = true) CustomerDTO customer) {
        try {
            Customer c = customerService.findById(customer.getId());
            // return ResponseEntity.ok().body(new CustomerDTO(c.getName(), c.getEmail(),
            // c.getPassword()));
            return ResponseEntity.ok().body(CustomerDTO.builder()
                    .name(c.getName())
                    .email(c.getEmail())
                    .password(c.getPassword())
                    .build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/info/customer")
    public ResponseEntity<?> updateCustomerInfo(@RequestBody(required = true) CustomerDTO customer) {
        try {
            customerService.updateCustomerInfo(customer);
            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/info/customer")
    public ResponseEntity<?> deleteCustomerInfo(@RequestBody(required = true) CustomerDTO customer) {
        try {
            Customer c = customerService.findById(customer.getId());

            accountService.deleteAllAccount(c);
            watchStockService.deleteAllWatchList(c);

            customerService.deleteCustomerInfO(customer);

            return ResponseEntity.ok().body("success");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

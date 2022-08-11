package dev.pomyharry.stocksimulator.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private PasswordEncoder passwordEncoder;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @RequestMapping("/auth/login")
    @PostMapping
    public ResponseEntity<?> login(@RequestBody(required = true) CustomerDTO customer) {

        try {
            CustomerDTO c = customerService.login(customer, passwordEncoder);

            return ResponseEntity.ok().body(c);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @RequestMapping("/auth/join")
    @PostMapping
    public ResponseEntity<?> createCustomer(@RequestBody(required = true) CustomerDTO customer) {

        try {
            CustomerDTO c = customerService
                    .create(customer, passwordEncoder);
            return ResponseEntity.ok().body(c);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/info/customer")
    public ResponseEntity<?> getCustomerInfo(@AuthenticationPrincipal String customerId) {
        try {
            Customer c = customerService.findById(customerId);

            return ResponseEntity.ok().body(CustomerDTO.builder()
                    .name(c.getName())
                    .email(c.getEmail())
                    .build());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/info/customer")
    public ResponseEntity<?> updateCustomerInfo(@AuthenticationPrincipal String customerId, @RequestBody(required = true) CustomerDTO customer) {
        try {
            //customerService.updateCustomerInfo(customer);
            customerService.updateCustomerInfo(CustomerDTO.builder().id(customerId).name(customer.getName()).build());
            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/info/customer")
    public ResponseEntity<?> deleteCustomerInfo(@AuthenticationPrincipal String customerId, @RequestBody(required = true) CustomerDTO customer) {
        try {
            Customer c = customerService.findById(customerId);

            accountService.deleteAllAccount(c);
            watchStockService.deleteAllWatchList(c);

            customerService.deleteCustomerInfO(customerId);

            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

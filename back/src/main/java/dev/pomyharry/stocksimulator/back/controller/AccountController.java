package dev.pomyharry.stocksimulator.back.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.model.dto.AccountDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Account;
import dev.pomyharry.stocksimulator.back.service.AccountService;

@CrossOrigin(origins = "*")
@RestController
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping()
    public ResponseEntity<?> insertAccount(@RequestBody AccountDTO accountDTO) {

        try {
            accountService.insertAccount(accountDTO);
            return ResponseEntity.ok().body(accountDTO);
        } catch(Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        
    }

    @RequestMapping("/info/account")
    @PostMapping
    public ResponseEntity<?> getAccountInfo(@RequestBody(required = true) AccountDTO account) {
        System.out.println(account + "getCustomerId");
        Account acc = accountService.findByCustomerId(account);

        if (acc == null) {
            return ResponseEntity.ok().body(new AccountDTO());
        } else {
            return ResponseEntity.ok().body(new AccountDTO(acc.getId(), acc.getName(), acc.getDeposit()));
        }
    }

    @PutMapping("/info/account")
    public ResponseEntity<?> updateAccount(@RequestBody(required = true) AccountDTO account) {
        try {
            accountService.updateAccount(account);
            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/info/account")
    public ResponseEntity<?> deleteAccount(@RequestBody(required = true) AccountDTO account) {
        try {
            accountService.deleteAccount(account);
            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import dev.pomyharry.stocksimulator.back.model.dto.AccountDTO;
import dev.pomyharry.stocksimulator.back.model.dto.MyStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Account;
import dev.pomyharry.stocksimulator.back.service.AccountService;
import dev.pomyharry.stocksimulator.back.service.MyStockService;

@CrossOrigin(origins = "*")
@RestController
public class AccountController {

    private final AccountService accountService;
    private final MyStockService myStockService;

    public AccountController(AccountService accountService, MyStockService myStockService) {
        this.accountService = accountService;
        this.myStockService = myStockService;
    }

    @RequestMapping("account")
    @PostMapping
    public ResponseEntity<?> insertAccount(@AuthenticationPrincipal String customerId, @RequestBody(required = true) AccountDTO accountDTO) {
        try {
            accountService.insertAccount(customerId, accountDTO);
            return ResponseEntity.ok().body(accountDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/info/account")
    public ResponseEntity<?> getAccountInfo(@AuthenticationPrincipal String customerId) {

        Account acc = accountService.findByCustomerId(customerId);
        List<MyStockDTO> mystock = myStockService.findAllMyStockByCustomerId(customerId);
        long sumTotalNowPrice = 0;
        for (MyStockDTO myStockDTO : mystock) {
            sumTotalNowPrice += myStockDTO.getNowPrice() * myStockDTO.getAmount();
        }

        if (acc == null) {
            return ResponseEntity.ok().body(new AccountDTO());
        } else {

            return ResponseEntity.ok().body(AccountDTO.builder()
                    .id(acc.getId())
                    .name(acc.getName())
                    .deposit(acc.getDeposit())
                    .sumTotalNowPrice(sumTotalNowPrice)
                    .build());
        }
    }

    @PutMapping("/info/account")
    public ResponseEntity<?> updateAccount(@AuthenticationPrincipal String customerId, @RequestBody(required = true) AccountDTO account) {
        try {
            accountService.updateAccount(customerId, account);
            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/info/account")
    public ResponseEntity<?> deleteAccount(@AuthenticationPrincipal String customerId, @RequestBody(required = true) AccountDTO account) {
        try {
            accountService.deleteAccount(customerId, account);
            return ResponseEntity.ok().body("성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}

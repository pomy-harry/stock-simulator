package dev.pomyharry.stocksimulator.back.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<?> insertAccount(@RequestBody AccountDTO accountDTO) {
        System.out.println(accountDTO);

        try {
            accountService.insertAccount(accountDTO);
            return ResponseEntity.ok().body(accountDTO);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("/info/account")
    public ResponseEntity<?> getAccountInfo(@RequestBody(required = true) AccountDTO account) {

        Account acc = accountService.findByCustomerId(account);
        List<MyStockDTO> mystock = myStockService.findAllMyStockByCustomerId(account.getCustomerId());
        long sumTotalNowPrice = 0;
        for (MyStockDTO myStockDTO : mystock) {
            sumTotalNowPrice += myStockDTO.getNowPrice() * myStockDTO.getAmount();
        }

        System.out.println(acc);

        if (acc == null) {
            return ResponseEntity.ok().body(new AccountDTO());
        } else {
            // return ResponseEntity.ok()
            // .body(new AccountDTO(acc.getId(), acc.getName(), acc.getDeposit(),
            // sumTotalNowPrice));

            return ResponseEntity.ok().body(AccountDTO.builder()
                    .id(acc.getId())
                    .name(acc.getName())
                    .deposit(acc.getDeposit())
                    .sumTotalNowPrice(sumTotalNowPrice)
                    .build());
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

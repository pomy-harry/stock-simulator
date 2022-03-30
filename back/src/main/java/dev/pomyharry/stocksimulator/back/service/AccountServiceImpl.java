package dev.pomyharry.stocksimulator.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.dto.AccountDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Account;
import dev.pomyharry.stocksimulator.back.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    CustomerService customerService;

    @Override
    public void insertAccount(AccountDTO accountDTO) {

        Account account = new Account();
        account.setName(accountDTO.getName());
        account.setDeposit(accountDTO.getDeposit());
        account.setCustomer(customerService.findById(accountDTO.getCustomerId()));

        accountRepository.save(account);
    }
}

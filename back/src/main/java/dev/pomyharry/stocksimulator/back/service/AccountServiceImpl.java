package dev.pomyharry.stocksimulator.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.dto.AccountDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Account;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    CustomerService customerService;

    @Autowired
    MyStockService myStockService;

    @Override
    public void insertAccount(AccountDTO accountDTO) {

        Account account = new Account();
        account.setName(accountDTO.getName());
        account.setDeposit(accountDTO.getDeposit());
        account.setSeedMoney(accountDTO.getSeedMoney());
        account.setCustomer(customerService.findById(accountDTO.getCustomerId()));

        accountRepository.save(account);
    }

    @Override
    public Account findByCustomerId(AccountDTO acc) {
        try {
            return accountRepository.findByCustomerId(acc.getCustomerId());
        } catch (Exception e) {
            System.out.println(e.getMessage() + " 오류입니다.");
        }
        return null;
    }

    @Override
    public Account updateAccount(AccountDTO acc) {
        Account account = accountRepository.getById(acc.getId());
        account.setName(acc.getName());

        return accountRepository.save(account);
    }

    @Override
    public void deleteAccount(AccountDTO acc) {
        myStockService.deleteByCustomerId(acc.getCustomerId());
        accountRepository.deleteById(acc.getId());
    }

    @Override
    public void deleteAllAccount(Customer customer) {
        myStockService.deleteAllByCustomer(customer);
        accountRepository.deleteAllByCustomer(customer);
    }
}

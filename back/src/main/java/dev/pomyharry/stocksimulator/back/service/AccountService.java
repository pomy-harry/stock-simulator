package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.AccountDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Account;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface AccountService {

    void insertAccount(AccountDTO accountDTO);

    Account findByCustomerId(AccountDTO acc);

    Account updateAccount(AccountDTO acc);

    void deleteAccount(AccountDTO acc);

    void deleteAllAccount(Customer customer);
}

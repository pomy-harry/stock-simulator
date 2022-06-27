package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.AccountDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Account;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface AccountService {

    void insertAccount(String customerId, AccountDTO accountDTO);

    Account findByCustomerId(String customerId);

    Account updateAccount(String customerId, AccountDTO acc);

    void deleteAccount(String custoemrId, AccountDTO acc);

    void deleteAllAccount(Customer customer);
}

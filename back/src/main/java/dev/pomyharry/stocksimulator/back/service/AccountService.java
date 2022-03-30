package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.AccountDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Account;

public interface AccountService {

    void insertAccount(AccountDTO accountDTO);

    Account findByCustomerId(AccountDTO acc);

    Account updateAccount(AccountDTO acc);

    void deleteAccount(AccountDTO acc);
}

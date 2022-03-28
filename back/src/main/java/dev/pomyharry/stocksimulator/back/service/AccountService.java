package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.AccountDTO;

public interface AccountService {
    
    void insertAccount(AccountDTO accountDTO);
}

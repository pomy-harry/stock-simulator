package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;

public interface CustomerService {
    CustomerDTO findId(String id, String pw);
}

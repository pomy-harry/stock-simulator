package dev.pomyharry.stocksimulator.back.service;

import java.util.List;

import dev.pomyharry.stocksimulator.back.model.dto.MyStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;

public interface MyStockService {

    void buyStock(String customerId, MyStockDTO myStockDTO);

    void sellStock(String customerId, MyStockDTO myStockDTO);

    List<MyStockDTO> findAllMyStockByCustomerId(String customerId);

    void deleteAllByCustomer(Customer customer);

    void deleteByCustomerId(String customerId);
}

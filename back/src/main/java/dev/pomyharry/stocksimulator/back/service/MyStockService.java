package dev.pomyharry.stocksimulator.back.service;

import java.util.List;

import dev.pomyharry.stocksimulator.back.model.dto.MyStockDTO;

public interface MyStockService {

    void buyStock(MyStockDTO myStockDTO);

    List<MyStockDTO> findAllMyStockByCustomerId(String customerId);
}

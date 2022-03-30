package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.MyStockDTO;

public interface MyStockService {
    
    void buyStock(MyStockDTO myStockDTO);
}

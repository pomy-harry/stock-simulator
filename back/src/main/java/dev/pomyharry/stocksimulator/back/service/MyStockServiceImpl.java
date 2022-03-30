package dev.pomyharry.stocksimulator.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.dto.MyStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.model.entity.MyStock;
import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.repository.CustomerRepository;
import dev.pomyharry.stocksimulator.back.repository.MyStockRepository;
import dev.pomyharry.stocksimulator.back.repository.StockRepository;

@Service
public class MyStockServiceImpl implements MyStockService {
    
    @Autowired
    MyStockRepository myStockRepository;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    StockRepository stockRepository;


    @Override
    public void buyStock(MyStockDTO myStockDTO) {
        
        MyStock myStock = new MyStock();

        myStock.setBuyPrice(myStockDTO.getBuyPrice());
        myStock.setAmount(myStockDTO.getAmount());

        Customer customer = customerRepository.getOne(myStockDTO.getCustomerId());
        myStock.setCustomer(customer);

        Stock stock = stockRepository.findByCode(myStockDTO.getStockCode());
        myStock.setStock(stock);

        myStockRepository.save(myStock);

    }
}

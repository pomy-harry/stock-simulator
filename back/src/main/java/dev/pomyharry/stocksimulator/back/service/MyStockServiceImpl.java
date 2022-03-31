package dev.pomyharry.stocksimulator.back.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.component.StockDataComponent;
import dev.pomyharry.stocksimulator.back.model.dto.MyStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.model.entity.MyStock;
import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
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

    @Autowired
    StockDataComponent stockChartComponent;

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

    @Override
    public List<MyStockDTO> findAllMyStockByCustomerId(String customerId) {
        List<MyStock> stocks = myStockRepository.findAllByCustomerId(customerId);

        List<MyStockDTO> myStockList = stocks.stream()
                .map(stock -> new MyStockDTO(stock.getBuyPrice(), stock.getAmount(), stock.getStock().getName(),
                        Long.parseLong(stockChartComponent.getStockChart(new WatchStock(stock.getStock())).getPrice()
                                .replace(",", ""))))
                .collect(Collectors.toList());

        return myStockList;
    }
}

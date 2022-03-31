package dev.pomyharry.stocksimulator.back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.exception.AccountNotFoundException;
import dev.pomyharry.stocksimulator.back.model.dto.MyStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Account;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.model.entity.MyStock;
import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import dev.pomyharry.stocksimulator.back.repository.AccountRepository;
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
    AccountRepository accountRepository;


    @Override
    public void buyStock(MyStockDTO myStockDTO) {
        
        // 계좌 찾기
        Account account = accountRepository.findByCustomerId(myStockDTO.getCustomerId());

        System.out.println(myStockDTO.getCustomerId());
        System.out.println(myStockDTO.getAmount());
        System.out.println(myStockDTO.getBuyPrice());
        System.out.println(myStockDTO.getStockCode());


        if (account == null) {
            throw new AccountNotFoundException("계좌가 존재하지 않습니다.");
        }

        // 보유 종목 찾기
        MyStock mystock = myStockRepository.findByCustomerIdAndStockCode(myStockDTO.getCustomerId(), myStockDTO.getStockCode());
        if (mystock == null) {
            MyStock changedMyStock = new MyStock(
                myStockDTO.getAmount(), 
                myStockDTO.getBuyPrice(), 
                customerRepository.getOne(myStockDTO.getCustomerId()), 
                stockRepository.getOne(myStockDTO.getStockCode())
            );
            myStockRepository.save(changedMyStock);
        } else {
            mystock.setAmount(mystock.getAmount() + myStockDTO.getAmount());
            mystock.setTotalBuyPrice(mystock.getTotalBuyPrice() + myStockDTO.getBuyPrice());
            myStockRepository.save(mystock);
        }

        account.setDeposit(account.getDeposit() - myStockDTO.getBuyPrice());
        accountRepository.save(account);
    }
}

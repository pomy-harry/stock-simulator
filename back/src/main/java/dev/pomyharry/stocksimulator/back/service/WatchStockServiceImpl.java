package dev.pomyharry.stocksimulator.back.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.model.dto.WatchStockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.model.entity.Customer;
import dev.pomyharry.stocksimulator.back.repository.WatchStockRepository;
import dev.pomyharry.stocksimulator.back.exception.DuplicationException;

@Service
public class WatchStockServiceImpl implements WatchStockService {

    @Autowired
    WatchStockRepository watchStockRepository;

    @Override
    public WatchStock createWatchList(WatchStock stock) {
        WatchStock watch = watchStockRepository.findByStockAndCustomer(stock.getStock(), stock.getCustomer());

        if (watch != null) {
            throw new DuplicationException("이미 등록된 관심종목입니다.");
        }
        System.out.println(stock);
        return watchStockRepository.save(stock);
    }

    @Override
    public void deleteAllWatchList(Customer customer) {
        watchStockRepository.deleteAllByCustomer(customer);
    }

    @Override
    public List<WatchStockDTO> findAllWatchStockByCustomerId(String customerId) {

        List<WatchStock> watchStockList = watchStockRepository.findAllByCustomerId(customerId);
        // List<WatchStockDTO> watchStockDTOList = watchStockList.stream()
        // .map(r -> new WatchStockDTO(r,
        // r.getStock().getName())).collect(Collectors.toList());

        List<WatchStockDTO> watchStockDTOList = watchStockList.stream().map(r -> WatchStockDTO.builder()
                .index(r.getIndex())
                .code(r.getStock().getCode())
                .customerId(r.getCustomer().getId())
                .name(r.getStock().getName()).build()).collect(Collectors.toList());

        return watchStockDTOList;
    }

    @Override
    public void deleteByStockCode(String code) {
        watchStockRepository.deleteByStockCode(code);
    }

}

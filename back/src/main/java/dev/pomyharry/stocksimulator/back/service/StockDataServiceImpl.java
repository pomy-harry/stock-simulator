package dev.pomyharry.stocksimulator.back.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.component.StockDataComponent;
import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.repository.StockDataRepository;

@Service
public class StockDataServiceImpl implements StockDataService {

    @Autowired
    private StockDataRepository stockDataRepository;

    @Override
    public List<WatchStock> findAllStocks(CustomerDTO customerDto) {

        // Customer customer = new Customer(customerDto.getId(), customerDto.getName(),
        // customerDto.getEmail(),
        // customerDto.getPassword());

        // customerId 로 wathchlist에 있는 watchStocks(stockName, StockCode) 조회
        List<WatchStock> watchStocks = stockDataRepository.findAllByCustomerId(customerDto.getId());
        return watchStocks;

    }

    private final StockDataComponent stockChartComponent;

    public StockDataServiceImpl(StockDataComponent stockChartComponent) {
        this.stockChartComponent = stockChartComponent;
    }

    public List<StockDTO> getStockChart(List<WatchStock> watchStocks) {

        List<StockDTO> stockDataList = new ArrayList<StockDTO>();

        // watchStock에서 종목 코드와 종목 이름 추출해서 크롤링 데이터 DTO 형태로 반환
        for (WatchStock w : watchStocks) {
            stockDataList.add(stockChartComponent.getStockChart(w));
        }

        return stockDataList;
    }

}

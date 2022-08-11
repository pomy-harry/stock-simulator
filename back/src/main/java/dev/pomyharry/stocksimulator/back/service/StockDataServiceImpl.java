package dev.pomyharry.stocksimulator.back.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.pomyharry.stocksimulator.back.controller.component.StockDataComponent;
import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import dev.pomyharry.stocksimulator.back.model.dto.StockDTO;
import dev.pomyharry.stocksimulator.back.model.dto.StockDataDTO;
import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;
import dev.pomyharry.stocksimulator.back.model.entity.StockData;
import dev.pomyharry.stocksimulator.back.repository.StockDataRepository;
import dev.pomyharry.stocksimulator.back.repository.WatchStockRepository;

@Service
public class StockDataServiceImpl implements StockDataService {

    @Autowired
    private StockDataRepository stockDataRepository;

    @Autowired
    private WatchStockRepository watchStockRepository;

    @Override
    public List<WatchStock> findAllStocks(String customerId) {

        // Customer customer = new Customer(customerDto.getId(), customerDto.getName(),
        // customerDto.getEmail(),
        // customerDto.getPassword());

        // customerId 로 wathchlist에 있는 watchStocks(stockName, StockCode) 조회
        List<WatchStock> watchStocks = watchStockRepository.findAllByCustomerId(customerId);
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

    public List<StockDataDTO> getStockData(String code) {
        List<StockData> stockData = stockDataRepository.findAllByStockCode(code);
       
        List<StockDataDTO> myStockData = stockData.stream()
                .map(stockDatas -> StockDataDTO.builder()
                    .stockDataId(stockDatas.getStockDataId())
                    .tradeDate(stockDatas.getTradeDate())
                    .stockCode(stockDatas.getStockCode())
                    .highPrice(stockDatas.getHighPrice())
                    .lowPrice(stockDatas.getLowPrice())
                    .startPrice(stockDatas.getStartPrice())
                    .lastPrice(stockDatas.getLastPrice())
                    .tradeVolume(stockDatas.getTradeVolume())
                    .build())
            .collect(Collectors.toList());
        
        return myStockData;
    }

}

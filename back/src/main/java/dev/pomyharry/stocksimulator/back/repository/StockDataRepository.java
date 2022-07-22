package dev.pomyharry.stocksimulator.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.pomyharry.stocksimulator.back.model.entity.WatchStock;

// 메인화면에 차트, 현재가격 띄워줄 때 사용
public interface StockDataRepository extends JpaRepository<WatchStock, String> {
    // List<WatchStock> findAllByCustomer(Customer customer);

    List<WatchStock> findAllByCustomerId(String customer);

}

//select trade_date, stock_data_id, max(trade_date)
//from stock_data
//group by trade_date;
//select date_format(trade_date, '%Y-%m'), stock_code, stock_data_id, max(date_format(trade_date, '%d')), last_price
//        -> from stock_data
//        -> group by 1, 2;
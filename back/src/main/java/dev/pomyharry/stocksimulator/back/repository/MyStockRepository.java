package dev.pomyharry.stocksimulator.back.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.pomyharry.stocksimulator.back.model.entity.MyStock;

public interface MyStockRepository extends JpaRepository<MyStock, String> {
<<<<<<< HEAD

    MyStock findByCustomerIdAndStockCode(String id, String stockCode);
    
=======
    List<MyStock> findAllByCustomerId(String id);
>>>>>>> a70ddc57d2ae854fff8d302df9ff4ef1dbc67571
}

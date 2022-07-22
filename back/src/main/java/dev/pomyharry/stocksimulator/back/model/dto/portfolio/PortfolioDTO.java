package dev.pomyharry.stocksimulator.back.model.dto.portfolio;

import dev.pomyharry.stocksimulator.back.model.entity.Stock;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PortfolioDTO {

    private List<String> codes;
    private int startYear;
    private int endYear;
    private int month;
    private RebalancingTerm term;
    private long deposit;
    private List<Double> percentage;
    private List<Integer> stockPrices;
    private List<Integer> stockAmount;

}

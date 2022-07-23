package dev.pomyharry.stocksimulator.back.model.dto.backtest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BackTestDTO {

    private long startMoney;
    private long endMoney;
    private double cagr;
    private double stdev;
    private int bestYear;
    private int worstYear;
    private double mdd;
    private List<Balance> balances;
    private List<Fall> falls;
    private List<Profit> profits;
}

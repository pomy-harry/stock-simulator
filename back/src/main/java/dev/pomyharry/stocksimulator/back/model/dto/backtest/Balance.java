package dev.pomyharry.stocksimulator.back.model.dto.backtest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Balance {
    private String date;
    private long balance;
}

package dev.pomyharry.stocksimulator.back.model.dto.backtest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Balance {
    private LocalDate date;
    private long balance;
}

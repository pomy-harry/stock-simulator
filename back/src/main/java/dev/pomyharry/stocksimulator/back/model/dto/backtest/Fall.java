package dev.pomyharry.stocksimulator.back.model.dto.backtest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Fall {
    private int year;
    private int month;
    private int high;
    private int low;
    private double fall;
}

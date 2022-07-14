package dev.pomyharry.stocksimulator.back.model.dto.backtest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profit {
    private Date date;
    private double rate;
}

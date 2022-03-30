package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {

    private String id;
    private String name;
    private int deposit;
    private String customerId;

    public AccountDTO(String name, int deposit) {
        this.name = name;
        this.deposit = deposit;
    }
    
}

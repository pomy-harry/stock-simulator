package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AccountDTO {

    private String id;
    private String name;
    private long deposit;
    private long seedMoney;
    private String customerId;

    private long sumTotalNowPrice;

    @Override
    public String toString() {
        return "AccountDTO [customerId=" + customerId + ", deposit=" + deposit + ", id=" + id + ", name=" + name
                + ", seedMoney=" + seedMoney + "]";
    }

}

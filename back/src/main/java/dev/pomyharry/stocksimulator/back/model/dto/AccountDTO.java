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
    private long deposit;
    private long seedMoney;
    private String customerId;
    private long sumTotalNowPrice;

    public AccountDTO(String name, long deposit, long seedMoney, String customerId) {
        this.name = name;
        this.deposit = deposit;
        this.seedMoney = seedMoney;
        this.customerId = customerId;
    }

    public AccountDTO(String id, String name, long deposit) {
        this.id = id;
        this.name = name;
        this.deposit = deposit;        
    }

    public AccountDTO(String id, String name, long deposit, long sumTotalNowPrice) {
        this.id = id;
        this.name = name;
        this.deposit = deposit;
        this.sumTotalNowPrice = sumTotalNowPrice;     
    }

    public AccountDTO(String customerId){
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getDeposit() {
        return deposit;
    }

    public void setDeposit(long deposit) {
        this.deposit = deposit;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    @Override
    public String toString() {
        return "AccountDTO [customerId=" + customerId + ", deposit=" + deposit + ", id=" + id + ", name=" + name
                + ", seedMoney=" + seedMoney + "]";
    }
    
}

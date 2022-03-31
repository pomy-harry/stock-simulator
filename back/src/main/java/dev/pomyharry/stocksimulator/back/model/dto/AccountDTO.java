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
    private String customerId;

    public AccountDTO(String name, long deposit) {
        this.name = name;
        this.deposit = deposit;
    }

    public AccountDTO(String id, String name, long deposit) {
        this.id = id;
        this.name = name;
        this.deposit = deposit;
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
        return "AccountDTO [id = " + id + ", deposit=" + deposit + ", name=" + name + ", customer = " + customerId
                + "]";
    }
}

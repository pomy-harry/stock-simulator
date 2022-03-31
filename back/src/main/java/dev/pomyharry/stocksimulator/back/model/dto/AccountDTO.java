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

    public AccountDTO(String id, String name, int deposit) {
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

    public int getDeposit() {
        return deposit;
    }

    public void setDeposit(int deposit) {
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

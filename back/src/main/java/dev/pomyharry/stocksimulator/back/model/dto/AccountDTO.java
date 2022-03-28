package dev.pomyharry.stocksimulator.back.model.dto;

public class AccountDTO {

    private String name;
    private int deposit;

    
    public AccountDTO(String name, int deposit) {
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

    @Override
    public String toString() {
        return "AccountDTO [deposit=" + deposit + ", name=" + name + "]";
    }
    
    
    

}

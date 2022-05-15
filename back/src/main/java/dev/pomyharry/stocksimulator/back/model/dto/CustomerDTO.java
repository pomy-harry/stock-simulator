package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {

    private String id;

    private String name;

    private String email;

    private String password;

    public CustomerDTO(String name, String email, String pw) {
        this.name = name;
        this.email = email;
    }

    public CustomerDTO(String email, String pw) {
        this.email = email;
        this.password = pw;
    }

    public CustomerDTO(String id) {
        this.id = id;
    }

}

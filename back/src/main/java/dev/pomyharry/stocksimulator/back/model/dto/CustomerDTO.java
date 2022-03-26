package dev.pomyharry.stocksimulator.back.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {

    private Long id;

    private String name;

    private String email;

    private String password;

    public CustomerDTO(String email, String pw) {
        this.email = email;
        this.password = pw;
    }

}

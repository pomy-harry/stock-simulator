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

    private String token;

}

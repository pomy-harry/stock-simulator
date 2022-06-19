package dev.pomyharry.stocksimulator.back.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Kakao {
    
    @Id
    @Column(name = "KAKAO_ID")
    private String id;

    @Column(name = "KAKAO_NAME")
    private String name;

    @Column(name = "KAKAO_EMAIL")
    private String email;
}

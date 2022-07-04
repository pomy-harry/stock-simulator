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
    @GeneratedValue(generator = "kakao-uuid")
    @GenericGenerator(name = "kakao-uuid", strategy = "uuid")
    @Column(name = "kakao_id")
    private String id;

    @Column(name = "kakao_name")
    private String name;

    @Column(name = "kakao_email")
    private String email;
}

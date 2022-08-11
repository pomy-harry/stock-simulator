package dev.pomyharry.stocksimulator.back.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class OAuth {
    
    @Id
    @Column(name = "OAUTH_ID")
    private String id;

    @Column(name = "PLATFORM_TYPE")
    private String type;

    @ManyToOne
    @JoinColumn(name = "CUSTOMER_ID")
    private Customer customer;

}

package dev.pomyharry.stocksimulator.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.pomyharry.stocksimulator.back.model.entity.OAuth;

public interface OAuthRepository  extends JpaRepository<OAuth, String>{
    
    //OAuth findByEmail(String email);

    Optional<OAuth> findById(String id);

}

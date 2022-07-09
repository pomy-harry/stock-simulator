package dev.pomyharry.stocksimulator.back.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.pomyharry.stocksimulator.back.model.entity.Kakao;

public interface KakaoRepository  extends JpaRepository<Kakao, String>{
    
    Kakao findByEmail(String email);

}

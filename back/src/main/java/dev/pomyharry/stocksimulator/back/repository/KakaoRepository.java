package dev.pomyharry.stocksimulator.back.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.pomyharry.stocksimulator.back.model.dto.KakaoDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Kakao;

public interface KakaoRepository  extends JpaRepository<Kakao, String>{
    
    KakaoDTO findByEmail(Object email);

    Kakao findByEmail(String email);

    //Optional<Kakao> findById(String id);

}

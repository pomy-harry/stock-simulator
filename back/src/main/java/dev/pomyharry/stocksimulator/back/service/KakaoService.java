package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.KakaoDTO;
import dev.pomyharry.stocksimulator.back.model.entity.Kakao;

public interface KakaoService {

	KakaoDTO getUserInfo(String access_Token);

	Kakao findById(String id);

	String getAccessToken (String authorize_code);

	String getJWT(KakaoDTO kakao);
}
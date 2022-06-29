package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.KakaoDTO;

public interface KakaoService {

	KakaoDTO kakaoJoin(String access_Token);

	void kakaoLogin(String access_Token);

	String getAccessToken (String authorize_code);

	KakaoDTO getUserInfo(String access_Token);
}
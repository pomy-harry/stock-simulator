package dev.pomyharry.stocksimulator.back.service;

import java.net.MalformedURLException;

import dev.pomyharry.stocksimulator.back.model.dto.KakaoDTO;

public interface KakaoService {

	void kakaoJoin(String access_Token);

	KakaoDTO kakaoLogin(String access_Token); 

	String getAccessTokenForLogin (String authorize_code);

	String getAccessTokenForJoin (String authorize_code);

	KakaoDTO getUserInfo(String access_Token);

}
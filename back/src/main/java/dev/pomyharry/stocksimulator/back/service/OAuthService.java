package dev.pomyharry.stocksimulator.back.service;

import dev.pomyharry.stocksimulator.back.model.dto.OAuthDTO;

public interface OAuthService {

	OAuthDTO kakaoJoin(String access_Token);

	OAuthDTO kakaoLogin(String access_Token); 

	String getAccessTokenForLogin (String authorize_code);

	String getAccessTokenForJoin (String authorize_code);

	OAuthDTO getUserInfo(String access_Token);

	String getJWT(OAuthDTO kakao);

}
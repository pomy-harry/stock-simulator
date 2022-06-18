package dev.pomyharry.stocksimulator.back.controller;

import java.util.HashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dev.pomyharry.stocksimulator.back.service.KakaoService;

@CrossOrigin(origins = "*")
@RestController
public class KakaoController {

    @Autowried
	private final KakaoService kakaoService;

    public KakaoController(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }

    @RequestMapping("/kakaologin")
    @PostMapping
    public String kakaoLogin(@RequestParam(value = "code", required = false) String code) throws Exception {
		System.out.println("여기 출력" + code);

        String access_Token = kakaoService.getAccessToken(code);
		System.out.println("여기 토큰 : " + access_Token);
        HashMap<String, Object> userInfo = kakaoService.getUserInfo(access_Token);
        System.out.println("여기 이름 : " + userInfo.get("nickname"));
		System.out.println("여기 이메일 : " + userInfo.get("email"));

		return "member/testPage";
    }
    
}

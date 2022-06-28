package dev.pomyharry.stocksimulator.back.controller;

import dev.pomyharry.stocksimulator.back.model.dto.CustomerDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import dev.pomyharry.stocksimulator.back.model.dto.KakaoDTO;
import dev.pomyharry.stocksimulator.back.service.KakaoService;

@CrossOrigin(origins = "*")
@RestController
public class KakaoController {

    @Autowired
	private KakaoService kakaoService;

//    public KakaoController(KakaoService kakaoService) {
//        this.kakaoService = kakaoService;
//    }

    @RequestMapping("/kakaologin")
    @PostMapping
    public String kakaoLogin(@RequestParam(value = "code", required = true) String code, HttpServletResponse response) throws Exception {
        try {
            response.sendRedirect("http://localhost:3000/KakaoLogin/" + code);
            return "dd";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            // 에러페이지
            return "redirect:http://localhost:3000";
        }
    }

    @RequestMapping("/afterlogin")
    @PostMapping
    public ResponseEntity<?> afterlogin(@RequestParam(value = "code", required = true) String code, HttpServletResponse response) throws Exception {
        try {
            String access_Token = kakaoService.getAccessToken(code);
            KakaoDTO userInfo = kakaoService.getUserInfo(access_Token);
            //System.out.println("여기 userInfo : " + userInfo);
            String token = kakaoService.getJWT(userInfo);

            CustomerDTO customer = CustomerDTO.builder()
                    .token(token)
                    .build();

            return ResponseEntity.ok().body(customer);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            // 에러페이지
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}

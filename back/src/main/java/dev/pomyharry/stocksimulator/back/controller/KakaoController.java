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

@Slf4j
@CrossOrigin(origins = "*")
@RestController
public class KakaoController {

    @Autowired
	private KakaoService kakaoService;

    @RequestMapping("/kakaologin")
    @PostMapping
    public void kakaoLogin(@RequestParam(value = "code", required = true) String code, HttpServletResponse response) throws Exception {
        log.debug("==== /kakaologin ====");

        try {
            response.sendRedirect("http://localhost:3000/KakaoLogin/" + code);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @RequestMapping("/afterlogin")
    @PostMapping
    public ResponseEntity<?> afterlogin(@RequestParam(value = "code", required = true) String code, HttpServletResponse response) throws Exception {
        log.debug("==== /afterlogin ====");

        try {
            String access_Token = kakaoService.getAccessTokenForLogin(code);
            System.out.println("여기토큰: "+access_Token);
            KakaoDTO userInfo = kakaoService.kakaoLogin(access_Token);
            System.out.println("여기 userInfo: "+userInfo);

            String token = kakaoService.getJWT(userInfo);

            log.debug("token = " + token);

            CustomerDTO customer = CustomerDTO.builder()
                    .token(token)
                    .build();

            return ResponseEntity.ok().body(customer);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @RequestMapping("/kakaojoin")
    @PostMapping
    public void KakaoJoin(@RequestParam(value = "code", required = true) String code, HttpServletResponse response) throws Exception {
        log.debug("==== /kakaojoin ====");

        try {
            response.sendRedirect("http://localhost:3000/KakaoJoin/" + code);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @RequestMapping("/afterjoin")
    @PostMapping
    public ResponseEntity<?> afterjoin(@RequestParam(value = "code", required = true) String code, HttpServletResponse response) throws Exception {
        log.debug("==== /afterjoin ====");

        try {
            String access_Token = kakaoService.getAccessTokenForJoin(code);
            System.out.println("여기 access_Token: " + access_Token);
            KakaoDTO userInfo = kakaoService.getUserInfo(access_Token);
            System.out.println("여기 userInfo : " + userInfo);
            KakaoDTO user = kakaoService.kakaoJoin(access_Token);

            String token = kakaoService.getJWT(user);

            log.debug("token = " + token);

            CustomerDTO customer = CustomerDTO.builder()
                    .token(token)
                    .build();

            return ResponseEntity.ok().body(customer);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
}

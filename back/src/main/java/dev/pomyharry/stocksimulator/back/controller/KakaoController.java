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

import dev.pomyharry.stocksimulator.back.model.dto.OAuthDTO;
import dev.pomyharry.stocksimulator.back.service.OAuthService;

@Slf4j
@CrossOrigin(origins = "*")
@RestController
public class KakaoController {

    @Autowired
	private OAuthService oauthService;

    @RequestMapping("/kakaologin")
    @PostMapping
    public void kakaoLogin(@RequestParam(value = "code", required = true) String code, HttpServletResponse response) throws Exception {

        try {
            response.sendRedirect("http://localhost:3000/KakaoLogin/" + code);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @RequestMapping("/afterlogin")
    @PostMapping
    public ResponseEntity<?> afterlogin(@RequestParam(value = "code", required = true) String code, HttpServletResponse response) throws Exception {

        try {
            String access_Token = oauthService.getAccessTokenForLogin(code);
            OAuthDTO userInfo = oauthService.kakaoLogin(access_Token);

            String token = oauthService.getJWT(userInfo);

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

        try {
            response.sendRedirect("http://localhost:3000/KakaoJoin/" + code);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    @RequestMapping("/afterjoin")
    @PostMapping
    public ResponseEntity<?> afterjoin(@RequestParam(value = "code", required = true) String code, HttpServletResponse response) throws Exception {

        try {
            String access_Token = oauthService.getAccessTokenForJoin(code);
            OAuthDTO userInfo = oauthService.getUserInfo(access_Token);
            OAuthDTO user = oauthService.kakaoJoin(access_Token);

            String token = oauthService.getJWT(user);

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

package dev.pomyharry.stocksimulator.back;

import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JWTTest {
    final String key = "jsonwebtoken";

    @Test
    void jwt() throws UnsupportedEncodingException {
        JWTTest jwt = new JWTTest();

        String token = jwt.createToken();
        System.out.println(token);

        String claim = jwt.verifyJWT(token);
        System.out.println(claim);
    }

    public String createToken() {
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("Alg", "HS256");

        Map<String, Object> payloads = new HashMap<>();
        payloads.put("data", "JWT Test");

        Long expiredTime = 1000 * 60L * 60L * 24L;

        Date ext = new Date();
        ext.setTime(ext.getTime() + expiredTime);

        String jwt = Jwts.builder()
                .setHeader(headers)
                .setClaims(payloads)
                .setSubject("user")
                .setIssuer("pomyharry")
                .setIssuedAt(new Date())
                .setExpiration(ext)
                .signWith(SignatureAlgorithm.HS256, key.getBytes())
                .compact();

        return jwt;
    }

    public String verifyJWT(String token) throws UnsupportedEncodingException {
        Claims claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(key.getBytes("UTF-8"))
                    .parseClaimsJws(token)
                    .getBody();

        } catch (ExpiredJwtException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return claims.getSubject();
    }
}

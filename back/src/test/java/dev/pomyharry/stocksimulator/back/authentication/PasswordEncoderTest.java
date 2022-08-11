package dev.pomyharry.stocksimulator.back.authentication;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;

@SpringBootTest
public class PasswordEncoderTest {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @DisplayName("패스워드 암호화")
    void passwordEncode() {
        String pw = "1234!@AB";
        String encodedPw = passwordEncoder.encode(pw);

        assertTrue(passwordEncoder.matches(pw, encodedPw));
    }

}

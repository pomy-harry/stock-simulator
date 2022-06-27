package dev.pomyharry.stocksimulator.back.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import dev.pomyharry.stocksimulator.back.security.JwtAuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.cors().and() // cors 기본 설정
                .csrf().disable() // csrf 사용 안 함
                .httpBasic().disable() // token 인증 사용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // session 사용하지 않고
                                                                                            // stateless하게 사용
                .and()
                .authorizeRequests().antMatchers("/", "/auth/**", "/market-info").permitAll() // 해당 url로 들어오는 경우는 인증 안해도 됨
                .anyRequest().authenticated(); // 나머지 주소는 다 인증 필요함

        http.addFilterAfter(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }
}

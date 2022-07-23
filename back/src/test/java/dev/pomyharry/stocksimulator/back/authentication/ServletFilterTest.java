package dev.pomyharry.stocksimulator.back.authentication;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

//import dev.pomyharry.stocksimulator.back.security.TokenProvider;

@Component
public class ServletFilterTest extends HttpFilter {
    // private TokenProvider tokenManager;

    @Override
    protected void doFilter(HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws IOException, ServletException {
        try {
            final String token = parseBearerToken(request);

            if (token != null && !token.equalsIgnoreCase("null")) {
                // String customerId = tokenManager.verifyJWT(token);

                filterChain.doFilter(request, response);
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        }
    }

    private String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}

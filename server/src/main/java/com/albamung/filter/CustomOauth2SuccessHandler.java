package com.albamung.filter;

import com.albamung.helper.jwt.JwtTokenProvider;
import com.albamung.oauth.PrincipalDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class CustomOauth2SuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    private final JwtTokenProvider jwtTokenProvider;

    public CustomOauth2SuccessHandler(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        System.out.println("successfulAuthentication");

        String access = jwtTokenProvider.createToken(principal.getId(), principal.getUsername(), principal.getAuthorities());
        String refresh = jwtTokenProvider.createRefreshToken();
//        principal.getUser().setRefreshToken(refresh);

        Cookie accessCookie = new Cookie("access",access);
        // expires in 7 days
        accessCookie.setMaxAge(7 * 24 * 60 * 60);
        // optional properties
        accessCookie.setSecure(true);
        accessCookie.setHttpOnly(true);
        accessCookie.setPath("/");
        response.addCookie(accessCookie);

        Cookie refreshCookie = new Cookie("refresh",refresh);
        // expires in 7 days
        refreshCookie.setMaxAge(7 * 24 * 60 * 60);
        // optional properties
        refreshCookie.setSecure(true);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        response.addCookie(refreshCookie);

        clearAuthenticationAttributes(request);
//        getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/redirect?access=" + access);
        getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/" + access);
    }
}
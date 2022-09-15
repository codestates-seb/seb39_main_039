package com.albamung.oauth;

import com.albamung.helper.jwt.JwtTokenProvider;
import org.springframework.http.ResponseCookie;
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
        String access = jwtTokenProvider.createToken(principal.getId(), principal.getUsername(), principal.getAuthorities());
        String refresh = jwtTokenProvider.createRefreshToken();
        System.out.println(request.getAttribute("client-redirect-uri"));


        ResponseCookie accessLocal = ResponseCookie.from("access", access).sameSite("none").maxAge(7 * 24 * 60 * 60).domain("localhost").secure(true).build();
        ResponseCookie refreshLocal = ResponseCookie.from("refresh", access).sameSite("none").maxAge(7 * 24 * 60 * 60).domain("localhost").secure(true).build();
        response.addHeader("set-cookie", accessLocal.toString());
        response.addHeader("set-cookie", refreshLocal.toString());

//
//        Cookie refreshLocal = new Cookie("refresh", refresh);
//        refreshLocal.setMaxAge(7 * 24 * 60 * 60);
//        refreshLocal.setSecure(true);
//        refreshLocal.setHttpOnly(true);
//        refreshLocal.setDomain("localhost");
//        refreshLocal.setPath("/");
//        response.addCookie(refreshLocal);

        Cookie accessDeploy = new Cookie("access", access);
        accessDeploy.setMaxAge(7 * 24 * 60 * 60);
        accessDeploy.setPath("/");
        accessDeploy.setDomain("albamung.tk");
        response.addCookie(accessDeploy);

        Cookie refreshDeploy = new Cookie("refresh", refresh);
        refreshDeploy.setMaxAge(7 * 24 * 60 * 60);
        refreshDeploy.setSecure(true);
        refreshDeploy.setHttpOnly(true);
        refreshDeploy.setDomain("albamung.tk");
        refreshDeploy.setPath("/");
        response.addCookie(refreshDeploy);

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, "https://albamung.tk/auth/redirect?access=" + access);
    }
}
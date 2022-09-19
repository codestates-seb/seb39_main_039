package com.albamung.filter;

import com.albamung.helper.jwt.JwtTokenProvider;
import com.albamung.oauth.PrincipalDetails;
import com.albamung.user.entity.User;
import com.albamung.user.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends AbstractAuthenticationProcessingFilter {
    private final AuthenticationManager authenticationManager;
    public final JwtTokenProvider jwtTokenProvider;
    public final UserRepository userRepository;
    public static final String SPRING_SECURITY_FORM_USERNAME_KEY = "username";

    public static final String SPRING_SECURITY_FORM_PASSWORD_KEY = "password";
    private String usernameParameter = SPRING_SECURITY_FORM_USERNAME_KEY;

    private String passwordParameter = SPRING_SECURITY_FORM_PASSWORD_KEY;


    private static final AntPathRequestMatcher DEFAULT_ANT_PATH_REQUEST_MATCHER = new AntPathRequestMatcher("/user/login",
            "POST");

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserRepository userRepository) {
        super(DEFAULT_ANT_PATH_REQUEST_MATCHER, authenticationManager);
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }
        try {
            System.out.println("attempt Login");
            ObjectMapper objectMapper = new ObjectMapper();
            User user = objectMapper.readValue(request.getInputStream(), User.class);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
            Authentication authentication = authenticationManager.authenticate(authenticationToken);
            return authentication;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        System.out.println("successfulAuthentication");
        PrincipalDetails userDetails = (PrincipalDetails) authResult.getPrincipal();

        String access = jwtTokenProvider.createToken(userDetails.getId(), userDetails.getUsername(), userDetails.getAuthorities());
        String refresh = jwtTokenProvider.createRefreshToken();
        userDetails.getUser().setRefreshToken(refresh);
//
//        ResponseCookie refreshCookie = ResponseCookie.from("refresh", refresh).maxAge(7 * 24 * 60 * 60).httpOnly(true).secure(true).path("/").domain("albamung.tk").build();
//        ResponseCookie accessCookie = ResponseCookie.from("access", access).maxAge(7 * 24 * 60 * 60).path("/").domain("albamung.tk").build();
//        ResponseCookie refreshCookieLocal = ResponseCookie.from("refresh", refresh).maxAge(7 * 24 * 60 * 60).httpOnly(true).secure(true).path("/").domain("localhost").sameSite("None").build();
//        ResponseCookie accessCookieLocal = ResponseCookie.from("access", access).maxAge(7 * 24 * 60 * 60).path("/").domain("localhost").sameSite("None").secure(true).build();


        response.addHeader("access", access);
        response.addHeader("refresh", refresh);
//        response.addHeader("set-cookie", refreshCookie.toString());
//        response.addHeader("set-cookie", accessCookie.toString());
//        response.addHeader("set-cookie", accessCookieLocal.toString());
//        response.addHeader("set-cookie", refreshCookieLocal.toString());
    }
}

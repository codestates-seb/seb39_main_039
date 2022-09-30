package com.albamung.config;


import com.albamung.oauth.CustomOauth2SuccessHandler;
import com.albamung.filter.JwtAuthenticationFilter;
import com.albamung.filter.JwtAuthorizationFilter;
import com.albamung.helper.jwt.JwtTokenProvider;
import com.albamung.oauth.PrincipalOauth2UserService;
import com.albamung.user.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsUtils;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    private final JwtTokenProvider jwtTokenProvider;
    private final PrincipalOauth2UserService principalOauth2UserService;
    private final UserRepository userRepository;
    private final CustomOauth2SuccessHandler customOauth2SuccessHandler;

    public SecurityConfig(JwtTokenProvider jwtTokenProvider, PrincipalOauth2UserService principalOauth2UserService, UserRepository userRepository, CustomOauth2SuccessHandler customOauth2SuccessHandler) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.principalOauth2UserService = principalOauth2UserService;
        this.userRepository = userRepository;
        this.customOauth2SuccessHandler = customOauth2SuccessHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic().disable()
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .formLogin().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .oauth2Login().loginPage("https://www.albamung.tk/login").successHandler(customOauth2SuccessHandler).userInfoEndpoint().userService(principalOauth2UserService).and()
                .and()
                .authorizeRequests().requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers("/swagger-ui/**").permitAll()
                .antMatchers("/user/signUp", "/user/login", "/user/refresh").permitAll()
                .antMatchers(HttpMethod.GET, "/wanted").permitAll()
                .anyRequest().hasAnyRole("USER", "ADMIN")
                .and()
                .apply(new CustomDsl())
                .and()
                .cors();
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("http://localhost:3000");
        configuration.addAllowedOriginPattern("https://*.albamung.tk");
        configuration.addAllowedOriginPattern("https://albamung.tk");
        configuration.setAllowCredentials(true);
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setMaxAge(3600L);
        configuration.addExposedHeader("access");
        configuration.addExposedHeader("refresh");
        configuration.addExposedHeader("set-cookie");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    public class CustomDsl extends AbstractHttpConfigurer<CustomDsl, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);
            builder
//                    .addFilterBefore(new JwtTokenFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
                    .addFilterBefore(new JwtAuthenticationFilter(authenticationManager, jwtTokenProvider, userRepository), UsernamePasswordAuthenticationFilter.class)
                    .addFilterBefore(new JwtAuthorizationFilter(authenticationManager, jwtTokenProvider), LogoutFilter.class);
        }
    }
}

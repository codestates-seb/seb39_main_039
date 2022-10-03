package com.albamung.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("http://localhost:3000")
                .allowedOriginPatterns("https://*.albamung.tk")
                .allowedOriginPatterns("https://albamung.tk")
                .allowedMethods("*")
                .allowCredentials(true);
    }
}

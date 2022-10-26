package com.albamung.webSocket;

import com.albamung.exception.CustomException;
import com.albamung.helper.jwt.JwtTokenProvider;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;

@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class FilterChannelInterceptor implements ChannelInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    public FilterChannelInterceptor(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
            String token = headerAccessor.getFirstNativeHeader("Authorization");

            if (token != null) {
                jwtTokenProvider.validateToken(token);
            }

            else{
                throw new CustomException("Expired or invalid JWT token", HttpStatus.UNAUTHORIZED);
            }
        }
        return message;
    }
}

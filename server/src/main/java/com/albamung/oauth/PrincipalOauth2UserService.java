package com.albamung.oauth;

import com.albamung.exception.CustomException;
import com.albamung.user.entity.ProviderType;
import com.albamung.user.entity.User;
import com.albamung.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;

    public PrincipalOauth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User loginUser = super.loadUser(userRequest);
        Map<String, Object> attributes = loginUser.getAttributes();
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());
        String providerId;
        switch (providerType) {
            case KAKAO:
                providerId = attributes.get("id").toString();
                break;
            case GOOGLE:
                providerId = attributes.get("sub").toString();
                break;
            default:
                throw new CustomException("잘못된 provider 입니다", HttpStatus.BAD_REQUEST);
        }
        Optional<User> user = userRepository.findByProviderAndProviderId(providerType.name(), providerId);

        return user.map(user1 -> new PrincipalDetails(user1, attributes)).orElseGet(() -> new PrincipalDetails(createUser(providerType, attributes)));
    }

    public User createUser(ProviderType providerType, Map<String, Object> attributes) {
        return userRepository.save(User.of(providerType, attributes));
    }
}
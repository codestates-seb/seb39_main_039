package com.albamung.oauth;

import com.albamung.user.entity.User;
import com.albamung.user.repository.UserRepository;
import org.springframework.data.annotation.Persistent;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.PersistenceUnit;
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
        String provider = userRequest.getClientRegistration().getClientId();
        Optional<User> user = userRepository.findByEmail(attributes.get("email").toString());
        return user.map(value -> new PrincipalDetails(value, attributes)).orElseGet(() -> new PrincipalDetails(userRepository.save(User.builder()
                .email(attributes.get("email").toString())
                .nickName(attributes.get("given_name").toString())
                .fullName(attributes.get("name").toString())
                .provider(provider)
                .providerId(attributes.get("sub").toString())
                .profileImage(attributes.get("picture").toString())
                .roles("ROLE_USER")
                .password("12345678")
                .build()), attributes));
    }
}
//{sub=111390412291925405149, name=이재현, given_name=재현, family_name=이, picture=https://lh3.googleusercontent.com/a/AItbvml8L8Bo29jJ9j_T2DD2Vyt6x0aU26lvA5nsh6lF=s96-c, email=nabiyi926@gmail.com, email_verified=true, locale=ko}
//User.builder()
//        .email(attributes.get("email").toString())
//        .displayName(attributes.get("given_name").toString())
//        .fullName(attributes.get("name").toString())
//        .provider(provider)
//        .providerId(attributes.get("sub").toString())
//        .profileImage(attributes.get("picture").toString())
//        .roles("ROLE_USER")
//        .password("12345678")
//        .build()
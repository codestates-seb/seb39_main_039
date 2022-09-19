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
        System.out.println(attributes.toString());
        Optional<User> user = userRepository.findByProviderAndProviderId(providerType.name(), providerId);

        return user.map(user1 -> new PrincipalDetails(user1, attributes)).orElseGet(() -> new PrincipalDetails(createUser(providerType, attributes)));
    }

    public User createUser(ProviderType providerType, Map<String, Object> attributes) {
        return userRepository.save(User.of(providerType, attributes));
    }
}
//{sub=111390412291925405149, name=이재현, given_name=재현, family_name=이, picture=https://lh3.googleusercontent.com/a/AItbvml8L8Bo29jJ9j_T2DD2Vyt6x0aU26lvA5nsh6lF=s96-c, email=nabiyi926@gmail.com, email_verified=true, locale=ko}
//{id=2433567214, connected_at=2022-09-17T13:01:32Z, properties={nickname=이재현, profile_image=http://k.kakaocdn.net/dn/bm7n9B/btrp6QMPHU1/06EfUzfBTA5cvtQbiB76tK/img_640x640.jpg, thumbnail_image=http://k.kakaocdn.net/dn/bm7n9B/btrp6QMPHU1/06EfUzfBTA5cvtQbiB76tK/img_110x110.jpg}, kakao_account={profile_nickname_needs_agreement=false, profile_image_needs_agreement=false, profile={nickname=이재현, thumbnail_image_url=http://k.kakaocdn.net/dn/bm7n9B/btrp6QMPHU1/06EfUzfBTA5cvtQbiB76tK/img_110x110.jpg, profile_image_url=http://k.kakaocdn.net/dn/bm7n9B/btrp6QMPHU1/06EfUzfBTA5cvtQbiB76tK/img_640x640.jpg, is_default_image=false}, has_email=true, email_needs_agreement=false, is_email_valid=true, is_email_verified=true, email=jaehyun618@naver.com}}

//        return user.map(value -> new PrincipalDetails(value, attributes)).orElseGet(() -> new PrincipalDetails(userRepository.save(User.builder()
//                .email(attributes.get("email").toString())
//                .nickName(attributes.get("given_name").toString())
//                .fullName(attributes.get("name").toString())
//                .provider(provider)
//                .providerId(attributes.get("sub").toString())
//                .profileImage(attributes.get("picture").toString())
//                .roles("ROLE_USER")
//                .password("12345678")
//                .build()), attributes));
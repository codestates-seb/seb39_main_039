package com.albamung.user.service;


import com.albamung.exception.CustomException;
import com.albamung.helper.jwt.JwtTokenProvider;
import com.albamung.user.entity.User;
import com.albamung.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Random;

@Transactional
@Service
public class UserService {
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    @Value("${clientUri}")
    String uri;

    public UserService(UserRepository userRepository, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    /**
     * 회원 가입
     */
    public String signup(User user) {
        user.setRoles("ROLE_USER");
        //랜덤 프로필 이미지 저장
        Random random = new Random();
        int num = random.nextInt(100);
        List<String> profileImage = List.of("https://www.gravatar.com/avatar/39f6e2dc52425b1e08027c01bb880be0?s=256&d=identicon&r=PG",
                "https://www.gravatar.com/avatar/13b00992e849567e5434ddab7946c1a6?s=256&d=identicon&r=PG",
                "https://www.gravatar.com/avatar/2dceea858ad8f1577bec6ddaa0485d15?s=256&d=identicon&r=PG",
                "https://www.gravatar.com/avatar/e514b017977ebf742a418cac697d8996?s=256&d=identicon&r=PG",
                "https://www.gravatar.com/avatar/ad240ed5cc406759f0fd72591dc8ca47?s=256&d=identicon&r=PG");
        user.setProfileImage(profileImage.get(num%5));

        try {
            userRepository.save(user);
            return user.getNickName();
        } catch (Exception e) {
            throw new CustomException("Email or Nick Name is already in use", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * 유저 상세 조회
     */
    @Transactional(readOnly = true)
    public User getUserInfo(Long userId) {
        return verifyUser(userId);
    }

    /**
     * 유저 정보 수정
     */
    public User putUserDefault(User user, long loginUserId) {
        User targetUser = verifyUser(loginUserId);
        Optional.ofNullable(user.getNickName()).ifPresent(targetUser::setNickName);
        Optional.ofNullable(user.getFullName()).ifPresent(targetUser::setFullName);
        Optional.ofNullable(user.getPhone()).ifPresent(targetUser::setPhone);
        return targetUser;
    }



    /**
     * 유저 존재 검사
     */
    @Transactional(readOnly = true)
    public User verifyUser(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new CustomException("User not Found", HttpStatus.NO_CONTENT));
    }

    /**
     * 엑세스 토큰 만료시 리프레시 토큰 검증 및 엑세스 토큰 재발급
     */
//    public TokenDto refreshToken(String accessToken, String refreshToken) {
//        if (!jwtTokenProvider.validateTokenExceptExpiration(accessToken)) throw new AccessDeniedException("");
//
//        User user = userRepository.findByEmail(jwtTokenProvider.getEmail(accessToken)).orElseThrow();
//
//        if (!jwtTokenProvider.validateToken(user.getRefreshToken()) || !refreshToken.equals(user.getRefreshToken()))
//            throw new AccessDeniedException("");
//        user.setRefreshToken(jwtTokenProvider.createRefreshToken());
//        return new TokenDto(jwtTokenProvider.createToken(user.getId(), user.getEmail(), user.getRoleList()), user.getRefreshToken());
//    }


    public void deleteUser(Long userId, Long loginUserId) {
        User user = verifyUser(userId);
        if (!user.getId().equals(loginUserId))
            throw new CustomException("You are not the owner of this user", HttpStatus.FORBIDDEN);
        userRepository.delete(user);
    }
}

package com.albamung.user.repository;


import com.albamung.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByProviderAndProviderId(String provider, String providerId);

    @Modifying
    @Query(value = "UPDATE users SET refresh_token = ?2 WHERE id = ?1 ", nativeQuery = true)
    void updateRefreshToken(Long id, String refreshToken);

    int countAllByNickNameStartsWith(String nickName);
}

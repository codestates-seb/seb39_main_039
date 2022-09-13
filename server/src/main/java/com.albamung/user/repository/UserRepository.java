package com.albamung.user.repository;


import com.albamung.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByEmail(String email);
    Page<User> findAllByIsGuestIsFalse(PageRequest pageRequest);
}

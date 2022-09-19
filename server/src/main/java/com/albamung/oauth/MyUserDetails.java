package com.albamung.oauth;

import com.albamung.user.entity.User;
import com.albamung.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
@RequiredArgsConstructor
public class MyUserDetails implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final User user = userRepository.findByEmail(email).orElseThrow();

        if (user == null) {
            throw new UsernameNotFoundException("User '" + email + "' not found");
        }

        Collection<GrantedAuthority> authorities = new ArrayList<>(user.getRoleList());

        return new PrincipalDetails(user);
    }
}

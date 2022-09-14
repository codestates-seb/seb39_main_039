package com.albamung.oauth;//package com.preproject39.oauth;
//
//import com.preproject39.user.entity.User;
//import com.preproject39.user.repository.UserRepository;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//@Service
//public class PrincipalDetailsService implements UserDetailsService {
//    private final UserRepository userRepository;
//
//    public PrincipalDetailsService(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    @Override
//    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//        User userEntity = userRepository.findByEmail(email);
//        if (userEntity == null) {
//            throw new UsernameNotFoundException("User '" + email + "' not found");
//        }
//        return new PrincipalDetails(userEntity);
//    }
//}

package com.albamung.user.mapper;

import com.albamung.user.dto.UserDto;
import com.albamung.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Mapping(source = "id", target = "userId")
    UserDto.OwnerResponse userToOwnerResponse(User user);

    default User signupToUser(UserDto.Signup signupInfo) {
        User user = User.builder()
                .password(passwordEncoder.encode(signupInfo.getPassword()))
                .email(signupInfo.getEmail())
                .nickName(signupInfo.getNickName())
                .build();
        return user;
    }

    @Mapping(source = "id", target = "userId")
    UserDto.Response userToResponse(User user);
    @Mapping(source = "id", target = "walkerId")
    @Mapping(source = "nickName", target = "walkerName")
    @Mapping(source = "profileImage", target = "walkerPicture")
    UserDto.SimpleWalkerResponse userToSimpleWalkerResponse(User user);

    User putToUser(UserDto.Put put);

    List<UserDto.Response> usersToResponses(List<User> userList);
}

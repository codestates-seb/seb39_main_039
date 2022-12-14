package com.albamung.user.mapper;

import com.albamung.pet.mapper.PetMapper;
import com.albamung.user.dto.UserDto;
import com.albamung.user.dto.WalkerDto;
import com.albamung.user.entity.User;
import com.albamung.walk.mapper.WalkMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE, uses = WalkMapper.class)
public interface UserMapper {
    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    default User signupToUser(UserDto.Signup signupInfo) {
        User user = User.builder()
                .password(passwordEncoder.encode(signupInfo.getPassword()))
                .email(signupInfo.getEmail())
                .nickName(signupInfo.getNickName())
                .build();
        return user;
    }

    UserDto.DefaultResponse toDefaultResponse(User user);

    @Mapping(source = "id", target = "walkerId")
    @Mapping(source = "nickName", target = "walkerName")
    @Mapping(source = "profileImage", target = "walkerPicture")
    WalkerDto.SimpleWalkerResponse toSimpleWalkerResponse(User user);

    User putToUser(UserDto.PutDefault put);

    @Mapping(source = "id", target = "ownerId")
    UserDto.SimpleOwnerResponse toSimpleOwnerResponse(User user);

    @Mapping(source = "id", target = "walkerId")
    WalkerDto.DetailWalkerResponse toDetailWalkerResponse(User user);
}

package com.albamung.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;


public class UserDto {


    @Builder
    @Getter
    public static class SimpleWalkerResponse {
        private Long walkerId;
        private String walkerName;
        private String walkerPicture;
    }

    @Getter
    @Builder
    public static class SimpleOwnerResponse {
        private Long ownerId;
        private String fullName;
        private String nickName;
        private String profileImage;
    }


    @Getter
    @Setter
    public static class Signup {
        @NotBlank(message = "Display Name은 공백이 아니어야 합니다.")
        private String nickName;

        @NotBlank(message = "Email을 입력 해 주세요.")
        @Email(message = "이메일 형식이 아닙니다.")
        private String email;

        @NotBlank(message = "Password를 입력 해 주세요")
        // @Pattern() //암호 규칙
        private String password;
    }

    @Builder
    @Getter
    public static class Response {
        private long userId;
        private String profileImage;
        private String nickName;
        private String aboutMe;
        private String location;
        private String fullName;
        private Long grade;
    }


    @Builder
    @Setter
    @Getter
    public static class Put {
        @Null
        private Long id;
        private String nickName;
        private String aboutMe;
        private String fullName;
        private String location;
        private String profileImage;
    }


}

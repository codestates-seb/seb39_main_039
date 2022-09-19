package com.albamung.user.dto;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import javax.validation.constraints.Pattern;


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
    @Builder
    public static class DefaultResponse {
        private String fullName;
        private String phone;
        private String nickName;
        private String email;
        private String profileImage;
    }


    @Getter
    @Setter
    @ApiModel("회원 가입")
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
    @ApiModel("유저 기본 정보 수정")
    public static class PutDefault {
        private String nickName;
        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다")
        private String phone;
        private String fullName;
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
}

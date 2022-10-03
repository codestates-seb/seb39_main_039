package com.albamung.user.dto;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


public class UserDto {


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
        private String id;
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
        @NotBlank(message = "Nick Name은 공백이 아니어야 합니다.")
        @Size(min = 2, max = 20, message = "별명은 2자 이상, 20자 이하로 입력해주세요")
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
        @Size(min = 2, max = 20, message = "별명은 2자 이상, 20자 이하로 입력해주세요")
        private String nickName;

        @Pattern(regexp = "^010-\\d{3,4}-\\d{4}$",
                message = "휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다")
        private String phone;

        @Size(min = 2, max = 20, message = "너무 길거나 짧은 이름입니다.")
        private String fullName;
    }
}

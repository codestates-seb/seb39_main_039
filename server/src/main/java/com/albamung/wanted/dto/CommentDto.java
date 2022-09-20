package com.albamung.wanted.dto;

import com.albamung.user.dto.UserDto;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class CommentDto {
    @Builder
    @Getter
    public static class Response {
        private Long commentId;
        private String content;
        private LocalDateTime creationDate;
        private LocalDateTime lastActivityDate;
        private UserDto.SimpleWalkerResponse walker;
        private boolean matched;
    }

    @Builder
    @Getter
    @ApiModel("댓글 등록")
    public static class Post {
        @NotBlank
        @Size(min = 5, max = 255, message = "너무 짧거나 긴 댓글 입니다. 5자 이상 255자 이하로 입력해주세요.")
        private String content;
    }

    @Builder
    @Getter
    @ApiModel("댓글 수정")
    public static class Put {
        @NotBlank
        @Size(min = 5, max = 255, message = "너무 짧거나 긴 댓글 입니다. 5자 이상 255자 이하로 입력해주세요.")
        private String content;
    }
}

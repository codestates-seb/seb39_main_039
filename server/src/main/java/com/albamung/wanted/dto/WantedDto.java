package com.albamung.wanted.dto;

import com.albamung.pet.dto.PetDto;
import com.albamung.user.dto.UserDto;
import com.albamung.walk.dto.WalkDto;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

public class WantedDto {
    @Builder
    @Getter
    @ApiModel("구인글 조회 응답")
    public static class DetailResponse {
        private Long wantedId;
        private String title;
        private UserDto.SimpleOwnerResponse owner;
        private WalkDto.DetailResponse walk;
        private String location;
        private int pay;
        private LocalDateTime creationDate;
        private LocalDateTime lastActivityDate;
        private boolean matched;
        private List<CommentDto.Response> commentList;
    }

    @Builder
    @Getter
    @ApiModel("구인글 리스트를 위한 간단 응답")
    public static class SimpleResponse {
        private Long wantedId;
        private String title;
        private List<PetDto.SimpleResponse> petList;
        private UserDto.SimpleOwnerResponse owner;
        private WalkDto.SimpleResponse walk;
        private String location;
        private int pay;
        private LocalDateTime creationDate;
        private LocalDateTime lastActivityDate;
        private boolean matched;
    }

    @Builder
    @Getter
    @ApiModel("구인글 등록")
    public static class Post {
        @FutureOrPresent(message = "시작 시간으 과거 일 수 없습니다")
        private LocalDateTime startTime;
        @FutureOrPresent(message = "종료 시간은 과거 일 수 없습니다")
        private LocalDateTime endTime;
        private List<String> checkListContent;
        private List<Long> petId;
        private String location;
        private String caution;
        @NotNull(message = "보수를 입력해주세요")
        private int pay;
        private String title;
    }

    public static class Put {

    }
}


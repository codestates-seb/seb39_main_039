package com.albamung.wanted.dto;

import com.albamung.walk.dto.WalkCheckListDto;
import com.albamung.walk.dto.WalkDto;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

public class WantedDto {
    @Builder
    @Getter
    @ApiModel("구인글 조회 응답")
    public static class DetailResponse {
        private Long wantedId;
        private String title;
        private WalkDto.WantedResponse walk;
        private String location;
        private int pay;
        private LocalDateTime creationDate;
        private LocalDateTime lastActivityDate;
        private boolean matched;
        private List<CommentDto.Response> commentList;
        private Long cityId;
    }

    @Builder
    @Getter
    @ApiModel("구인글 리스트를 위한 간단 응답")
    public static class SimpleResponse {
        private Long wantedId;
        private String title;
        private WalkDto.WantedResponse walk;
        private String location;
        private int pay;
        private LocalDateTime creationDate;
        private LocalDateTime lastActivityDate;
        private boolean matched;
        private Long cityId;
        private int commentCount;
    }

    @Builder
    @Getter
    @ApiModel("구인글 등록")
    public static class Post {
        @FutureOrPresent(message = "시작 시간은 과거 일 수 없습니다")
        private LocalDateTime startTime;
        @FutureOrPresent(message = "종료 시간은 과거 일 수 없습니다")
        private LocalDateTime endTime;
        private List<String> checkListContent;
        private List<Long> petId;
        @Positive
        private Long cityId;
        private String caution;
        @NotNull(message = "보수를 입력해주세요")
        @Positive
        private int pay;
        @NotBlank
        private String title;
    }

    @Getter
    @Builder
    @ApiModel("구인글 수정")
    public static class Put {
        private List<String> checkListContent;
//        private List<WalkCheckListDto.Put> checkList;
        private List<Long> petId;
        @Positive
        private Long cityId;
        @FutureOrPresent(message = "시작 시간은 과거 일 수 없습니다")
        private LocalDateTime startTime;
        @FutureOrPresent(message = "종료 시간은 과거 일 수 없습니다")
        private LocalDateTime endTime;
        private int pay;
        @NotBlank
        private String title;
        private String caution;
    }
}


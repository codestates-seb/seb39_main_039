package com.albamung.wanted.dto;

import com.albamung.user.dto.UserDto;
import com.albamung.walk.dto.WalkDto;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class WantedDto {
    @Builder
    @Getter
    @ApiModel("구인글 조회 응답")
    public static class DetailResponse {
        private Long wantedId;
        private UserDto.SimpleOwnerResponse owner;
        private WalkDto.DetailResponse walk;
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
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private List<String> checkListContent;
        private List<Long> petId;
        private String location;
        private String caution;
        private int pay;
    }
}


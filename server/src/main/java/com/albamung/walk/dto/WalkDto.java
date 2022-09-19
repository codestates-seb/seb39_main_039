package com.albamung.walk.dto;

import com.albamung.pet.dto.PetDto;
import com.albamung.user.dto.UserDto;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class WalkDto {
    @ApiModel("산책 세부 응답")
    @Builder
    @Getter
    public static class DetailResponse {
        private Long walkId;
        private List<String> coord;
        private List<WalkCheckListDto.Response> checkList;
        private List<PetDto.SimpleResponse> petList;
        private List<String> pictureList;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private int distance;
        private boolean ended;
        private int pooCount;
        private int snackCount;
        private int mealCount;
        private int walkCount;
        private String caution;
        private UserDto.SimpleWalkerResponse walker;
    }

    @Getter
    @Builder
    public static class PutCoord{
        private String coord;
        private int distance;
    }

    @Getter
    @Builder
    public static class SimpleResponse {
        private Long walkId;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private int distance;
        private boolean ended;
        private UserDto.SimpleWalkerResponse walker;
    }
}

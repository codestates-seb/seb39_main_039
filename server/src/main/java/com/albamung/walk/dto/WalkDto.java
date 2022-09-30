package com.albamung.walk.dto;

import com.albamung.pet.dto.PetDto;
import com.albamung.user.dto.UserDto;
import com.albamung.user.dto.WalkerDto;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Null;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;

public class WalkDto {
    @ApiModel("산책 세부 응답")
    @Builder
    @Getter
    public static class DetailResponse {
        private Long walkId;
        private UserDto.SimpleOwnerResponse owner;
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
        private int progress;
        private Time actualWalkTime;
        private String caution;
        private WalkerDto.SimpleWalkerResponse walker;
    }

    @Getter
    @Builder
    @ApiModel("산책 동선 좌표 입력")
    public static class PutCoord {
        private String coord;
        private int distance;
    }

    @Getter
    @Builder
    public static class pictureLink {
        @Null
        private Long id;
        @NotBlank
        private String link;
    }

    @Getter
    @Builder
    public static class SimpleResponse {
        private Long walkId;
        private UserDto.SimpleOwnerResponse owner;
        private List<PetDto.SimpleResponse> petList;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private int distance;
        private boolean ended;
        private int progress;
        private Time actualWalkTime;
        private WalkerDto.SimpleWalkerResponse walker;
    }

    @Getter
    @Builder
    public static class WantedResponse {
        private Long walkId;
        private UserDto.SimpleOwnerResponse owner;
        private List<WalkCheckListDto.Response> checkList;
        private List<PetDto.SimpleResponse> petList;
        private LocalDateTime startTime;
        private LocalDateTime endTime;
        private String caution;
        private WalkerDto.SimpleWalkerResponse walker;
    }
}

package com.albamung.user.dto;

import com.albamung.walk.dto.WalkDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class WalkerDto {
    @Builder
    @Getter
    @Setter
    public static class DetailWalkerResponse {
        private Long walkerId;
        private String nickName;
        private String profileImage;
        private String phone;
        private int walkHistoryCount;
        private int walkWaitingCount;
        private int walkDistance;
        private WalkDto.SimpleResponse currentWalk;
    }

    @Builder
    @Getter
    public static class SimpleWalkerResponse {
        private Long walkerId;
        private String walkerName;
        private String walkerPicture;
    }
}

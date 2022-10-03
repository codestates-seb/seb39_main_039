package com.albamung.walk.dto;

import lombok.Builder;
import lombok.Getter;

public class WalkCheckListDto {
    @Builder
    @Getter
    public static class Response {
        private Long checkListId;
        private String content;
        private boolean checked;
    }

    @Builder
    @Getter
    public static class Put {
        private Long checkListId;
        private String content;
    }
}

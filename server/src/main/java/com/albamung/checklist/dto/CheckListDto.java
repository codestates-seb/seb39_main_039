package com.albamung.checklist.dto;

import lombok.Builder;

public class CheckListDto {
    @Builder
    public static class WalkResponse{
        private Long checkListId;
        private String content;
        private boolean checked;
    }
}

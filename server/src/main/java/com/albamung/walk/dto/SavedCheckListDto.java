package com.albamung.walk.dto;

import lombok.Builder;

public class SavedCheckListDto {
    @Builder
    public static class Response{
        private Long checkListId;
        private String content;
    }
}

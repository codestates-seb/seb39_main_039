package com.albamung.pet.dto;

import com.albamung.walk.dto.WalkDto;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class PetDto {
    @Builder
    @Getter
    public static class SimpleResponse {
        private Long petId;
        private String petPicture;
        private String petName;
    }

    @Builder
    @Getter
    public static class DetailResponse{
        private Long petId;
        private String petPicture;
        private String petName;
        private LocalDateTime birthday;
        private String species;
        private char sex;
        private List<WalkDto.SimpleResponse> walkList;
    }

    @Builder
    @Getter
    public static class Post {
        private String name;
        private String picture;
        private LocalDateTime birthday;
        private char sex;
        private String species;
    }
}

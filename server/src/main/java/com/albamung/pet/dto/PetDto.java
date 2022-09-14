package com.albamung.pet.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

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
    public static class Post {
        private String name;
        private String picture;
        private LocalDateTime birthday;
        private char sex;
        private String species;
    }
}

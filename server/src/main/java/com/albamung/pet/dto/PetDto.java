package com.albamung.pet.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import java.time.LocalDate;

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
    public static class DetailResponse {
        private Long petId;
        private String petPicture;
        private String petName;
        private LocalDate birthday;
        private String species;
        private String sex;
        private String aboutPet;
        private int walkCount;
        private int walkDistance;
    }

    @Builder
    @Getter
    public static class Post {
        private String name;
        private String picture;
        @PastOrPresent(message = "생일은 과거나 오늘만 가능합니다.")
        private LocalDate birthday;
        private char sex;
        @NotBlank
        private String species;
        private String aboutPet;
    }

    @Builder
    @Getter
    public static class Put {
        private String name;
        @PastOrPresent(message = "생일은 과거나 오늘만 가능합니다.")
        private LocalDate birthday;
        private String sex;
        private String species;
        private String aboutPet;
    }
}

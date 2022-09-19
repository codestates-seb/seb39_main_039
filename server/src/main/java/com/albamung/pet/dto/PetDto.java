package com.albamung.pet.dto;

import io.swagger.annotations.ApiModel;
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
        private String species;
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
    @ApiModel("반려견정보 등록")
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
    @ApiModel("반려견정보 수정")
    public static class Put {
        private String name;
        @PastOrPresent(message = "생일은 과거나 오늘만 가능합니다.")
        private LocalDate birthday;
        private String sex;
        private String species;
        private String aboutPet;
    }
}

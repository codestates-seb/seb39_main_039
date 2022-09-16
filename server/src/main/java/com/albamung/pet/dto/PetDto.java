package com.albamung.pet.dto;

import com.albamung.walk.dto.WalkDto;
import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Past;
import java.time.LocalDateTime;
import java.util.Date;
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
    public static class DetailResponse {
        private Long petId;
        private String petPicture;
        private String petName;
        private Date birthday;
        private String species;
        private String sex;
        private List<WalkDto.SimpleResponse> walkList;
    }

    @Builder
    @Getter
    public static class Post {
        private String name;
        private String picture;
        @Past(message = "생일은 과거만 가능합니다.")
        private Date birthday;
        private char sex;
        private String species;
        private String aboutPet;
    }

    @Builder
    @Getter
    public static class Put {
        private String name;
        @Past(message = "생일은 과거만 가능합니다.")
        private Date birthday;
        private String sex;
        private String species;
        private String aboutPet;
    }
}

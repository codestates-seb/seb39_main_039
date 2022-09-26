package com.albamung.pet.dto;

import com.albamung.exception.CustomException;
import com.albamung.walk.dto.WalkDto;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;
import javax.validation.constraints.Size;
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
        private int walkHistoryCount;
        private int walkWaitingCount;
        private int walkDistance;
        private WalkDto.SimpleResponse currentWalk;
    }

    @Builder
    @Getter
    @ApiModel("반려견정보 등록")
    public static class Post {
        @Size(max = 20, message = "Name must be under 20 letters")
        @NotBlank
        private String name;
        @PastOrPresent(message = "생일은 과거나 오늘만 가능합니다.")
        private LocalDate birthday;
        @NotBlank
        private String sex;
        @NotBlank
        @Size(max = 20, message = "Species must be under 20 letters")
        private String species;
        private String aboutPet;

        public boolean getSex() {
            if(this.sex.equals("암컷")) return true;
            else if (this.sex.equals("수컷")) return false;
            else throw new CustomException("성별은 암컷 / 수컷을 입력해주세요", HttpStatus.BAD_REQUEST);
        }
    }

    @Builder
    @Getter
    @ApiModel("반려견정보 수정")
    public static class Put {
        @Size(max = 20, message = "Name must be under 20 letters")
        private String name;
        @PastOrPresent(message = "생일은 과거나 오늘만 가능합니다.")
        private LocalDate birthday;
        private String sex;
        @Size(max = 20, message = "Species must be under 20 letters")
        private String species;
        private String aboutPet;
    }
}

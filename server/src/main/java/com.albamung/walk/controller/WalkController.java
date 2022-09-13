package com.albamung.walk.controller;


import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/walk")
@Api(tags = {"1.산책 세부"})
@Slf4j
public class WalkController {


    @GetMapping("/{walk_id}")
    public ResponseEntity getWalkDetail(@PathVariable("walk_id") @Positive Long walkId){
        Map<String,Object> response = new HashMap<>();
        String[] cord = {"33.452344169439975 126.56878163224233","33.452739313807456 126.570908145358", "33.45178067090639 126.5726886938753"};

        Map<String,Object> check = new HashMap<>();
        Map<String,Object> check2 = new HashMap<>();
        Map<String,Object> check3 = new HashMap<>();
        check.put("checkListId",1);
        check.put("content","탄천따라 산책 한시간 동안 시켜주세요");
        check.put("checked", false);
        check2.put("checkListId",2);
        check2.put("content","3시에 간식 하나 주세요");
        check2.put("checked", true);
        check3.put("checkListId",3);
        check3.put("content","간식 주기전에 기다려 훈련 부탁드려요");
        check3.put("checked", true);
        List<Map<String,Object>> checkList = List.of(check,check2,check3);

        String[] pictureList = {"https://image.shutterstock.com/image-photo/pomeranian-spitz-smiling-lying-house-600w-2169338377.jpg","https://image.shutterstock.com/image-photo/dog-pomeranian-spitz-smiling-600w-1186200793.jpg","https://image.shutterstock.com/image-photo/groomed-miniature-pomeranian-dog-resting-600w-1155493243.jpg"};

        Map<String,Object> pet1 = new HashMap<>();
        Map<String,Object> pet2 = new HashMap<>();
        Map<String,Object> pet3 = new HashMap<>();
        pet1.put("petId",1);
        pet1.put("petName","춘식이");
        pet1.put("petPicture", "https://image.shutterstock.com/image-photo/adorable-cute-puppy-welsh-corgi-600w-1814695991.jpg");
        pet2.put("petId",2);
        pet2.put("petName","추식이");
        pet2.put("petPicture", "https://image.shutterstock.com/image-photo/adorable-cute-puppy-welsh-corgi-600w-1814695991.jpg");
        pet3.put("petId",3);
        pet3.put("petName","하식이");
        pet3.put("petPicture", "https://image.shutterstock.com/image-photo/adorable-cute-puppy-welsh-corgi-600w-1814695991.jpg");
        List<Map<String,Object>> petList = List.of(pet1,pet2,pet3);

        response.put("petList",petList);
        response.put("walkId",walkId);
        response.put("walkerName","이지은");
        response.put("walkerId",1);
        response.put("startTime", LocalDateTime.now());
        response.put("endTime", LocalDateTime.now());
        response.put("locationCord", cord);
        response.put("distance",2300);
        response.put("checkList",checkList);
        response.put("pictureList", pictureList);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}

package com.albamung.walk.controller;


import com.albamung.user.entity.User;
import com.albamung.walk.dto.WalkDto;
import com.albamung.walk.dto.WalkMapper;
import com.albamung.walk.entity.Walk;
import com.albamung.walk.service.WalkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/walk")
@Api(tags = {"1.산책 관련"})
@Slf4j
@Validated
public class WalkController {
    private final WalkService walkService;
    private final WalkMapper walkMapper;

    public WalkController(WalkService walkService, WalkMapper walkMapper) {
        this.walkService = walkService;
        this.walkMapper = walkMapper;
    }

    @ApiOperation(value = "산책 세부내역 불러오기", notes = "진행중 산책, 지난 산책 세부내역 등")
    @GetMapping("/{walk_id}")
    public ResponseEntity getWalkDetail(@PathVariable("walk_id") @Positive Long walkId){
        Walk walk = walkService.getWalkDetail(walkId);
        WalkDto.DetailResponse response = walkMapper.walkToDetailResponse(walk);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "새 산책 생성", notes = "구인글 생성 시 함께 생성되면 좋음.")
    @PostMapping("/create")
    public ResponseEntity postWalk(@RequestBody @Valid WalkDto.Post request,
                                   @AuthenticationPrincipal @ApiIgnore User owner){
        Walk walk = walkMapper.postToWalk(request);
        Long response = walkService.saveWalk(walk, request.getPetId(), request.getCheckListContent(), owner.getId()).getId();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @ApiOperation(value = "진행중인 산책에 좌표값 추가")
    @PutMapping("/{walk_id}/coord")
    public ResponseEntity putCoord(@AuthenticationPrincipal @ApiIgnore User walker,
                                   @PathVariable("walk_id") @Positive Long walkId,
                                   @RequestBody @Valid WalkDto.PutCoord request){
        String coord = request.getCoord();
        walkService.putCoord(walkId,coord,walker.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "매칭된 산책을 알바에게 등록")
    @PutMapping("/{walk_id}/match")
    public ResponseEntity matchWalker(@AuthenticationPrincipal @ApiIgnore User owner,
                                      @PathVariable("walk_id") @Positive Long walkId,
                                      @RequestBody @Positive Long walkerId){
        walkService.matchWalker(walkId,walkerId,owner.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}


/*
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
 */
package com.albamung.walk.controller;


import com.albamung.dto.PagingResponseDto;
import com.albamung.user.entity.User;
import com.albamung.walk.dto.WalkDto;
import com.albamung.walk.entity.Walk;
import com.albamung.walk.mapper.WalkMapper;
import com.albamung.walk.service.WalkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.locationtech.jts.io.ParseException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.sql.Time;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @GetMapping("/{walkId}")
    public ResponseEntity getDetailWalk(@AuthenticationPrincipal @ApiIgnore User user, @PathVariable @Positive Long walkId) {
        if(user == null) user = User.builder().id(1L).build();
        Walk walk = walkService.getWalk(walkId, user.getId());
        WalkDto.DetailResponse response = walkMapper.toDetailResponse(walk);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "각 반려견의 지난 산책 리스트 조회")
    @GetMapping("/walkHistory")
    public ResponseEntity getWalkHistoryListByPet(@AuthenticationPrincipal @ApiIgnore User user,
                                                  @RequestParam(required = false) @Positive Long petId,
                                                  @RequestParam int page) {
        if (user == null) user = User.builder().id(1L).build();
        Page<Walk> walkList;

        if (petId != null) walkList = walkService.getWalkHistoryListByPetId(petId, page - 1, user.getId(), "history");
        else walkList = walkService.getWalkHistoryListByWalkerId(user.getId(), page - 1, "history");

        List<WalkDto.SimpleResponse> items = walkMapper.listToSimpleResponseList(walkList.getContent());
        return new ResponseEntity<>(new PagingResponseDto<>(items, walkList), HttpStatus.OK);
    }

    @ApiOperation(value = "각 반려견의 대기중 산책 리스트 조회")
    @GetMapping("/walkWaiting")
    public ResponseEntity getWalkWaitingListByPet(@AuthenticationPrincipal @ApiIgnore User user,
                                                  @RequestParam(required = false) Long petId,
                                                  @RequestParam int page) {
        if (user == null) user = User.builder().id(1L).build();
        Page<Walk> walkList;

        if (petId != null) walkList = walkService.getWalkHistoryListByPetId(petId, page - 1, user.getId(), "waiting");
        else walkList = walkService.getWalkHistoryListByWalkerId(user.getId(), page - 1, "waiting");

        List<WalkDto.SimpleResponse> items = walkMapper.listToSimpleResponseList(walkList.getContent());
        return new ResponseEntity<>(new PagingResponseDto<>(items, walkList), HttpStatus.OK);
    }

    @ApiOperation(value = "산책 사진 등록")
    @GetMapping("/{walkId}/savePicture")
    public ResponseEntity saveWalkPicture(@AuthenticationPrincipal @ApiIgnore User owner,
                                          @PathVariable @Positive Long walkId) {
        if (owner == null) owner = User.builder().id(1L).build();
        return new ResponseEntity<>(walkService.saveWalkPicture(walkId, owner.getId()), HttpStatus.OK);
    }

    @ApiOperation(value = "산책 사진 삭제", notes = "요청에 해당 사진 링크를 보내주시면 됩니다.")
    @DeleteMapping("/{walkId}/deletePicture")
    public ResponseEntity deleteWalkPicture(@AuthenticationPrincipal @ApiIgnore User owner,
                                            @PathVariable @Positive Long walkId,
                                            @RequestBody @NotBlank String link) {
        if (owner == null) owner = User.builder().id(1L).build();
        walkService.deleteWalkPicture(walkId, link, owner.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }


    /**
     * 산책 등록 -> 구인글 등록으로 이관
     */
//    @ApiOperation(value = "새 산책 생성", notes = "구인글 생성 시 함께 생성되면 좋음.")
//    @PostMapping("/create")
//    public ResponseEntity postWalk(@RequestBody @Valid WalkDto.Post request,
//                                   @AuthenticationPrincipal @ApiIgnore User owner){
//        if(owner==null) owner = User.builder().id(1L).build();
//        Walk walk = walkMapper.postToWalk(request);
//        Long response = walkService.saveWalk(walk, request.getPetId(), request.getCheckListContent(), owner.getId()).getId();
//
//        return new ResponseEntity<>(response, HttpStatus.CREATED);
//    }
    @ApiOperation(value = "산책 동선 좌표값 불러오기", notes = "해당 산책 Id의 좌표배열만 반환하는 API입니다")
    @GetMapping("/{walkId}/coord")
    public ResponseEntity getCoord(@AuthenticationPrincipal @ApiIgnore User user,
                                   @PathVariable @Positive Long walkId) {
        if (user == null) user = User.builder().id(1L).build();
        Walk targetWalk = walkService.verifyWalk(walkId);
//        walkService.verifyWalkUser(targetWalk, user.getId());
        return new ResponseEntity<>(targetWalk.getCoord(), HttpStatus.OK);
    }

    @ApiOperation(value = "진행중인 산책에 좌표값 추가")
    @PutMapping("/{walkId}/coord")
    public ResponseEntity putCoord(@AuthenticationPrincipal @ApiIgnore User walker,
                                   @PathVariable @Positive Long walkId,
                                   @RequestBody @Valid WalkDto.PutCoord request) throws ParseException {
        if (walker == null) walker = User.builder().id(1L).build();
        walkService.putCoord(walkId, request.getCoord(), request.getDistance(), walker.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "산책 종료(알바) 시 실질 산책 시간 업데이트", notes = "요청시 body는 \"1:30:00\" 형식, 응답은 반영된 시간이 반환됩니다.")
    @PutMapping("/{walkId}/actualWalkTime")
    public ResponseEntity putActualWalkTime(@AuthenticationPrincipal @ApiIgnore User walker,
                                            @PathVariable @Positive Long walkId,
                                            @RequestBody Time actualWalkTime) {
        if (walker == null) walker = User.builder().id(1L).build();
        Time response = walkService.putActualWalkTime(walkId, actualWalkTime, walker.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "산책의 체크리스트 체크상태 변경", notes = "변경된 상태(true/false)와 변경된 진행상황(progress)를 응답합니다")
    @PutMapping("/{walkId}/check/{checklist_id}")
    public ResponseEntity checkCheck(@AuthenticationPrincipal @ApiIgnore User walker,
                                     @PathVariable @Positive Long walkId,
                                     @PathVariable("checklist_id") @Positive Long checkListId,
                                     @RequestBody @NotNull boolean check) {
        if (walker == null) walker = User.builder().id(1L).build();
        Walk responseWalk = walkService.checkCheckList(walkId, checkListId, check, walker.getId());
        Map<String, Object> response = new HashMap<>();
        response.put("checked", check);
        response.put("progress", responseWalk.getProgress());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "산책 기본 요소 증감", notes = "{basic}에 증감할 poo, snack, walk, meal 을 입력하세요. \n Body에는 1 혹은 -1을 보내주시면 됩니다. \n 응답으로 변경이 적용된 숫자가 반환됩니다. ")
    @PutMapping("/{walkId}/{basic}")
    public ResponseEntity putPoo(@AuthenticationPrincipal @ApiIgnore User walker,
                                 @PathVariable @Positive Long walkId,
                                 @PathVariable String basic,
                                 @RequestBody @NotNull int count) {
        if (walker == null) walker = User.builder().id(1L).build();
        int response = walkService.putBasic(walkId, basic, count, walker.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    /**
     * 산책 매칭 -> 구인글 매칭으로 이관
     */
//    @ApiOperation(value = "매칭된 산책을 알바에게 등록")
//    @PutMapping("/{walk_id}/match")
//    public ResponseEntity matchWalker(@AuthenticationPrincipal @ApiIgnore User owner,
//                                      @PathVariable("walk_id") @Positive Long walkId,
//                                      @RequestBody @Positive Long walkerId){
//        if(owner==null) owner = User.builder().id(1L).build();
//        walkService.matchWalker(walkId,walkerId,owner.getId());
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
    @ApiOperation(value = "산책 종료")
    @PutMapping("/{walkId}/end")
    public ResponseEntity endWalk(@AuthenticationPrincipal @ApiIgnore User owner,
                                  @PathVariable @Positive Long walkId) {
        if (owner == null) owner = User.builder().id(1L).build();
        return new ResponseEntity<>(walkService.endWalk(walkId, owner.getId()), HttpStatus.OK);
    }
}
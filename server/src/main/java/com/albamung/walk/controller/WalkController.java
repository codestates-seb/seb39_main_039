package com.albamung.walk.controller;


import com.albamung.dto.PagingResponseDto;
import com.albamung.user.entity.User;
import com.albamung.walk.dto.WalkDto;
import com.albamung.walk.dto.WalkMapper;
import com.albamung.walk.entity.Walk;
import com.albamung.walk.service.WalkService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.util.List;

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
    public ResponseEntity getDetailWalk(@PathVariable("walk_id") @Positive Long walkId) {
        Walk walk = walkService.getWalk(walkId);
        WalkDto.DetailResponse response = walkMapper.toDetailResponse(walk);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "각 반려견의 산책 리스트 조회")
    @GetMapping("/walkList")
    public ResponseEntity getPetWalkList(@AuthenticationPrincipal @ApiIgnore User owner,
                                         @RequestParam Long petId,
                                         @RequestParam int page) {
        if (owner == null) owner = User.builder().id(1L).build();
        Page<Walk> walkList = walkService.getWalkListByPetId(petId, page-1, owner.getId());
        List<WalkDto.SimpleResponse> items = walkMapper.listToSimpleResponseList(walkList.getContent());
        return new ResponseEntity<>(new PagingResponseDto<>(items, walkList), HttpStatus.OK);
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
    @ApiOperation(value = "진행중인 산책에 좌표값 추가")
    @PutMapping("/{walk_id}/coord")
    public ResponseEntity putCoord(@AuthenticationPrincipal @ApiIgnore User walker,
                                   @PathVariable("walk_id") @Positive Long walkId,
                                   @RequestBody @Valid WalkDto.PutCoord request) {
        if (walker == null) walker = User.builder().id(1L).build();
        String coord = request.getCoord();
        walkService.putCoord(walkId, coord, walker.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "산책의 체크리스트 체크상태 변경")
    @PutMapping("/{walk_id}/check/{checklist_id}")
    public ResponseEntity checkCheck(@AuthenticationPrincipal @ApiIgnore User walker,
                                     @PathVariable("walk_id") @Positive Long walkId,
                                     @PathVariable("checklist_id") @Positive Long checkListId,
                                     @RequestBody @NotNull boolean check) {
        if (walker == null) walker = User.builder().id(1L).build();
        walkService.checkCheckList(walkId, checkListId, check, walker.getId());
        return new ResponseEntity<>(HttpStatus.OK);
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
    @PutMapping("/{walk_id}/end")
    public ResponseEntity endWalk(@AuthenticationPrincipal @ApiIgnore User owner,
                                  @PathVariable("walk_id") @Positive Long walkId) {
        if (owner == null) owner = User.builder().id(1L).build();

        return new ResponseEntity<>(walkService.endWalk(walkId, owner.getId()), HttpStatus.OK);
    }
}
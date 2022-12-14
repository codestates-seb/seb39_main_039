package com.albamung.wanted.controller;

import com.albamung.dto.PagingResponseDto;
import com.albamung.user.entity.User;
import com.albamung.wanted.dto.WantedDto;
import com.albamung.wanted.entity.SortBy;
import com.albamung.wanted.entity.Wanted;
import com.albamung.wanted.mapper.WantedMapper;
import com.albamung.wanted.service.WantedService;
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
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/wanted")
@Api(tags = {"4.구인글 관련"})
@Slf4j
@Validated
public class WantedController {
    private final WantedService wantedService;
    private final WantedMapper wantedMapper;


    public WantedController(WantedService wantedService, WantedMapper wantedMapper) {
        this.wantedService = wantedService;
        this.wantedMapper = wantedMapper;
    }

    @ApiOperation(value = "구인글 등록", notes = "구인글 등록 시 산책도 함께 등록됩니다")
    @PostMapping("/create")
    public ResponseEntity postWanted(@AuthenticationPrincipal @ApiIgnore User owner,
                                     @RequestBody @Valid WantedDto.Post request) {
        Wanted wanted = wantedMapper.postToWanted(request);
        Wanted savedWanted = wantedService.saveWanted(wanted, request, owner.getId());
        return new ResponseEntity<>(savedWanted.getWantedId(), HttpStatus.CREATED);
    }

    @ApiOperation(value = "구인글 상세 조회")
    @GetMapping("/{wantedId}")
    public ResponseEntity getDetailWanted(@PathVariable @Positive Long wantedId) {
        Wanted wanted = wantedService.getWanted(wantedId);
        return new ResponseEntity<>(wantedMapper.toDetailResponse(wanted), HttpStatus.OK);
    }

    @ApiOperation(value = "구인글 수정", notes = "기본요소는 Post와 동일합니다. 기존 체크리스트 수정만 약간의 추가가 있습니다.\n \"checkList\" = [{\"checkListId\" = 1 ,\"content\" = \"수정내역\"} , {...}]")
    @PutMapping("/{wantedId}/edit")
    public ResponseEntity putWanted(@AuthenticationPrincipal @ApiIgnore User owner,
                                    @RequestBody @Valid WantedDto.Put request,
                                    @PathVariable Long wantedId) {
        Wanted editedWanted = wantedService.editWanted(wantedId, request, owner.getId());
        return new ResponseEntity<>(wantedMapper.toDetailResponse(editedWanted), HttpStatus.OK);
    }
//
//    @ApiOperation(value = "구인글 수정 시 체크리스트 삭제")
//    @DeleteMapping("/{wantedId}/edit/checkList/{checkListId}/delete")
//    public ResponseEntity deleteCheckList(@AuthenticationPrincipal @ApiIgnore User owner,
//                                          @PathVariable Long checkListId,
//                                          @PathVariable Long wantedId){
//
//    }


    @ApiOperation(value = "구인글 목록 조회", notes = "현재 페이지네이션 적용된 최신순 정렬. pay순 정렬, 지역별 필터링, 매칭된 글 숨기기 구현 예정 ")
    @GetMapping
    public ResponseEntity getWantedList(@RequestParam(required = false) Integer page,
                                        @RequestParam(required = false) SortBy sort,
                                        @RequestParam(required = false) boolean matched,
                                        @RequestParam(required = false) Long cityId) {
        //Enum 적용 예정
        if (sort == null) sort = SortBy.recent;
        if (page == null) page = 1;
        if (cityId == null) cityId = 0L;

        Page<Wanted> wantedList = wantedService.getWantedList((page - 1), sort, matched, cityId);
        List<WantedDto.SimpleResponse> items = wantedMapper.toSimpleResponseList(wantedList.getContent());
        return new ResponseEntity<>(new PagingResponseDto<>(items, wantedList), HttpStatus.OK);
    }


    @ApiOperation(value = "구인글 삭제")
    @DeleteMapping("/{wantedId}/delete")
    public ResponseEntity deleteWanted(@AuthenticationPrincipal @ApiIgnore User owner,
                                       @PathVariable Long wantedId) {
        wantedService.deleteWanted(wantedId, owner.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

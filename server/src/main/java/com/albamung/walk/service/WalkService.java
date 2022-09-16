package com.albamung.walk.service;

import com.albamung.checklist.entity.WalkCheckList;
import com.albamung.checklist.repository.WalkCheckListRepository;
import com.albamung.exception.CustomException;
import com.albamung.walk.entity.Walk;
import com.albamung.walk.repository.WalkRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class WalkService {
    private final WalkRepository walkRepository;
    private final WalkCheckListRepository checkListRepository;

    public WalkService(WalkRepository walkRepository, WalkCheckListRepository checkListRepository) {
        this.walkRepository = walkRepository;
        this.checkListRepository = checkListRepository;
    }

    @Transactional(readOnly = true)
    public Walk getWalk(Long walkId) {
        return verifyWalk(walkId);
    }


    /**
     * 산책의 체크리스트 체크상태 변경
     */
    public void checkCheckList(Long walkId, Long checkListId, boolean check, Long walkerId) {
        Walk targetWalk = verifyWalk(walkId);
        verifyWalkUser(targetWalk, walkerId);
        //체크리스트 아이디가 해당 산책에 속하지 않을 때 에러
        if (targetWalk.getCheckList().stream().noneMatch(checkList -> checkList.getId().equals(checkListId)))
            throw new CustomException("해당 체크리스트는 이 산책의 체크리스트가 아닙니다", HttpStatus.BAD_REQUEST);
        WalkCheckList targetCheckList = checkListRepository.findById(checkListId).orElseThrow(() -> new CustomException("존재하지 않는 체크리스트 입니다", HttpStatus.NO_CONTENT));
        targetCheckList.setChecked(check);
    }

    /**
     * Wanted 매칭 시 산책 알바를 산책에 등록
     * WantedService로 이관
     */
//    public Walk matchWalker(Long walkId, Long walkerId, Long ownerId){
//        Walk targetWalk = verifyWalk(walkId);
//        if(targetWalk.getWalker()!=null) throw new CustomException("이미 매칭된 산책입니다", HttpStatus.CONFLICT);
//
//        verifyWalkUser(targetWalk, ownerId);
//        User walker = userService.verifyUser(walkerId);
//        targetWalk.setWalker(walker);
//        return targetWalk;
//    }

    /**
     * 알바 종료 시 견주에 의해 알바 종료 설정
     */
    public boolean endWalk(Long walkId, Long ownerId) {
        Walk targetWalk = verifyWalk(walkId);
        verifyWalkUser(targetWalk, ownerId);
        targetWalk.setEnded(true);
        return true;
    }


    /**
     * 산책의 동선 좌표 입력
     */
    public void putCoord(Long walkId, String coord, Long loginId) {
//        Walk targetWalk = verifyWalk(walkId);

//        verifyWalkUser(targetWalk, loginId);
//        targetWalk.addCoord(coord);
        walkRepository.UpdateCoord(walkId, "," + coord);
    }

    /**
     * 산책 ID 유효성 검사
     */
    @Transactional(readOnly = true)
    public Walk verifyWalk(Long walkId) {
        return walkRepository.findById(walkId).orElseThrow(() -> new CustomException("존재하지 않는 산책입니다", HttpStatus.NO_CONTENT));
    }

    /**
     * 산책 수정권한 확인(산책알바 혹은 견주)
     */
    @Transactional(readOnly = true)
    public void verifyWalkUser(Walk walk, Long userId) {
        if (!walk.getOwner().getId().equals(userId) && !walk.getWalker().getId().equals(userId))
            throw new CustomException("알바나 견주만이 수정 가능합니다", HttpStatus.FORBIDDEN);
    }

}

package com.albamung.walk.service;

import com.albamung.exception.CustomException;
import com.albamung.pet.entity.Pet;
import com.albamung.pet.service.PetService;
import com.albamung.walk.entity.Walk;
import com.albamung.walk.entity.WalkCheckList;
import com.albamung.walk.repository.WalkRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Transactional
public class WalkService {
    private final WalkRepository walkRepository;
    private final PetService petService;


    public WalkService(WalkRepository walkRepository, PetService petService) {
        this.walkRepository = walkRepository;
        this.petService = petService;
        ;
    }

    @Transactional(readOnly = true)
    public Walk getWalk(Long walkId) {
        return verifyWalk(walkId);
    }


    /**
     * 산책의 체크리스트 체크상태 변경
     */
    public Walk checkCheckList(Long walkId, Long checkListId, boolean check, Long walkerId) {
        Walk targetWalk = verifyWalk(walkId);
        verifyWalkUser(targetWalk, walkerId);
//        WalkCheckList targetCheckList = checkListRepository.findById(checkListId).orElseThrow(() -> new CustomException("존재하지 않는 체크리스트 입니다", HttpStatus.NO_CONTENT));
        //체크리스트 아이디가 해당 산책에 속하지 않을 때 에러
        targetWalk.getCheckList()
                .stream().filter(s -> s.getId().equals(checkListId))
                .findFirst()
                .orElseThrow(() -> new CustomException("해당 체크리스트는 이 산책의 체크리스트가 아닙니다", HttpStatus.BAD_REQUEST))
                .setChecked(check);
        int countTrue = (int) targetWalk.getCheckList().stream().filter(WalkCheckList::isChecked).count();
        float progress = (float) countTrue / targetWalk.getCheckList().size();
        targetWalk.setProgress((int) (progress * 100));

        return targetWalk;
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
    public void putCoord(Long walkId, String coord, int distance, Long loginId) {
//        Walk targetWalk = verifyWalk(walkId);

//        verifyWalkUser(targetWalk, loginId);
//        targetWalk.addCoord(coord);
        walkRepository.UpdateCoord(walkId, "," + coord);
        walkRepository.UpdateDistance(walkId, distance);
    }

    public int putBasic(Long walkId, String basic, int count, Long loginId) {
        Walk targetWalk = verifyWalk(walkId);
        verifyWalkUser(targetWalk, loginId);
        switch (basic) {
            case "poo":
                targetWalk.increasePoo(count);
                return targetWalk.getPooCount();
            case "meal":
                targetWalk.increaseMeal(count);
                return targetWalk.getMealCount();
            case "snack":
                targetWalk.increaseSnack(count);
                return targetWalk.getSnackCount();
            case "walk":
                targetWalk.increaseWalk(count);
                return targetWalk.getWalkCount();
            default:
                throw new CustomException("잘못된 변수입니다. 변경할 poo, meal, snack, walk를 입력해주세요", HttpStatus.BAD_REQUEST);
        }
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
        if (walk.getOwner().getId().equals(userId)) return;
        if (walk.getWalker()!=null && walk.getWalker().getId().equals(userId)) return;
        throw new CustomException("알바나 견주만이 수정 가능합니다", HttpStatus.FORBIDDEN);
    }

    /**
     * 반려견에 대한 산책페이지 조회
     */
    public Page<Walk> getWalkListByPetId(Long petId, int page, Long ownerId) {
        Pet targetPet = petService.verifyPet(petId);
        petService.verifyPetOwner(targetPet, ownerId);

        int size = 5;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("creationDate").descending());

        Page<Walk> walkList = walkRepository.findAllByPetListIdAndEndTimeIsBefore(petId, LocalDateTime.now(), pageRequest);
        if (walkList == null) throw new CustomException("산책이 존재하지 않거나, 존재하지 않는 반려견 ID입니다", HttpStatus.NO_CONTENT);
        return walkList;
    }
}

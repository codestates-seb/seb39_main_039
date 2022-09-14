package com.albamung.walk.service;

import com.albamung.exception.CustomException;
import com.albamung.pet.service.PetService;
import com.albamung.user.entity.User;
import com.albamung.user.service.UserService;
import com.albamung.walk.entity.Walk;
import com.albamung.walk.repository.WalkRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class WalkService {
    private final WalkRepository walkRepository;
    private final PetService petService;
    private final UserService userService;

    public WalkService(WalkRepository walkRepository, PetService petService, UserService userService) {
        this.walkRepository = walkRepository;
        this.petService = petService;
        this.userService = userService;
    }

    @Transactional(readOnly = true)
    public Walk getWalkDetail(Long walkId){
        return verifyWalk(walkId);
    }

    public Walk saveWalk(Walk walk,List<Long> petIdList, List<String> checkListContents, Long ownerId){
        // 견주 설정
        walk.setOwner(userService.verifyUser(ownerId));
        // 체크리스트 입력
        walk.setCheckListByContents(checkListContents);
        // 산책시킬 강아지 입력
        if(petIdList.size()==0) throw new CustomException("산책 시킬 강아지를 하나 이상 선택해야 합니다.", HttpStatus.BAD_REQUEST);
        petIdList.forEach(petId ->{
            walk.addPetList(petService.verifyPet(petId));
        });
        return walkRepository.save(walk);
    }

    /**
     * Wanted 매칭 시 산책 알바를 산책에 등록
     */
    public Walk matchWalker(Long walkId, Long walkerId, Long ownerId){
        Walk targetWalk = verifyWalk(walkId);
        verifyWalkUser(targetWalk, ownerId);
        User walker = userService.verifyUser(walkerId);
        targetWalk.setWalker(walker);
        return targetWalk;
    }


    /**
     * 산책의 동선 좌표 입력
     */
    public void putCoord(Long walkId,String coord, Long loginId) {
        Walk targetWalk = verifyWalk(walkId);
        if(targetWalk.getWalker()!=null) throw new CustomException("이미 매칭된 산책입니다", HttpStatus.CONFLICT);
        verifyWalkUser(targetWalk, loginId);
        targetWalk.addCoord(coord);
    }

    /**
     * 산책 유효 검사
     */
    @Transactional(readOnly = true)
    public Walk verifyWalk(Long walkId){
        return walkRepository.findById(walkId).orElseThrow(()->new CustomException("존재하지 않는 산책입니다", HttpStatus.NO_CONTENT));
    }
    /**
     * 산책 수정권한 확인(산책알바 혹은 견주)
     */
    @Transactional(readOnly = true)
    public void verifyWalkUser(Walk walk, Long userId){
        if(!walk.getOwner().getId().equals(userId) && !walk.getWalker().getId().equals(userId))
            throw new CustomException("알바나 견주만이 수정 가능합니다", HttpStatus.FORBIDDEN);
    }

}

package com.albamung.walk.service;

import com.albamung.exception.CustomException;
import com.albamung.pet.service.PetService;
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

    public Walk verifyWalk(Long walkId){
        return walkRepository.findById(walkId).orElseThrow(()->new CustomException("존재하지 않는 산책입니다", HttpStatus.NO_CONTENT));
    }
}

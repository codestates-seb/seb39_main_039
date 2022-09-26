package com.albamung.wanted.service;

import com.albamung.exception.CustomException;
import com.albamung.pet.entity.Pet;
import com.albamung.pet.service.PetService;
import com.albamung.user.entity.User;
import com.albamung.user.service.UserService;
import com.albamung.walk.entity.Walk;
import com.albamung.walk.entity.WalkCheck;
import com.albamung.walk.service.CheckListService;
import com.albamung.wanted.dto.WantedDto;
import com.albamung.wanted.entity.SortBy;
import com.albamung.wanted.entity.Wanted;
import com.albamung.wanted.repository.CityRepository;
import com.albamung.wanted.repository.WantedRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class WantedService {
    private final WantedRepository wantedRepository;
    private final UserService userService;
    private final PetService petService;
    private final CheckListService checkListService;
    private final CityRepository cityRepository;


    public WantedService(WantedRepository wantedRepository, UserService userService, PetService petService, CheckListService checkListService, CityRepository cityRepository) {
        this.wantedRepository = wantedRepository;
        this.userService = userService;
        this.petService = petService;
        this.checkListService = checkListService;
        this.cityRepository = cityRepository;
    }

    /**
     * 구인글 등록 및 산책 등록
     */
    public Wanted saveWanted(Wanted wanted, WantedDto.Post request, Long ownerId) {
        User owner = userService.verifyUser(ownerId);

        //반려견 목록 생성
        if (request.getPetId().size() == 0)
            throw new CustomException("산책 시킬 강아지를 하나 이상 선택해야 합니다.", HttpStatus.BAD_REQUEST);
        List<Pet> petList = request.getPetId().stream().map(petService::verifyPet).collect(Collectors.toList());

        Walk walk = Walk.builder()
                .owner(owner)
                .petList(petList)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .caution(request.getCaution())
                .coord("0")
                .build();
        walk.setCheckListByContents(request.getCheckListContent());

//        wanted.setLocation(cityRepository.findByNameAndRegionName(request.getCity(), request.getRegion()));
        wanted.setLocation(cityRepository.findById(request.getCityId()).orElseThrow());
        wanted.setWalk(walk);
        return wantedRepository.save(wanted);
    }

    /**
     * 구인글 조회
     */
    @Transactional(readOnly = true)
    public Wanted getWanted(Long wantedId) {
        return verifyWanted(wantedId);
    }

    @Transactional(readOnly = true)
    public Page<Wanted> getWantedList(int page, SortBy sortBy, boolean matched, Long cityId) {
        //JPA Specification 적용예정
        int size = 10;
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortBy.getValue()).descending());
        if (cityId == 0 && matched) return wantedRepository.findAllByMatched(false, pageRequest);
        else if (cityId > 0 && matched)
            return wantedRepository.findAllByMatchedAndLocation_CityId(false, cityId, pageRequest);
        else if (cityId > 0)
            return wantedRepository.findAllByLocation_CityId(cityId, pageRequest);

        else return wantedRepository.findAll(pageRequest);
    }

    /**
     * 구인글 수정
     */
    public Wanted editWanted(Long wantedId, WantedDto.Put request, Long ownerId) {
        Wanted targetWanted = verifyWanted(wantedId);
        Walk targetWalk = targetWanted.getWalk();
        verifyWantedUser(targetWanted, ownerId);

        targetWanted.setPay(request.getPay());
//        targetWanted.setLocation(cityRepository.findByNameAndRegionName(request.getCity(), request.getRegion()));
        targetWanted.setLocation(cityRepository.findById(request.getCityId()).orElseThrow());
        targetWanted.setTitle(request.getTitle());
        targetWalk.setStartTime(request.getStartTime());
        targetWalk.setEndTime(request.getEndTime());
        targetWalk.setCaution(request.getCaution());

        List<Pet> petList = request.getPetId().stream().map(petService::verifyPet).collect(Collectors.toList());
        targetWalk.setPetList(petList);

        List<WalkCheck> checkListToDelete = new ArrayList<>(List.copyOf(targetWalk.getCheckList()));

        request.getCheckList().forEach(editingCheck -> {
            WalkCheck targetCheck = targetWalk.getCheckList().stream().filter(s -> s.getWalkCheckId().equals(editingCheck.getCheckListId())).findFirst().orElseThrow();
            targetCheck.setContent(editingCheck.getContent());
            checkListToDelete.remove(targetCheck);
        });
        checkListToDelete.forEach(s -> targetWalk.getCheckList().remove(s));

        targetWalk.setCheckListByContents(request.getCheckListContent());
        return targetWanted;
    }

    public void deleteWanted(Long wantedId, Long ownerId){
        Wanted targetWanted = verifyWanted(wantedId);
        verifyWantedUser(targetWanted, ownerId);
        wantedRepository.deleteById(wantedId);
    }

    /**
     * 구인글 ID 유효성 검사
     */
    @Transactional(readOnly = true)
    public Wanted verifyWanted(Long wantedId) {
        return wantedRepository.findById(wantedId).orElseThrow(() -> new CustomException("존재하지 않는 구인글입니다", HttpStatus.NO_CONTENT));
    }

    @Transactional(readOnly = true)
    public void verifyWantedUser(Wanted wanted, Long ownerId) {
        if (!wanted.getWalk().getOwner().getId().equals(ownerId))
            throw new CustomException("해당 글의 작성자가 아닙니다", HttpStatus.FORBIDDEN);
    }
}




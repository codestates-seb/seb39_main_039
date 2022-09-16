package com.albamung.wanted.service;

import com.albamung.exception.CustomException;
import com.albamung.pet.entity.Pet;
import com.albamung.pet.service.PetService;
import com.albamung.user.entity.User;
import com.albamung.user.service.UserService;
import com.albamung.walk.entity.Walk;
import com.albamung.wanted.dto.WantedDto;
import com.albamung.wanted.entity.Wanted;
import com.albamung.wanted.repository.WantedRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class WantedService {
    private final WantedRepository wantedRepository;
    private final UserService userService;
    private final PetService petService;

    public WantedService(WantedRepository wantedRepository, UserService userService, PetService petService) {
        this.wantedRepository = wantedRepository;
        this.userService = userService;
        this.petService = petService;
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
                .build();
        walk.setCheckListByContents(request.getCheckListContent());

        wanted.setOwner(owner);
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
    public Page<Wanted> getWantedList(int page, String sort, String filter) {
        int size = 5;
        PageRequest pageRequest = PageRequest.of(page, size,Sort.by(sort).descending());
        Page<Wanted> wantedList = wantedRepository.findAll(pageRequest);

        return wantedList;
    }


    /**
     * 구인글 ID 유효성 검사
     */
    @Transactional(readOnly = true)
    public Wanted verifyWanted(Long wantedId) {
        return wantedRepository.findById(wantedId).orElseThrow(() -> new CustomException("존재하지 않는 구인글입니다", HttpStatus.NO_CONTENT));
    }
}




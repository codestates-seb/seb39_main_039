package com.albamung.pet.Controller;

import com.albamung.pet.dto.PetDto;
import com.albamung.pet.entity.Pet;
import com.albamung.pet.mapper.PetMapper;
import com.albamung.pet.service.PetService;
import com.albamung.user.entity.User;
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
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pet")
@Api(tags = {"2.반려견 관련"})
@Slf4j
@Validated
public class PetController {
    private final PetMapper petMapper;
    private final PetService petService;

    public PetController(PetMapper petMapper, PetService petService) {
        this.petMapper = petMapper;
        this.petService = petService;
    }

    @ApiOperation(value = "반려견 등록")
    @PostMapping("/create")
    public ResponseEntity postPet(@AuthenticationPrincipal @ApiIgnore User owner,
                                  @RequestBody @Valid PetDto.Post request) {
        if (owner == null) owner = User.builder().id(1L).build();
        petService.savePet(petMapper.postToPet(request), owner.getId());
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @ApiOperation(value = "반려견 정보 수정")
    @PutMapping("/{petId}/edit")
    public ResponseEntity putPet(@AuthenticationPrincipal @ApiIgnore User owner,
                                 @RequestBody @Valid PetDto.Put request,
                                 @PathVariable Long petId) {
        if (owner == null) owner = User.builder().id(1L).build();
        Pet editedPet = petService.editPet(petMapper.putToPet(request), petId, owner.getId());
        return new ResponseEntity<>(editedPet.getId(), HttpStatus.OK);
    }

    @ApiOperation(value = "반려견 간단 내역 조회", notes = "구인 글 작성 시 불러올 반려견 정보")
    @GetMapping("/simpleList")
    public ResponseEntity getSimplePetList(@AuthenticationPrincipal @ApiIgnore User owner) {
        if (owner == null) owner = User.builder().id(1L).build();
        List<Pet> petList = petService.getPetList(owner.getId());
        List<PetDto.SimpleResponse> response = petList.stream().map(petMapper::toSimpleResponse).collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "반려견 상세 조회", notes = "견주 페이지 반려견 목록(모든 반려견 정보 및 산책 내역 포함)")
    @GetMapping("/detailList")
    public ResponseEntity getDetailPetList(@AuthenticationPrincipal @ApiIgnore User owner) {
        if (owner == null) owner = User.builder().id(1L).build();
        List<Pet> petList = petService.getPetList(owner.getId());
        List<PetDto.DetailResponse> response = petList.stream().map(petMapper::toDetailResponse).collect(Collectors.toList());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @ApiOperation(value = "반려견 정보 삭제")
    @DeleteMapping("/{petId}/delete")
    public ResponseEntity deletePet(@AuthenticationPrincipal @ApiIgnore User owner,
                                    @PathVariable Long petId){
        if (owner == null) owner = User.builder().id(1L).build();
        petService.deletePet(petId, owner.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

package com.albamung.pet.Controller;

import com.albamung.pet.dto.PetDto;
import com.albamung.pet.mapper.PetMapper;
import com.albamung.pet.service.PetService;
import com.albamung.user.entity.User;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@RestController
@RequestMapping("/pet")
@Api(tags = {"1.반려견 관련"})
@Slf4j
@Validated
public class PetController {
    private final PetMapper petMapper;
    private final PetService petService;

    public PetController(PetMapper petMapper, PetService petService) {
        this.petMapper = petMapper;
        this.petService = petService;
    }

    @PostMapping("/create")
    public ResponseEntity postPet(@AuthenticationPrincipal @ApiIgnore User owner,
                                  @RequestBody @Valid PetDto.Post request){
        petService.savePet(petMapper.postToPet(request),owner.getId());
        return new ResponseEntity(HttpStatus.CREATED);
    }
}

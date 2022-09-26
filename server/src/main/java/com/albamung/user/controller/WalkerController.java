package com.albamung.user.controller;


import com.albamung.user.entity.User;
import com.albamung.user.service.WalkerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping("/walker")
@Api(tags = {"6. 알바 관련"})
@Slf4j
@Validated
public class WalkerController {
    private final WalkerService walkerService;

    public WalkerController(WalkerService walkerService) {
        this.walkerService = walkerService;
    }

    @ApiOperation(value = "알바메인 화면 구성을 위한 Walker 정보")
    @GetMapping
    public ResponseEntity getWalkerDetail(@AuthenticationPrincipal @ApiIgnore User walker){
        if(walker==null) walker = User.builder().id(1L).build();
        return new ResponseEntity<>(walkerService.getWalkerDetails(walker.getId()), HttpStatus.OK);
    }

}

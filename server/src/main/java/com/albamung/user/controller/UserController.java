package com.albamung.user.controller;

import com.albamung.exception.CustomException;
import com.albamung.user.dto.UserDto;
import com.albamung.user.entity.User;
import com.albamung.user.mapper.UserMapper;
import com.albamung.user.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Map;

@Api(tags = {"3.User"})
@RestController
@RequestMapping("/user")
@Validated
@Slf4j
public class UserController {
    private final UserService userService;
    private final UserMapper mapper;

    public UserController(UserService userService, UserMapper mapper) {
        this.userService = userService;
        this.mapper = mapper;
    }

    @PostMapping("/signUp")
    public ResponseEntity signup(@RequestBody @Valid UserDto.Signup signUpInfo) {
        User user = mapper.signupToUser(signUpInfo);
        String displayName = userService.signup(user);
        return new ResponseEntity<>(displayName, HttpStatus.CREATED);
    }

    @ApiOperation(value = "사용자 기본 정보 조회", notes = "사용자 기본 정보 수정 때 얹어놓을 정보나, 햄버거 등에서 쓸만한 간단한 정보(이름, 폰, 이멜, 사진, 닉넴)")
    @GetMapping("/myInfo")
    public ResponseEntity getMyInfo(@AuthenticationPrincipal @ApiIgnore User loginUser) {
        if (loginUser == null) throw new CustomException("Please Login First", HttpStatus.FORBIDDEN);
        UserDto.DefaultResponse response = mapper.toDefaultResponse(userService.getUserInfo(loginUser.getId()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity refreshToken(HttpServletResponse response, @RequestHeader("Authorization") String accessToken, @RequestBody String refreshToken) {
        Map<String, String> tokens = userService.refreshToken(accessToken, refreshToken);
        response.addHeader("access", tokens.get("access"));
        response.addHeader("refresh", tokens.get("refresh"));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

//    @GetMapping
//    public ResponseEntity getUsers(@RequestParam(value = "page", required = false) Integer page) {
//        if (page == null) page = 1;
//        Page<User> users = userService.getUserList(page - 1);
//        return new ResponseEntity<>(new PagingResponseDto<>(mapper.usersToResponses(users.getContent()), users), HttpStatus.OK);
//    }

    @ApiOperation(value = "사용자 기본 정보 수정")
    @PutMapping("/editDefault")
    public ResponseEntity putUserDefault(@RequestBody @Valid UserDto.PutDefault request, @AuthenticationPrincipal @ApiIgnore User user) {

        User putUser = mapper.putToUser(request);
        User editedUser = userService.putUserDefault(putUser, user.getId());

        return new ResponseEntity<>(editedUser.getId(), HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 사진 등록 및 수정")
    @GetMapping("/saveProfileImage")
    public ResponseEntity saveProfileImage(@AuthenticationPrincipal User user){
        return new ResponseEntity<>(userService.saveProfileImage(user.getId()),HttpStatus.OK);
    }

    @ApiOperation(value = "사용자 사진 삭제")
    @DeleteMapping("/deleteProfileImage")
    public ResponseEntity deleteProfileImage(@AuthenticationPrincipal User user){
        userService.deleteProfileImage(user.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity deleteUser(@AuthenticationPrincipal @ApiIgnore User user) {
        userService.deleteUser(user.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

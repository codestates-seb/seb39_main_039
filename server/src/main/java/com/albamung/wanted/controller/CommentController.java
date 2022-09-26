package com.albamung.wanted.controller;

import com.albamung.user.entity.User;
import com.albamung.wanted.dto.CommentDto;
import com.albamung.wanted.entity.Comment;
import com.albamung.wanted.mapper.CommentMapper;
import com.albamung.wanted.service.CommentService;
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
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/wanted/{wantedId}/comment")
@Api(tags = {"4.구인글 댓글 관련"})
@Slf4j
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    public CommentController(CommentService commentService, CommentMapper commentMapper) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @ApiOperation(value = "댓글 작성", notes = "응답으로 작성된 댓글의 구인글 ID를 반환")
    @PostMapping
    public ResponseEntity postComment(@AuthenticationPrincipal @ApiIgnore User walker,
                                      @PathVariable @Positive Long wantedId,
                                      @RequestBody @Valid CommentDto.Post request) {
        if (walker == null) walker = User.builder().id(1L).build();
        Comment comment = commentMapper.postToComment(request);
        Comment savedComment = commentService.saveComment(comment, wantedId, walker.getId());

        return new ResponseEntity<>(savedComment.getWanted().getWantedId(), HttpStatus.CREATED);
    }

    @ApiOperation(value = "댓글 수정", notes = "응답으로 수정된 댓글의 구인글 ID를 반환")
    @PutMapping("/{commentId}/edit")
    public ResponseEntity putComment(@AuthenticationPrincipal @ApiIgnore User walker,
                                     @PathVariable Long wantedId,
                                     @PathVariable Long commentId,
                                     @RequestBody @Valid CommentDto.Put request) {
        if (walker == null) walker = User.builder().id(1L).build();
        Comment comment = commentMapper.putToComment(request);
        Comment editedComment = commentService.editComment(comment, commentId, walker.getId());

        return new ResponseEntity<>(editedComment.getWanted().getWantedId(), HttpStatus.OK);
    }

    @ApiOperation(value = "견주의 댓글 글쓴이 폰번호 확인", notes = "응답으로 폰번호를 응답합니다. 해당 글의 견주가 아닌 경우 에러 403")
    @GetMapping("/{commentId}/viewPhoneNumber")
    public ResponseEntity getPhoneNumber(@AuthenticationPrincipal @ApiIgnore User owner,
                                         @PathVariable Long commentId, @PathVariable Long wantedId) {
        if (owner == null) owner = User.builder().id(1L).build();
        return new ResponseEntity<>(commentService.viewPhoneNumber(commentId, owner.getId()), HttpStatus.OK);
    }

    @ApiOperation(value = "댓글 삭제")
    @DeleteMapping("/{commentId}/delete")
    public ResponseEntity deleteComment(@AuthenticationPrincipal @ApiIgnore User walker,
                                        @PathVariable Long commentId,
                                        @PathVariable Long wantedId) {
        if (walker == null) walker = User.builder().id(1L).build();
        commentService.deleteComment(commentId, walker.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ApiOperation(value = "댓글 매칭", notes = "응답으로 매칟왼 구인글 ID를 반환")
    @PutMapping("/{commentId}/match")
    public ResponseEntity matchComment(@AuthenticationPrincipal @ApiIgnore User owner,
                                       @PathVariable Long commentId,
                                       @PathVariable Long wantedId,
                                       @RequestBody boolean match) {
        if (owner == null) owner = User.builder().id(1L).build();
        Comment matchedComment = commentService.matchComment(commentId, wantedId, match, owner.getId());

        return new ResponseEntity<>(matchedComment.getWanted().getWantedId(), HttpStatus.OK);
    }
}

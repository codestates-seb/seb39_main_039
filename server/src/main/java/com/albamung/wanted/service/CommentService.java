package com.albamung.wanted.service;

import com.albamung.exception.CustomException;
import com.albamung.user.service.UserService;
import com.albamung.wanted.entity.Comment;
import com.albamung.wanted.entity.Wanted;
import com.albamung.wanted.repository.CommentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class CommentService {
    private final WantedService wantedService;
    private final UserService userService;
    private final CommentRepository commentRepository;

    public CommentService(WantedService wantedService, UserService userService, CommentRepository commentRepository) {
        this.wantedService = wantedService;
        this.userService = userService;
        this.commentRepository = commentRepository;
    }

    /**
     * 댓글 등록
     */
    public Comment saveComment(Comment comment, Long wantedId, Long walkedId) {
        comment.setWanted(wantedService.verifyWanted(wantedId));
        comment.setWalker(userService.verifyUser(walkedId));
        return commentRepository.save(comment);
    }

    /**
     * 댓글 수정
     */
    public Comment editComment(Comment comment, Long commentId, Long walkerId) {
        Comment targetComment = verifyComment(commentId);
        verifyCommentUser(targetComment, walkerId);
        Optional.ofNullable(comment.getContent()).ifPresent(targetComment::setContent);

        return targetComment;
    }
    /**
     * 댓글 - 구인글 매칭
     */
    public Comment matchComment(Long commentId, Long wantedId, boolean match, Long ownerId){
        Comment targetComment = verifyComment(commentId);
        verifyCommentWanted(targetComment, wantedId);
        
        Wanted targetWanted = wantedService.verifyWanted(wantedId);
        //이미 매칭되어있는데 새로운 매칭을 요청하거나, 매칭되지 않았는데 매칭 해제를 요청할 때
        if(match == targetWanted.isMatched()) throw new CustomException("이미 매칭 됐거나, 해제할 매칭이 없습니다", HttpStatus.BAD_REQUEST);

        wantedService.verifyWantedUser(targetWanted, ownerId);

        targetWanted.setMatched(match);
        targetComment.setMatched(match);

        //true(매칭)일 경우 알바 정보를 산책에 넣어주고, false(매칭 해제)인 경우 알바 정보를 지워줌
        if(match) targetWanted.getWalk().setWalker(targetComment.getWalker());
        else targetWanted.getWalk().setWalker(null);

        return targetComment;
    }

    /**
     * 댓글 삭제
     */

    public void deleteComment(Long commentId, Long walkerId) {
        Comment targetComment = verifyComment(commentId);
        verifyCommentUser(targetComment, walkerId);

        commentRepository.deleteById(targetComment.getCommentId());
    }

    /**
     * 댓글 유효성 검사
     */
    @Transactional(readOnly = true)
    public Comment verifyComment(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(() -> new CustomException("존재하지 않는 댓글입니다", HttpStatus.NO_CONTENT));
    }

    /**
     * 댓글 소유자 검사
     */
    @Transactional(readOnly = true)
    public void verifyCommentUser(Comment comment, Long userId) {
        if (!comment.getWalker().getId().equals(userId))
            throw new CustomException("해당 댓글의 소유자가 아닙니다", HttpStatus.FORBIDDEN);
    }

    /**
     * 댓글과 구인글 매칭 검사
     */
    @Transactional(readOnly = true)
    public void verifyCommentWanted(Comment comment, Long wantedId){
        if(!comment.getWanted().getWantedId().equals(wantedId)) throw new CustomException("해당 댓글은 해당 구인글의 댓글이 아닙니다", HttpStatus.BAD_REQUEST);
    }
}

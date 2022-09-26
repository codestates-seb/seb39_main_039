package com.albamung;

import com.albamung.helper.fileUpload.S3fileService;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class TestController {
    private final S3fileService s3fileService;

    public TestController(S3fileService s3fileService) {
        this.s3fileService = s3fileService;
    }

    @Builder
    @Getter
    public static class Post {
        String coord;
        Integer distance;
    }

    @GetMapping("/signUrl")
    public ResponseEntity postCoord(@RequestBody String fileName){
        String dirName = "image/pet/";

        return new ResponseEntity(s3fileService.save(fileName),HttpStatus.CREATED);
    }

//    @GetMapping("/coord/{coordId}")
//    public ResponseEntity getCoord(@PathVariable Long coordId) {
//        Coord coord = coordRepository.findById(coordId).orElseThrow();
//
//        return new ResponseEntity(Arrays.toString(coord.getCoord().getCoordinates()), HttpStatus.OK);
//    }
}

// point들을 하나씩 입력한다
// 동선에 대한 get 요청이 오면 point들을 모아서 string으로 보내준다.
// 산책이 끝나면 point들을 모아서 lineString으로 만들어 walk에 저장한다.

package com.albamung;

import com.albamung.walk.entity.Coord;
import com.albamung.walk.repository.CoordRepository;
import lombok.Builder;
import lombok.Getter;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.io.ParseException;
import org.locationtech.jts.io.WKTReader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping("/test")
public class TestController {
    private final CoordRepository coordRepository;

    public TestController(CoordRepository coordRepository) {
        this.coordRepository = coordRepository;
    }

    @Builder
    @Getter
    public static class Post {
        String coord;
        Integer distance;
    }

    @PostMapping("/coord")
    public ResponseEntity postCoord(@RequestBody Post request) throws ParseException {
        Coord coord = new Coord();

        String pointWKT = String.format("POINT(%s)", request.getCoord());
        Point point = (Point) new WKTReader().read(pointWKT);
        coord.setPoint(point);
        Coord save = coordRepository.save(coord);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/coord/{coordId}")
    public ResponseEntity getCoord(@PathVariable Long coordId) {
        Coord coord = coordRepository.findById(coordId).orElseThrow();

        return new ResponseEntity(Arrays.toString(coord.getCoord().getCoordinates()), HttpStatus.OK);
    }
}

// point들을 하나씩 입력한다
// 동선에 대한 get 요청이 오면 point들을 모아서 string으로 보내준다.
// 산책이 끝나면 point들을 모아서 lineString으로 만들어 walk에 저장한다.

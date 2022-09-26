package com.albamung.wanted.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "CITY", indexes = @Index(columnList = "name, regionName"))
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cityId;


    private String name;


    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Region regionName;

    public enum Region {
        서울(1),
        경기(2),
        인천(3),
        강원(4),
        대전(5),
        세종(6),
        충남(7),
        충북(8),
        부산(9),
        울산(10),
        경남(11),
        경북(12),
        대구(13),
        광주(14),
        전남(15),
        전북(16),
        제주(17);
        private final int id;

        Region(int id) {
            this.id = id;
        }

        public int getId() {
            return id;
        }
    }
}
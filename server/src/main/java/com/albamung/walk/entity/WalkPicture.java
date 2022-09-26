package com.albamung.walk.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WalkPicture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walkPictureId;

    @Column(nullable = false)
    private String link;

    @ManyToOne
    @JoinColumn(name = "WALK_ID")
    private Walk walk;
}

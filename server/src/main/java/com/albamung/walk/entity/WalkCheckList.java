package com.albamung.walk.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
public class WalkCheckList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "WALK_ID", nullable = false)
    private Walk walk;

    private boolean checked;

    @Column(length = 255, nullable = false)
    private String content;

    public WalkCheckList(Walk walk, String content) {
        this.walk = walk;
        this.content = content;
    }
}

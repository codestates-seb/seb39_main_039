package com.albamung.walk.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity(name = "walk_check")
@Data
@NoArgsConstructor
@DynamicUpdate
@DynamicInsert
public class WalkCheckList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long walkCheckId;

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

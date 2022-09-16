package com.albamung.walk.entity;

import com.albamung.walk.entity.Walk;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
    @JoinColumn(name = "WALK_ID")
    private Walk walk;

    private boolean checked;

    private String content;

    public WalkCheckList(Walk walk, String content){
        this.walk =walk;
        this.content = content;
    }
}

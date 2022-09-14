package com.albamung.checklist.entity;

import com.albamung.user.entity.User;
import com.albamung.walk.entity.Walk;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CheckList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    @JoinColumn(name = "OWNER_ID")
    private User owner;
}

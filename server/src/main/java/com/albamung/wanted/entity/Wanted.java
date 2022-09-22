package com.albamung.wanted.entity;

import com.albamung.helper.audit.BaseEntityDate;
import com.albamung.user.entity.User;
import com.albamung.walk.entity.Walk;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@DynamicInsert
@DynamicUpdate
public class Wanted extends BaseEntityDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wantedId;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "WALK_ID")
    private Walk walk;

    private String location;

    private int pay;
    private boolean matched;

    @OneToMany(mappedBy = "wanted")
    private List<Comment> commentList;
}

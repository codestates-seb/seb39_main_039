package com.albamung.wanted.entity;

import com.albamung.helper.audit.BaseEntityDate;
import com.albamung.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@DynamicInsert
@DynamicUpdate
public class Comment extends BaseEntityDate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String content;
    private boolean matched;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User walker;

    @ManyToOne
    @JoinColumn(name = "WANTED_ID")
    private Wanted wanted;
}

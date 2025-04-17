package com.CLOUDBALANCE.BACKEND.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"users"})
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private Long accountNo;
    @Column(unique = true,nullable = false)
    private String name;
    @Column(unique = true,nullable = false)
    private String arnNo;

    @ManyToMany(mappedBy = "accounts")
    @JsonIgnore
    private Set<UserAuthEntity> users=new HashSet<>();
}

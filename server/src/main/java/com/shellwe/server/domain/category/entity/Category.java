package com.shellwe.server.domain.category.entity;

import com.shellwe.server.domain.types.category.ProductCategory;
import com.shellwe.server.domain.types.category.TalentCategory;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Table(name = "CATEGORY")
@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CATEGORY_ID")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "PRODUCT_CATEGORY")
    private ProductCategory productCategory;

    @Enumerated(EnumType.STRING)
    @Column(name = "TALENT_CATEGORY")
    private TalentCategory talentCategory;
}

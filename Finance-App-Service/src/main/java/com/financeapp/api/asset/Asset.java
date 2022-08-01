package com.financeapp.api.asset;


import org.apache.hc.core5.http.ParseException;

import javax.persistence.*;
import java.io.IOException;
import java.text.DecimalFormat;
import java.time.LocalDate;

@Entity
@Table
public class Asset {

    @Id
    @SequenceGenerator(
            name = "asset_sequence",
            sequenceName = "asset_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "asset_sequence"
    )
    private Long id;
    private String label;
    private double shares;
    private double initialPrice;
    @Transient
    private double updatedPrice;

    @Transient
    private double allTimeChange;

    @Transient
    private static final DecimalFormat df = new DecimalFormat("0.00");

    private LocalDate purchased;


    public Asset() {
    }

    public Asset(String label, double shares, double initialPrice, LocalDate purchased) {
        this.label = label;
        this.shares = shares;
        this.initialPrice = initialPrice;
        this.purchased = purchased;
    }

    public Asset(Long id, String label, double shares, double initialPrice, LocalDate purchased, double updatedPrice) {
        this.id = id;
        this.label = label;
        this.shares = shares;
        this.initialPrice = initialPrice;
        this.purchased = purchased;
        this.updatedPrice = updatedPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public double getShares() {
        return shares;
    }

    public void setShares(double shares) {
        this.shares = shares;
    }

    public double getInitialPrice() {
        return initialPrice;
    }

    public void setInitialPrice(double initialPrice) {
        this.initialPrice = initialPrice;
    }

    public double getUpdatedPrice(){
        return this.updatedPrice;
    }

    public void setUpdatedPrice(double updatedPrice) {
        this.updatedPrice = updatedPrice;
    }

    public LocalDate getPurchased() {
        return purchased;
    }

    public void setPurchased(LocalDate purchased) {
        this.purchased = purchased;
    }

    public double getAllTimeChange() throws IOException, ParseException {
        double change = ((this.getUpdatedPrice() - this.getInitialPrice()) / this.getInitialPrice()) * 100;
        return 0;
    }

    public void setAllTimeChange(double allTimeChange) {
        this.allTimeChange = allTimeChange;
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", label='" + label + '\'' +
                ", shares=" + shares +
                ", initialPrice=" + initialPrice +
                ", purchased=" + purchased +
                '}';
    }
}

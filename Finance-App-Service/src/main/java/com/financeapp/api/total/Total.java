package com.financeapp.api.total;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table
public class Total {

    @Id
    @SequenceGenerator(
            name="total_sequence",
            sequenceName="total_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "total_sequence"
    )
    private Long id;

    private double amount;

    private LocalDate date;

    public Total() {
    }

    public Total(double amount) {
        this.amount = amount;
        this.date = LocalDate.now();
    }

    public Total(Long id, double amount) {
        this.id = id;
        this.amount = amount;
        this.date = LocalDate.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "Total{" +
                "id=" + id +
                ", amount=" + amount +
                ", date=" + date +
                '}';
    }
}

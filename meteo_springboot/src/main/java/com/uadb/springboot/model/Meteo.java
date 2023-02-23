package com.uadb.springboot.model;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="meteo")
public class Meteo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    @Column(name="region")
    private String region;

    @Column(name="temperature_matin")
    private String temperature_matin;

    @Column(name = "temperature_soir")
    private String temperature_soir;

    @Column(name = "date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;

    public String getId() {
        return id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getTemperature_matin() {
        return temperature_matin;
    }

    public void setTemperature_matin(String temperature_matin) {
        this.temperature_matin = temperature_matin;
    }

    public String getTemperature_soir() {
        return temperature_soir;
    }

    public void setTemperature_soir(String temperature_soir) {
        this.temperature_soir = temperature_soir;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    
    
}

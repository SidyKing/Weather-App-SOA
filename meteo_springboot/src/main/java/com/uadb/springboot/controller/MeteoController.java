package com.uadb.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.uadb.springboot.repository.MeteoRepository;
import com.uadb.springboot.model.Meteo;
import com.uadb.springboot.exception.ResourceNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Date;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/")
public class MeteoController {

    @Autowired
    private MeteoRepository meteoRepository;

    @GetMapping("/meteo")
    public List<Meteo> getAllMeteo() {
        return meteoRepository.findAll();
    }

    @PostMapping("/meteo")
    public Meteo createMeteo(@RequestBody Meteo meteo) {
        return meteoRepository.save(meteo);
    }

    @GetMapping("/meteo/{id}")
    public ResponseEntity<Meteo> getMeteoById(@PathVariable String id) {
        Meteo meteo = meteoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meteo not exist with id :" + id));
        return ResponseEntity.ok(meteo);
    }

    @PostMapping("/meteo/date")
    public List<Meteo> getMeteoByDate(@RequestBody Meteo meteoDetails) {
        Date date = meteoDetails.getDate();
        List<Meteo> meteo = meteoRepository.findByDate(date);
        return meteo;
    }
    @PostMapping("/meteo/region")
    public List<Meteo> getMeteoByRegion(@RequestBody Meteo meteoDetails) {
        String region = meteoDetails.getRegion();
        List<Meteo> meteo = meteoRepository.findByRegion(region);
        return meteo;
    }
    
    @PutMapping("/meteo/{id}")
    public ResponseEntity<Meteo> updateMeteo(@PathVariable String id, @RequestBody Meteo meteoDetails) {
        Meteo meteo = meteoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meteo not exist with id :" + id));
        
        meteo.setRegion(meteoDetails.getRegion());
        meteo.setTemperature_matin(meteoDetails.getTemperature_matin());
        meteo.setTemperature_soir(meteoDetails.getTemperature_soir());
        meteo.setDate(meteoDetails.getDate());
        Meteo updatedMeteo = meteoRepository.save(meteo);
        return ResponseEntity.ok(updatedMeteo);
    }

    @DeleteMapping("/meteo/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteMeteo(@PathVariable String id) {
        Meteo meteo = meteoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("meteo not exist with id :" + id));
        
        meteoRepository.delete(meteo);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}

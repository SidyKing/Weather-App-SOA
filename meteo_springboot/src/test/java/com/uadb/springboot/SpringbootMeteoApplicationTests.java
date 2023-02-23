package com.uadb.springboot;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import com.uadb.springboot.model.Meteo;
import com.uadb.springboot.repository.MeteoRepository;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class SpringbootMeteoApplicationTests {

	@Autowired
	MeteoRepository meteoRepository;

	@Test
	void getAllMeteo() {
		assertNotNull(meteoRepository.findAll());
	}

	@Test
	void createMeteo() {
		Meteo meteo = new Meteo();
		meteo.setRegion("Kaolack");
		meteo.setTemperature_matin("35");
		meteo.setTemperature_soir("30");
		Meteo met = meteoRepository.save(meteo);

		assertNotNull(met);
	}


}

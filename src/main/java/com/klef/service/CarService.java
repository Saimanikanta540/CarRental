package com.klef.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.model.Car;
import com.klef.repository.CarRepository;

@Service
public class CarService {

	  @Autowired
	  private CarRepository carRepo;
	  
	  public String addCar(Car c) {
	    carRepo.save(c);
	    return "Car Data Inserted Successfully...!!!";
	  }

	  public List<Car> viewAllCars() {
	    return carRepo.findAll();
	  }

	  public Car viewCarById(Long id) {
	    Optional<Car> car = carRepo.findById(id);
	    return car.orElse(null);
	  }

	  public String updateCar(Long id, Car car) {
	    Optional<Car> existingCar = carRepo.findById(id);
	    
	    if(existingCar.isPresent()) {
	      Car c = existingCar.get();
	      c.setName(car.getName());
	      c.setBrand(car.getBrand());
	      c.setPricePerDay(car.getPricePerDay());
	      c.setStatus(car.getBrand());
          c.setOwner(car.getOwner());
	      
	      carRepo.save(c);
	      return "Car details Updated Successfully";
	    }
	    else
	      return "Car ID Not Found";
	  }

	  public String deleteCar(Long id) {
	    Optional<Car> car = carRepo.findById(id);
	    if(car.isPresent()) {
	      carRepo.deleteById(id);
	      return "Car With ID " + id + " Deleted Successfully...!!!";
	    }
	    else
	      return "Car ID Not Found";
	  }
	  
	  public List<Car> findByOwnerId(Long id){
		  List<Car> cars = carRepo.findByOwnerId(id);
		  return cars;
	  }
}

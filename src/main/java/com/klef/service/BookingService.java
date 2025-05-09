package com.klef.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.klef.model.Booking;
import com.klef.repository.BookingRepository;

@Service
public class BookingService {

	  @Autowired
	  private BookingRepository bookingRepo;
	  
	  public String addBooking(Booking b) {
		  bookingRepo.save(b);
	    return "Booking Data Inserted Successfully...!!!";
	  }


	  public List<Booking> viewAllStudents() {
	    return bookingRepo.findAll();
	  }

	  public Booking viewBookingById(Long id) {
	    Optional<Booking> booking = bookingRepo.findById(id);
	    return booking.orElse(null);
	  }
	  
	  public List<Booking> findByCustomerId(Long id){
		  List<Booking> bookings = bookingRepo.findByCustomerId(id);
		  return bookings;
	  }

	  public String updateBooking(Long id, Booking booking) {
	    Optional<Booking> existingBooking = bookingRepo.findById(id);
	    
	    if(existingBooking.isPresent()) {
	      Booking stu = existingBooking.get();
	      stu.setCar(booking.getCar());
	      stu.setCustomer(booking.getCustomer());
	      stu.setEndDate(booking.getEndDate());
	      stu.setStartDate(booking.getStartDate());
	      stu.setStatus(booking.getStatus());
	      stu.setTotalPrice(booking.getTotalPrice());
	      
	      bookingRepo.save(stu);
	      return "Booking Updated Successfully";
	    }
	    else
	      return "Booking ID Not Found";
	  }

	  public String deleteBookig(Long id) {
	    Optional<Booking> student = bookingRepo.findById(id);
	    if(student.isPresent()) {
	      bookingRepo.deleteById(id);
	      return "Booking  With ID " + id + " Deleted Successfully...!!!";
	    }
	    else
	      return "Booking ID Not Found";
	  }
	  
	  
}

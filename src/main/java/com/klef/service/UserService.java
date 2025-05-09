package com.klef.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.klef.model.User;
import com.klef.repository.UserRepository;

@Service
public class UserService {

	  @Autowired
	  private UserRepository userRepo;
	  

	  public String addUser(User u) {
	    userRepo.save(u);
	    return "User Data Inserted Successfully...!!!";
	  }

	  public List<User> viewAllUser() {
	    return userRepo.findAll();
	  }
	  
	  public  User findByEmail(String email){
		  Optional<User> user= userRepo.findByEmail(email);
		return user.orElse(null); 
	  }

	  public User viewUserById(Long id) {
	    Optional<User> user = userRepo.findById(id);
	    return user.orElse(null);
	  }

	  public String updateUser(Long sid, User user) {
	    Optional<User> existingUser = userRepo.findById(sid);
	    
	    if(existingUser.isPresent()) {
	      User u = existingUser.get();
	      u.setName(user.getName());
	      u.setGender(user.getGender());
	      u.setAge(user.getAge());
	      u.setPassword(user.getPassword());
	      u.setEmail(user.getEmail());
	      if(user.getRole().equals("ADMIN"))
	    	  return "Permission Declined ";
	      else
	          u.setRole(user.getRole());
	      userRepo.save(u);
	      return "User Updated Successfully";
	    }
	    else
	      return "User ID Not Found";
	  }

	  public String deleteUser(Long id) {
	    Optional<User> user = userRepo.findById(id);
	    if(user.isPresent()) {
	      userRepo.deleteById(id);
	      return "User With ID " + id + " Deleted Successfully...!!!";
	    }
	    else
	      return "User ID Not Found";
	  }
}

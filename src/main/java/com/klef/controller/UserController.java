package com.klef.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.klef.model.User;
import com.klef.service.UserService;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*")
public class UserController {
	
	 @Autowired
	  private UserService userService;
	  
	  @GetMapping("/")
	  public String main() {
	    return "Backend is Running Successfully...!!!";
	  }
	  
	  @PostMapping("/addUser")
	  public String addUser(@RequestBody User u) {
	    return userService.addUser(u);
	  }
	  
	  @GetMapping("viewallusers")
	  public List<User> viewallUsers() {
	    return userService.viewAllUser();
	  }
	  
	  @GetMapping("viewUserByid/{id}")
	  public User getStudentById(@PathVariable("id") Long id) {
	    return userService.viewUserById(id);
	  }
	  
	  @PutMapping("updateUser/{id}")
	  public String updateStudent(@PathVariable("id") Long id, @RequestBody User u) {
	    return userService.updateUser(id, u);
	  }
	  
	  @DeleteMapping("deleteUser/{id}")
	  public String deleteUser(@PathVariable("id") Long id) {
	    return userService.deleteUser(id);
	  }
}

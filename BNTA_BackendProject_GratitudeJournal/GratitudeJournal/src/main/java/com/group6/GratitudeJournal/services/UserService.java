package com.group6.GratitudeJournal.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.group6.GratitudeJournal.models.JournalEntry;
import com.group6.GratitudeJournal.models.User;
import com.group6.GratitudeJournal.models.UserDTO;
import com.group6.GratitudeJournal.repositories.JournalEntryRepository;
import com.group6.GratitudeJournal.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    JournalEntryRepository journalEntryRepository;

    //find all users

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User getUserById(long id){
        return userRepository.findById(id).get();
    }

    public User getUserByUserDTO(UserDTO userDTO){
        return userRepository.findByNameAndEmailAddress(userDTO.getName(), userDTO.getEmailAddress());
    }

    public User createUser(User user){
        return userRepository.save(user);
    }

    public void deleteUser(long id) {
        User userToDelete = userRepository.findById(id).orElse(null);
        if (userToDelete != null) {
            // Delete associated journal entries first
            List<JournalEntry> userJournalEntries = userToDelete.getJournalEntries();
            for (JournalEntry journalEntry : userJournalEntries) {
                journalEntryRepository.deleteById(journalEntry.getId());
            }
            // Then delete the user
            userRepository.deleteById(id);
        }
    }

    public User updateUser(long id, UserDTO userDTO){
        User updatedUser = userRepository.findById(id).get();

        if (!updatedUser.getName().equals(userDTO.getName())){
            updatedUser.setName(userDTO.getName());
        }

        if (!updatedUser.getEmailAddress().equals(userDTO.getEmailAddress())){
            updatedUser.setEmailAddress(userDTO.getEmailAddress());
        }
        userRepository.save(updatedUser);
        return updatedUser;
    }


}

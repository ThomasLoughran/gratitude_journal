package com.group6.GratitudeJournal.repositories;

import com.group6.GratitudeJournal.models.JournalEntry;
import com.group6.GratitudeJournal.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Query
    User findByNameAndEmailAddress(String name, String email_address);

}

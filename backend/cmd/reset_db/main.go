package main

import (
	"backend/config"
	"backend/database"
	"backend/models"
	"log"
)

func main() {
	cfg := config.LoadConfig()
	database.Connect(cfg)

	// Drop tables manually to force re-seed
	log.Println("Dropping tables to force re-seed...")
	database.DB.Migrator().DropTable(&models.Reservation{}, &models.Court{}, &models.Timeslot{}, &models.Mentor{}, &models.MentorSchedule{})

	// Re-migrate
	database.DB.AutoMigrate(&models.Reservation{}, &models.Court{}, &models.Timeslot{}, &models.Mentor{}, &models.MentorSchedule{})

	// Seed
	database.Seed(database.DB)
	log.Println("Database reset and seeded successfully.")
}

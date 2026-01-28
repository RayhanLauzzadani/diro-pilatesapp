package database

import (
	"backend/config"
	"backend/models"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect(cfg *config.Config) {
	var err error
	dsn := cfg.DatabaseURL

	if dsn == "" {
		// Fallback for local testing if env is not perfect
		dsn = "host=localhost user=postgres password=postgres dbname=diro_pilates port=5432 sslmode=disable"
	}

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Printf("Failed to connect to database: %v", err)
		log.Println("Is PostgreSQL running? Check your .env configuration.")
		// We don't panic here to allow app to start even if DB fails initially (good for debugging)
		return
	}

	log.Println("Connected to database successfully")

	// Auto Migrate
	err = DB.AutoMigrate(
		&models.Court{},
		&models.Timeslot{},
		&models.Mentor{},
		&models.MentorSchedule{},
		&models.Reservation{},
	)
	if err != nil {
		log.Printf("Failed to migrate database: %v", err)
	} else {
		log.Println("Database migration completed")
	}
}

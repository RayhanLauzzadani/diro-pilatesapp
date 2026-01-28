package database

import (
	"backend/models"
	"log"

	"gorm.io/gorm"
)

func Seed(db *gorm.DB) {
	// Check if data already exists
	var count int64
	db.Model(&models.Court{}).Count(&count)
	if count > 0 {
		log.Println("Data already seeded.")
		return
	}

	log.Println("Seeding data...")

	// 1. Seed Courts
	courts := []models.Court{
		{ID: 1, Name: "Reformer Room A", Description: "Ruangan dengan 6 unit Reformer premium", Capacity: 6, Price: 150000, ImageURL: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400"},
		{ID: 2, Name: "Reformer Room B", Description: "Ruangan dengan 4 unit Reformer untuk kelas kecil", Capacity: 4, Price: 175000, ImageURL: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=400"},
		{ID: 3, Name: "Private Suite", Description: "Ruangan privat untuk sesi 1-on-1", Capacity: 1, Price: 350000, ImageURL: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400"},
		{ID: 4, Name: "Main Studio", Description: "Studio utama dengan berbagai equipment", Capacity: 8, Price: 175000, ImageURL: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400"},
		{ID: 5, Name: "Cadillac Room", Description: "Ruangan khusus Cadillac training", Capacity: 4, Price: 200000, ImageURL: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=400"},
		{ID: 6, Name: "Garden Studio", Description: "Studio dengan pemandangan taman", Capacity: 10, Price: 120000, ImageURL: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=400"},
		{ID: 7, Name: "Zen Room", Description: "Ruangan untuk yoga dan meditasi", Capacity: 8, Price: 100000, ImageURL: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=400"},
		{ID: 8, Name: "Beginner Studio", Description: "Studio khusus untuk pemula", Capacity: 6, Price: 100000, ImageURL: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=400"},
	}
	db.Create(&courts)

	// 2. Seed Timeslots
	timeslots := []models.Timeslot{
		{ID: 1, StartTime: "06:00", EndTime: "07:00", Label: "06:00 - 07:00"},
		{ID: 2, StartTime: "07:00", EndTime: "08:00", Label: "07:00 - 08:00"},
		{ID: 3, StartTime: "08:00", EndTime: "09:00", Label: "08:00 - 09:00"},
		{ID: 4, StartTime: "09:00", EndTime: "10:00", Label: "09:00 - 10:00"},
		{ID: 5, StartTime: "10:00", EndTime: "11:00", Label: "10:00 - 11:00"},
		{ID: 6, StartTime: "11:00", EndTime: "12:00", Label: "11:00 - 12:00"},
		{ID: 7, StartTime: "13:00", EndTime: "14:00", Label: "13:00 - 14:00"},
		{ID: 8, StartTime: "14:00", EndTime: "15:00", Label: "14:00 - 15:00"},
		{ID: 9, StartTime: "15:00", EndTime: "16:00", Label: "15:00 - 16:00"},
		{ID: 10, StartTime: "16:00", EndTime: "17:00", Label: "16:00 - 17:00"},
		{ID: 11, StartTime: "17:00", EndTime: "18:00", Label: "17:00 - 18:00"},
		{ID: 12, StartTime: "18:00", EndTime: "19:00", Label: "18:00 - 19:00"},
		{ID: 13, StartTime: "19:00", EndTime: "20:00", Label: "19:00 - 20:00"},
		{ID: 14, StartTime: "20:00", EndTime: "21:00", Label: "20:00 - 21:00"},
	}
	db.Create(&timeslots)

	// 3. Seed Mentors
	mentors := []models.Mentor{
		{Name: "Coach Lisa", Specialty: "Reformer Specialist", Bio: "Certified instructor with 5 years experience.", PhotoURL: "/images/mentor1.jpg"},
		{Name: "Coach Dewi", Specialty: "Mat Pilates Expert", Bio: "Focus on posture and core strength.", PhotoURL: "/images/mentor2.jpg"},
	}
	db.Create(&mentors)

	log.Println("Seeding completed successfully.")
}

package models

import "time"

type Reservation struct {
	ID              uint      `gorm:"primaryKey" json:"id"`
	BookingCode     string    `json:"booking_code" gorm:"unique"`
	CourtID         uint      `json:"court_id"`
	Court           Court     `gorm:"foreignKey:CourtID" json:"court,omitempty"`
	TimeslotID      uint      `json:"timeslot_id"`
	Timeslot        Timeslot  `gorm:"foreignKey:TimeslotID" json:"timeslot,omitempty"`
	MentorID        *uint     `json:"mentor_id"` // Pointer to allow null
	Mentor          Mentor    `gorm:"foreignKey:MentorID" json:"mentor,omitempty"`
	ReservationDate time.Time `json:"reservation_date"` // YYYY-MM-DD
	CustomerName    string    `json:"customer_name"`
	CustomerEmail   string    `json:"customer_email"`
	CustomerPhone   string    `json:"customer_phone"`
	PaymentMethod   string    `json:"payment_method"` // bank_transfer, credit_card, qris, venue
	PaymentStatus   string    `json:"payment_status"` // pending, paid, failed, expired
	PaymentID       string    `json:"payment_id"`     // Xendit ID
	Amount          float64   `json:"amount"`
	CreatedAt       time.Time `json:"created_at"`
	UpdatedAt       time.Time `json:"updated_at"`
}

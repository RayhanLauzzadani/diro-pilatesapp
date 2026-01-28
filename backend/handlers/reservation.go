package handlers

import (
	"backend/config"
	"backend/database"
	"backend/models"
	"backend/services"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type CreateReservationRequest struct {
	CourtID       uint   `json:"court_id" binding:"required"`
	TimeslotID    uint   `json:"timeslot_id" binding:"required"`
	MentorID      *uint  `json:"mentor_id"`
	Date          string `json:"date" binding:"required"`
	PaymentMethod string `json:"payment_method" binding:"required"`
	BankID        string `json:"bank_id"`
	CustomerName  string `json:"customer_name"`
	CustomerEmail string `json:"customer_email"`
	CustomerPhone string `json:"customer_phone"`
}

func CreateReservation(c *gin.Context) {
	var req CreateReservationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var court models.Court
	if err := database.DB.First(&court, req.CourtID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Court not found"})
		return
	}

	parsedDate, err := time.Parse("2006-01-02", req.Date)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid date format. Use YYYY-MM-DD"})
		return
	}

	bookingCode := fmt.Sprintf("PIL-%s-%04d", parsedDate.Format("20060102"), rand.Intn(10000))

	reservation := models.Reservation{
		BookingCode:     bookingCode,
		CourtID:         req.CourtID,
		TimeslotID:      req.TimeslotID,
		MentorID:        req.MentorID,
		ReservationDate: parsedDate,
		CustomerName:    req.CustomerName,
		CustomerEmail:   req.CustomerEmail,
		CustomerPhone:   req.CustomerPhone,
		PaymentMethod:   req.PaymentMethod,
		PaymentStatus:   "paid",
		Amount:          court.Price,
		CreatedAt:       time.Now(),
		UpdatedAt:       time.Now(),
	}

	reservation.PaymentStatus = "paid"

	if req.CourtID == 1 {
		reservation.Amount = 1
	}

	if err := database.DB.Create(&reservation).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create reservation: " + err.Error()})
		return
	}

	cfg := config.LoadConfig()
	midtransService := services.NewMidtransService(cfg)

	snapToken, err := midtransService.GenerateSnapToken(
		reservation.BookingCode,
		int64(reservation.Amount),
		reservation.CustomerName,
		reservation.CustomerEmail,
	)

	if err != nil {
		fmt.Printf("Midtrans Error: %v\n", err)
	}

	c.JSON(http.StatusCreated, gin.H{
		"message":    "Reservation created successfully",
		"data":       reservation,
		"snap_token": snapToken,
	})
}

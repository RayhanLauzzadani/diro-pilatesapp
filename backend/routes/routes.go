package routes

import (
	"backend/handlers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok"})
		})

		// Public Data Routes
		api.GET("/courts", handlers.GetCourts)
		api.GET("/courts/:id", handlers.GetCourt)
		api.GET("/timeslots", handlers.GetTimeslots)
		api.GET("/mentors", handlers.GetMentors)

		// Booking Routes
		api.POST("/reservations", handlers.CreateReservation)
	}
}

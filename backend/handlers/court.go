package handlers

import (
	"backend/database"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetCourts(c *gin.Context) {
	var courts []models.Court
	result := database.DB.Find(&courts)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, courts)
}

func GetCourt(c *gin.Context) {
	id := c.Param("id")
	var court models.Court

	result := database.DB.First(&court, id)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Court not found"})
		return
	}

	c.JSON(http.StatusOK, court)
}

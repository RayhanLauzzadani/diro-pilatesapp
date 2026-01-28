package main

import (
	"backend/config"
	"backend/database"
	"backend/routes"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Load Config
	cfg := config.LoadConfig()

	// 2. Connect Database
	database.Connect(cfg)

	// 3. Seed Data
	database.Seed(database.DB)

	// 4. Setup Router
	r := gin.Default()

	// CORS Config
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", cfg.FrontendURL},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// 5. Setup Routes
	routes.SetupRoutes(r)

	// 6. Run Server
	log.Printf("Server running on port %s", cfg.Port)
	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Failed to run server: %v", err)
	}
}

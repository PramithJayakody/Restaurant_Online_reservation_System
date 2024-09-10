package com.example.restaurant_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "services")
public class RestaurantService {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceId;

    private String serviceName;
    private String serviceType;
    private String description;
    private Double price;
    private String location;
    private String availability;

    // Default constructor
    public RestaurantService() {}

    // Constructor with parameters
    public RestaurantService(String serviceName, String serviceType, String description, Double price, String location, String availability) {
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.description = description;
        this.price = price;
        this.location = location;
        this.availability = availability;
    }

      // Getters and Setters
      public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }
}
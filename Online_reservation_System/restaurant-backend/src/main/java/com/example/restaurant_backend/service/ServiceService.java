package com.example.restaurant_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.restaurant_backend.repository.ServiceRepository;
import com.example.restaurant_backend.model.RestaurantService;

@Service
public class ServiceService {

    @Autowired
    private ServiceRepository serviceRepository;

    public List<RestaurantService> searchServices(String serviceName, String serviceType, String location) {
        return serviceRepository.findByServiceNameContainingAndServiceTypeContainingAndLocationContaining(
            serviceName, serviceType, location);
    }
}
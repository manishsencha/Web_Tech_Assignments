package com.assignment.webt.controller;

import com.assignment.webt.dto.PurchaseResponseDTO;
import com.assignment.webt.model.Purchase;
import com.assignment.webt.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping("/api")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @PostMapping(value = "/purchase", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<PurchaseResponseDTO> purchase(@RequestBody Purchase purchase) {
        PurchaseResponseDTO purchaseResponseDTO = purchaseService.purchase(purchase);
         return new ResponseEntity<>(purchaseResponseDTO, HttpStatus.CREATED);
    }
}
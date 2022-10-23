package com.assignment.webt.service;

import com.assignment.webt.dto.PurchaseResponseDTO;
import com.assignment.webt.model.Purchase;

public interface PurchaseService {

    PurchaseResponseDTO purchase(Purchase purchase);
}

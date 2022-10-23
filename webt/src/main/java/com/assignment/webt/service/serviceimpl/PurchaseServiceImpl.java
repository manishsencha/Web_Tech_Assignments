package com.assignment.webt.service.serviceimpl;

import com.assignment.webt.dto.PurchaseResponseDTO;
import com.assignment.webt.model.Purchase;
import com.assignment.webt.repo.PurchaseRepo;
import com.assignment.webt.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PurchaseServiceImpl implements PurchaseService {

    @Autowired
    private PurchaseRepo purchaseRepo;

    @Override
    public PurchaseResponseDTO purchase(Purchase purchase){
        purchaseRepo.save(purchase);
        PurchaseResponseDTO purchaseResponseDTO = new PurchaseResponseDTO();
        purchaseResponseDTO.setName(purchase.getName());
        purchaseResponseDTO.setEmail(purchase.getEmail());
        purchaseResponseDTO.setTotalBill(purchase.getTotalAmount());
        return purchaseResponseDTO;
    }

}

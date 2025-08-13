package com.vinhtt.ecommerce.dto;

import lombok.Data;

@Data
public class PurchaseResponse {
    private final String orderTrackingNumber;
//    @Data sinh ra getters, setters, toString, equals, hashCode.
//    Sinh constructor cho các final fields hoặc fields có @NonNull.
//    Nếu muốn custom constructor thì phải code thủ công hoặc dùng thêm annotation @AllArgsConstructor, @RequiredArgsConstructor.
}

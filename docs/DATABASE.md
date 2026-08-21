# Database Design & Schema — MiraiProcure (未来プロキュア)

## Models & Entities
- `Organization` & `User` (Roles: ADMIN, PROCUREMENT_MANAGER, PROCUREMENT_OFFICER, FINANCE_MANAGER, INVENTORY_MANAGER, APPROVER, SUPPLIER)
- `Supplier`, `SupplierDocument`, `SupplierRisk`
- `Category`, `Product`
- `PurchaseRequest`, `PurchaseRequestItem`
- `RFQ`, `RFQItem`, `RFQSupplier`
- `Quotation`, `QuotationItem`, `QuoteAnalysis`, `VendorScore`
- `Approval`
- `PurchaseOrder`, `PurchaseOrderItem`
- `Inventory`, `InventoryTransaction`
- `Invoice`
- `Contract`
- `Notification`
- `AuditLog`
- `AIConversation`, `AIMessage`, `AIAction`, `AIRecommendation`

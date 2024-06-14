package lk.ijse.gdse66.helloshoes.service.impl;

import lk.ijse.gdse66.helloshoes.dto.*;
import lk.ijse.gdse66.helloshoes.entity.AdminPanel;
import lk.ijse.gdse66.helloshoes.entity.Inventory;
import lk.ijse.gdse66.helloshoes.entity.SaleDetails;
import lk.ijse.gdse66.helloshoes.repository.*;
import lk.ijse.gdse66.helloshoes.service.SaleService;
import lk.ijse.gdse66.helloshoes.service.exception.DuplicateRecordException;
import lk.ijse.gdse66.helloshoes.service.exception.NotFoundException;
import lk.ijse.gdse66.helloshoes.service.util.IdGenerator;
import lk.ijse.gdse66.helloshoes.service.util.LoyaltyLevel;
import lk.ijse.gdse66.helloshoes.service.util.Tranformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class SalesServiceImpl implements SaleService {

    @Autowired
    SaleRepo saleRepo;

    @Autowired
    CustomerRepo cusRepo;

    @Autowired
    InventoryRepo inventoryRepo;

    @Autowired
    SaleDetailRepo detailRepo;

    @Autowired
    AdminPanelRepo adminPanelRepo;

    @Autowired
    Tranformer tranformer;

    @Autowired
    IdGenerator generator;

    @Override
    public void saveSales(SalesDTO dto) {
        saleRepo.findById(dto.getOrderNo()).ifPresentOrElse(
                sales -> {
                    throw new DuplicateRecordException("Order Already Exist");
                },
                () -> {
                    if (dto.getSaleDetails().isEmpty()) {
                        throw new NotFoundException("Items not added to save Order");
                    }
                    List<SaleDetailsDTO> itms = dto.getSaleDetails();

                    for (SaleDetailsDTO itm : itms) {
                        inventoryRepo.findById(itm.getOrderDetailPK().getItemCode())
                                .ifPresentOrElse(inventory -> {
                                    Integer qtyHand = inventory.getQty();
                                    Integer balanceQty = qtyHand - itm.getItmQTY();
                                    inventory.setQty(balanceQty);
                                    if (balanceQty != 0 && inventory.getOriginalQty() != 0 && balanceQty < inventory.getOriginalQty() / 2) {
                                        inventory.setStatus("Low");
                                    } else if (balanceQty == 0 && inventory.getOriginalQty() != 0) {
                                        inventory.setStatus("Not Available");
                                        inventory.setOriginalQty(0);
                                    } else if (balanceQty != 0 && inventory.getOriginalQty() != 0 && balanceQty > inventory.getOriginalQty() / 2) {
                                        inventory.setStatus("Available");
                                    }
                                    inventoryRepo.save(inventory);
                                }, () -> {
                                    throw new NotFoundException("Item not exist");
                                });
                    }

                    cusRepo.findById(dto.getCustomerName().getCustomerId()).ifPresentOrElse(
                            cus -> {
                                if (cus.getLoyaltyDate() != null) {
                                    Double total = 0.0;
                                    for (SaleDetailsDTO itm : itms) {
                                        total += itm.getItmTotal();
                                    }
                                    if (total >= 800.00) {
                                        Integer point = (int) Math.round(total / 800.0);
                                        Integer cusPoints = cus.getTotalPoints();
                                        cusPoints += point;
                                        cus.setTotalPoints(cusPoints);

                                    }
                                    LoyaltyLevel loyalty = setCustomerLevel(cus.getTotalPoints());
                                    if (loyalty != null) {
                                        cus.setLevel(loyalty);
                                    }
                                }
                                cus.setRecentPurchase(LocalDateTime.now());
                                cusRepo.save(cus);
                            },
                            () -> {
                                throw new NotFoundException("Customer not exist");
                            });

                    saleRepo.save(tranformer.convert(dto, Tranformer.ClassType.ORDER_ENTITY));
                    if (detailRepo.countSaleDetails() != 0) {
                        adminPanelRepo.save(getAdminPanel());
                    }
                });
    }

    @Override
    public SalesDTO searchSales(String id) {
        return (SalesDTO) saleRepo.findById(id).map(sales -> {
            SalesDTO salesDTO = new SalesDTO();
            salesDTO.setCashier(sales.getCashier());
            salesDTO.setOrderNo(sales.getOrderNo());
            salesDTO.setPaymentMethod(sales.getPaymentMethod());
            salesDTO.setTotal(sales.getTotal());
            salesDTO.setTotalPoints(sales.getTotalPoints());
            CustomerDTO cus = new CustomerDTO();
            cus.setCustomerName(sales.getCustomerName().getCustomerName());
            cus.setCustomerId(sales.getCustomerName().getCustomerId());
            salesDTO.setCustomerName(cus);
            List<SaleDetails> details = sales.getSaleDetails();
            List<SaleDetailsDTO> saleDetails = new ArrayList<>();
            for (SaleDetails detail : details) {
                SaleDetailsDTO detailsDTO = new SaleDetailsDTO();
                detailsDTO.setOrderDetailPK(new SaleDetailPKDTO(detail.getOrderDetailPK().getOrderNo(), detail.getOrderDetailPK().getItemCode()));

                detailsDTO.setItmQTY(detail.getItmQTY());

                InventoryDTO item = new InventoryDTO();
                item.setItemCode(detail.getInventory().getItemCode());
                item.setItemDesc(detail.getInventory().getItemDesc());
                item.setSalePrice(detail.getInventory().getSalePrice());
                item.setSize(detail.getInventory().getSize());
                detailsDTO.setInventory(item);

                saleDetails.add(detailsDTO);
            }
            salesDTO.setSaleDetails(saleDetails);
            salesDTO.setPurchaseDate(sales.getPurchaseDate());
            return salesDTO;
        }).orElseThrow(() -> new NotFoundException("Order Not Exist"));
    }

    @Override
    public void updateSales(SalesDTO dto) {
        saleRepo.findById(dto.getOrderNo()).ifPresentOrElse(
                sales -> {
                    Double total = 0.0;
                    List<SaleDetails> oldDto = sales.getSaleDetails();
                    for (SaleDetails oldItems : oldDto) {
                        List<SaleDetailsDTO> newDto = dto.getSaleDetails();
                        for (SaleDetailsDTO newItems : newDto) {
                            String oldCode = oldItems.getOrderDetailPK().getItemCode();
                            String newCode = newItems.getOrderDetailPK().getItemCode();
                            if (!oldCode.equals(newCode)) {
                                updateItems(newCode, newItems.getItmQTY(), "subtract");
                                total = newItems.getItmTotal();
                            } else if (oldCode.equals(newCode) && oldItems.getItmQTY() < newItems.getItmQTY() || oldItems.getItmQTY() > newItems.getItmQTY()) {
                                if (oldItems.getItmQTY() < newItems.getItmQTY()) {
                                    int count = newItems.getItmQTY() - oldItems.getItmQTY();
                                    updateItems(newCode, count, "subtract");
                                    total = newItems.getItmTotal() - oldItems.getItmTotal();
                                } else if (oldItems.getItmQTY() > newItems.getItmQTY()) {
                                    int count = oldItems.getItmQTY() - newItems.getItmQTY();
                                    updateItems(newCode, count, "add");
                                    Double check = oldItems.getItmTotal() - newItems.getItmTotal();
                                    if (total >= 800.00) {
                                        updateCustomer(sales.getCustomerName().getCustomerId(), check, "subtract");
                                    }
                                }

                            }
                        }
                    }
                    saleRepo.deleteById(dto.getOrderNo());
                    saleRepo.save(tranformer.convert(dto, Tranformer.ClassType.ORDER_ENTITY));

                    if (total >= 800.00) {
                        updateCustomer(sales.getCustomerName().getCustomerId(), total, "add");
                    }

                    if (detailRepo.countSaleDetails() != 0) {
                        adminPanelRepo.save(getAdminPanel());
                    }
                },
                () -> {
                    throw new NotFoundException("Order Not Exist");
                });
    }

    @Override
    public void deleteSales(String id) {
        saleRepo.findById(id).ifPresentOrElse(
                sales -> {
                    if (detailRepo.countSaleDetails() != 0) {

                        List<SaleDetails> itms = sales.getSaleDetails();

                        for (SaleDetails itm : itms) {
                            inventoryRepo.findById(itm.getOrderDetailPK().getItemCode())
                                    .ifPresentOrElse(inventory -> {
                                        Integer qtyHand = inventory.getQty();
                                        Integer balanceQty = qtyHand + itm.getItmQTY();
                                        inventory.setQty(balanceQty);
                                        if (inventory.getOriginalQty() < balanceQty) {
                                            inventory.setOriginalQty(balanceQty);
                                        }

                                        if (balanceQty != 0 && inventory.getOriginalQty() != 0 && balanceQty < inventory.getOriginalQty() / 2) {
                                            inventory.setStatus("Low");
                                        } else if (balanceQty == 0 && inventory.getOriginalQty() != 0) {
                                            inventory.setStatus("Not Available");
                                            inventory.setOriginalQty(0);
                                        } else if (balanceQty != 0 && inventory.getOriginalQty() != 0 && balanceQty > inventory.getOriginalQty() / 2) {
                                            inventory.setStatus("Available");
                                        }
                                        inventoryRepo.save(inventory);
                                    }, () -> {
                                        throw new NotFoundException("Item not exist");
                                    });
                        }

                        cusRepo.findById(sales.getCustomerName().getCustomerId()).ifPresentOrElse(
                                cus -> {
                                    if (sales.getTotalPoints() != null) {
                                        if (cus.getLoyaltyDate() != null) {
                                            Integer points = sales.getTotalPoints();
                                            Integer cusPoints = cus.getTotalPoints();
                                            if (cusPoints != 0) {
                                                cusPoints -= points;
                                                cus.setTotalPoints(cusPoints);
                                            }
                                            LoyaltyLevel loyalty = setCustomerLevel(cus.getTotalPoints());
                                            if (loyalty != null) {
                                                cus.setLevel(loyalty);
                                            }
                                        }
                                    }
                                    cus.setRecentPurchase(LocalDateTime.now());
                                    cusRepo.save(cus);
                                },
                                () -> {
                                    throw new NotFoundException("Customer not exist");
                                });

                        saleRepo.deleteById(id);
                        if (detailRepo.countSaleDetails() != 0) {
                            adminPanelRepo.save(getAdminPanel());
                        }
                    }
                },
                () -> {
                    throw new NotFoundException("Order Not Exist");
                }
        );
    }

    @Override
    public AdminPanel getAdminPanel() {
        Map<String, Object> getItem = detailRepo.findMostPurchasedItem();
        if (!getItem.isEmpty()) {
            Object[] mostItem = new Object[getItem.size()];
            int index1 = 0;
            for (Object value : getItem.values()) {
                mostItem[index1++] = value;
            }
            String code = String.valueOf(mostItem[0]);
            Long qty = (Long) mostItem[1];
            System.out.println(code + qty);
            Inventory inventory = inventoryRepo.findById(code).get();

            Map<String, Object> item = detailRepo.getTotalCost();
            Object[] ar = new Object[item.size()];
            int index2 = 0;
            for (Object value : item.values()) {
                ar[index2++] = value;
            }
            Double totalBuy = (Double) ar[0];
            Double itmTotal = detailRepo.getItmTotal();
            Double profit = itmTotal - totalBuy;
            System.out.println(totalBuy + " " + itmTotal + " " + profit);
            return new AdminPanel("dash", itmTotal, profit, code, inventory.getItemPicture(), Math.toIntExact(qty));
        }
        return null;
    }

    @Override
    public AdminPanelDTO getAdminPanelDetails() {
        AdminPanel panel = getAdminPanel();
        if (panel != null) {
            return tranformer.convert(panel, Tranformer.ClassType.PANNEL_DTO);
        } else {
            throw new NotFoundException("Admin Panel is Empty");
        }
    }

    @Override
    public Integer totalSalesCount() {
        return saleRepo.totalSalesCount();
    }

    @Override
    public String getOrderGenId() {
        return generator.getGenerateID(saleRepo.getOrderId(), IdGenerator.GenerateTypes.ORDER);
    }

    private void updateCustomer(String id, Double total, String op) {
        if (total != 0.0) {
            cusRepo.findById(id).ifPresentOrElse(
                    cus -> {
                        if (cus.getLoyaltyDate() != null) {
                            Integer point = (int) Math.round(total / 800.0);
                            switch (op) {
                                case "add":
                                    if (total >= 800.00) {
                                        Integer cusPoints = cus.getTotalPoints();
                                        cusPoints += point;
                                        cus.setTotalPoints(cusPoints);
                                    }
                                    break;
                                case "subtract":
                                    if (cus.getLoyaltyDate() != null) {
                                        Integer cusPoints = cus.getTotalPoints();
                                        if (cusPoints != 0) {
                                            cusPoints -= point;
                                            cus.setTotalPoints(cusPoints);
                                        }
                                    }
                                    break;
                            }
                            LoyaltyLevel loyalty = setCustomerLevel(cus.getTotalPoints());
                            if (loyalty != null) {
                                cus.setLevel(loyalty);
                            }
                        }
                        cus.setRecentPurchase(LocalDateTime.now());
                        cusRepo.save(cus);
                    },
                    () -> {
                        throw new NotFoundException("Customer not exist");
                    });
        }
    }

    private void updateItems(String itmCode, int updateQty, String op) {
        inventoryRepo.findById(itmCode)
                .ifPresentOrElse(inventory -> {
                    Integer qtyHand = inventory.getQty();
                    Integer balanceQty = 0;
                    switch (op) {
                        case "add":
                            balanceQty = qtyHand + updateQty;
                            break;
                        case "subtract":
                            balanceQty = qtyHand - updateQty;
                            break;
                    }
                    inventory.setQty(balanceQty);
                    if (inventory.getOriginalQty() < balanceQty) {
                        inventory.setOriginalQty(balanceQty);
                    }

                    if (balanceQty != 0 && inventory.getOriginalQty() != 0 && balanceQty < inventory.getOriginalQty() / 2) {
                        inventory.setStatus("Low");
                    } else if (balanceQty == 0 && inventory.getOriginalQty() != 0) {
                        inventory.setStatus("Not Available");
                        inventory.setOriginalQty(0);
                    } else if (balanceQty != 0 && inventory.getOriginalQty() != 0 && balanceQty > inventory.getOriginalQty() / 2) {
                        inventory.setStatus("Available");
                    }
                    inventoryRepo.save(inventory);
                }, () -> {
                    throw new NotFoundException("Item not exist");
                });
    }

    private LoyaltyLevel setCustomerLevel(Integer check) {
        if (check < 50) {
            return LoyaltyLevel.NEW;
        } else if (check < 100) {
            return LoyaltyLevel.BRONZE;
        } else if (check < 200) {
            return LoyaltyLevel.SILVER;
        } else {
            return LoyaltyLevel.GOLD;
        }
    }
}

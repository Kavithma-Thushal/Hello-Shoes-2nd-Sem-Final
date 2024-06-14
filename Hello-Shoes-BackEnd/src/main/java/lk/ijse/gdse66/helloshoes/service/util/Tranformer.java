package lk.ijse.gdse66.helloshoes.service.util;

import lk.ijse.gdse66.helloshoes.dto.*;
import lk.ijse.gdse66.helloshoes.entity.*;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.ArrayList;

@Component
public class Tranformer {

    @Autowired
    private ModelMapper mapper;

    public enum ClassType {
        USER_DTO,
        USER_ENTITY,
        USER_DTO_LIST,
        CUS_DTO,
        CUS_ENTITY,
        CUS_DTO_LIST,
        EMP_DTO,
        EMP_ENTITY,
        EMP_DTO_LIST,
        SUP_DTO,
        SUP_ENTITY,
        SUP_DTO_LIST,
        ITEM_DTO,
        ITEM_ENTITY,
        ITEM_DTO_LIST,
        ITEM_ENTITY_LIST,
        ORDER_DETAILS_ENTITY,
        ORDER_DETAILS_DTO,
        ORDER_ENTITY,
        ORDER_DTO,
        ORDER_DTO_LIST,
        ORDER_DETAILS_DTO_LIST,
        PANNEL_DTO
    }

    public <R> R convert(Object from, ClassType to) {
        return (R) mapper.map(from, getType(to));
    }

    private Type getType(ClassType type) {
        switch (type) {
            case USER_DTO:
                return UserDTO.class;
            case USER_ENTITY:
                return User.class;
            case USER_DTO_LIST:
                return new TypeToken<ArrayList<UserDTO>>() {}.getType();
            case CUS_DTO:
                return CustomerDTO.class;
            case CUS_ENTITY:
                return Customer.class;
            case CUS_DTO_LIST:
                return new TypeToken<ArrayList<CustomerDTO>>() {}.getType();
            case EMP_DTO:
                return EmployeeDTO.class;
            case EMP_ENTITY:
                return Employee.class;
            case EMP_DTO_LIST:
                return new TypeToken<ArrayList<EmployeeDTO>>() {}.getType();
            case SUP_DTO:
                return SupplierDTO.class;
            case SUP_ENTITY:
                return Supplier.class;
            case SUP_DTO_LIST:
                return new TypeToken<ArrayList<SupplierDTO>>() {}.getType();
            case ITEM_DTO:
                return InventoryDTO.class;
            case ITEM_ENTITY:
                return Inventory.class;
            case ITEM_DTO_LIST:
                return new TypeToken<ArrayList<InventoryDTO>>() {}.getType();
            case ORDER_ENTITY:
                return Sales.class;
            case ORDER_DTO:
                return SalesDTO.class;
            case ORDER_DTO_LIST:
                return new TypeToken<ArrayList<SalesDTO>>() {}.getType();
            case PANNEL_DTO:
                return AdminPanelDTO.class;
            default:
                throw new IllegalArgumentException("Unsupported ClassType: " + type);
        }
    }
}

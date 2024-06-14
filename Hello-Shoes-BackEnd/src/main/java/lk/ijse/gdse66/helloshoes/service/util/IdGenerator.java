package lk.ijse.gdse66.helloshoes.service.util;

import org.springframework.stereotype.Component;

@Component
public class IdGenerator {

    public enum GenerateTypes {
        CUSTOMER, EMPLOYEE, SUPPLIER, ITEM, ORDER
    }

    public String getGenerateID(String id, GenerateTypes type) {
        if (id == null || id.isEmpty()) {
            return typeWithId("1", type);
        } else {
            int genId = Integer.parseInt(id) + 1;
            return typeWithId(String.valueOf(genId), type);
        }
    }

    private String typeWithId(String id, GenerateTypes type) {
        switch (type) {
            case CUSTOMER:
                return "C00-" + id;
            case ITEM:
                return "I00-" + id;
            case ORDER:
                return "OID-" + id;
            case EMPLOYEE:
                return "E00-" + id;
            case SUPPLIER:
                return "S00-" + id;
            default:
                throw new IllegalArgumentException("Unsupported ClassType for Generate: " + type);
        }
    }
}

// Permissions atomiques (Document 06, Chapitre 5).
// Jamais de permission "globale" du type product.admin — chaque action
// est vérifiée individuellement. La décision finale appartient toujours
// au Backend ; ces constantes évitent seulement les chaînes magiques.

export const PERMISSIONS = {

    PRODUCT_READ: "product.read",
    PRODUCT_CREATE: "product.create",
    PRODUCT_UPDATE: "product.update",
    PRODUCT_DELETE: "product.delete",

    CUSTOMER_READ: "customer.read",
    CUSTOMER_CREATE: "customer.create",
    CUSTOMER_UPDATE: "customer.update",
    CUSTOMER_DELETE: "customer.delete",

    EMPLOYEE_READ: "employee.read",
    EMPLOYEE_CREATE: "employee.create",
    EMPLOYEE_UPDATE: "employee.update",
    EMPLOYEE_DELETE: "employee.delete",

    ORDER_READ: "order.read",
    ORDER_CREATE: "order.create",
    ORDER_UPDATE: "order.update",
    ORDER_DELETE: "order.delete",

    CONSULTATION_READ: "consultation.read",
    CONSULTATION_CREATE: "consultation.create",
    CONSULTATION_UPDATE: "consultation.update",
    CONSULTATION_DELETE: "consultation.delete",

    EVENT_READ: "event.read",
    EVENT_CREATE: "event.create",
    EVENT_UPDATE: "event.update",
    EVENT_DELETE: "event.delete",

    INVOICE_READ: "invoice.read",
    INVOICE_CREATE: "invoice.create",

};

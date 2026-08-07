import {
    CreditCard,
    Landmark,
    Wallet,
} from "lucide-react";

export const DEFAULT_METHODS = [
    {
        id: "card",
        name: "Carte bancaire",
        icon: CreditCard,
    },
    {
        id: "paypal",
        name: "PayPal",
        icon: Wallet,
    },
    {
        id: "stripe",
        name: "Stripe",
        icon: CreditCard,
    },
    {
        id: "cinetpay",
        name: "CinetPay",
        icon: Wallet,
    },
    {
        id: "flutterwave",
        name: "Flutterwave",
        icon: Wallet,
    },
    {
        id: "orange-money",
        name: "Orange Money",
        icon: Wallet,
    },
    {
        id: "mtn-momo",
        name: "MTN Mobile Money",
        icon: Wallet,
    },
    {
        id: "bank-transfer",
        name: "Virement bancaire",
        icon: Landmark,
    },
    {
        id: "cash",
        name: "Paiement à la livraison",
        icon: Wallet,
    },
];

import {

    Users,

    ShoppingBag,

    CalendarDays,

    HeartHandshake,

} from "lucide-react";

export const statistics = [

    {

        id: 1,

        icon: Users,

        value: "2500+",

        label: "Clients accompagnés",

    },

    {

        id: 2,

        icon: HeartHandshake,

        value: "800+",

        label: "Consultations",

    },

    {

        id: 3,

        icon: ShoppingBag,

        value: "1200+",

        label: "Produits vendus",

    },

    {

        id: 4,

        icon: CalendarDays,

        value: "150+",

        label: "Évènements",

    },

];

export const consultations = [

    {

        id: 1,

        title: "Consultation familiale",

        description: "Un accompagnement pour renforcer les relations familiales.",

        specialist: "LOVE CAN BUILD",

        duration: "1 heure",

        mode: "Présentiel",

        available: true,

    },

    {

        id: 2,

        title: "Consultation de couple",

        description: "Un espace d'écoute et de dialogue pour les couples.",

        specialist: "LOVE CAN BUILD",

        duration: "1 h 30",

        mode: "En ligne",

        available: true,

    },

];

export const products = [

    {

        id: 1,

        name: "T-shirt LOVE CAN BUILD",

        description: "T-shirt officiel de la marque.",

        image: "/images/products/tshirt.jpg",

        category: "Vêtements",

        price: "15 000 FCFA",

        rating: 5,

        reviews: 18,

        stock: true,

        badge: "Nouveau",

    },

    {

        id: 2,

        name: "Casquette",

        description: "Casquette brodée LOVE CAN BUILD.",

        image: "/images/products/cap.jpg",

        category: "Accessoires",

        price: "8 000 FCFA",

        rating: 4.8,

        reviews: 10,

        stock: true,

    },

];

export const events = [

    {

        id: 1,

        title: "Conférence annuelle",

        description: "Une journée dédiée au développement personnel.",

        badge: "À venir",

        date: "12 Septembre",

        time: "09:00",

        location: "Douala",

    },

];

export const testimonials = [

    {

        name: "Marie",

        role: "Cliente",

        rating: 5,

        message: "Une expérience exceptionnelle. Je recommande vivement LOVE CAN BUILD.",

    },

    {

        name: "Jean",

        role: "Participant",

        rating: 5,

        message: "Les consultations m'ont énormément aidé.",

    },

];

export const gallery = [

    "/images/gallery/gallery1.jpg",

    "/images/gallery/gallery2.jpg",

    "/images/gallery/gallery3.jpg",

    "/images/gallery/gallery4.jpg",

];

export const faq = [

    {

        question: "Comment réserver une consultation ?",

        answer: "Choisissez une consultation puis sélectionnez une date disponible.",

    },

    {

        question: "Livrez-vous les produits ?",

        answer: "Oui, selon votre localisation.",

    },

];
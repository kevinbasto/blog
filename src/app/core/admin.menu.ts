import { MenuOption } from "./menu.option";

export const AdminMenu : Array<MenuOption> = [
    {
        title: "inicio",
        url : "/admin/inicio",
        icon: "fa-tasks",
        level: 3
    },
    {
        title: "usuarios",
        url: "/admin/usuarios",
        icon: "fa-users",
        level: 4
    },
    {
        title: "staff",
        url: "/admin/staff",
        icon: "fa-users-cog",
        level: 4
    },
    {
        title: "solicitudes",
        url: "/admin/requests",
        icon: "fa-clipboard-list",
        level: 3
    },
    {
        title : "Personalizar",
        url: "/admin/personalization",
        icon : "fa-palette",
        level: 3
    },
    {
        title: "Novelas Japonesas",
        url: "/admin/japonesas",
        icon: "fa-torii-gate",
        level : 3
    },
    {
        title: "Novelas Coreanas",
        url: "/admin/coreanas",
        icon: "fa-yin-yang",
        level: 3
    },
    {
        title: "Novelas Chinas",
        url: "/admin/chinas",
        icon: "fa-vihara",
        level: 3
    },
    {
        title: "Novelas Originales",
        url: "/admin/originales",
        icon: "fa-dragon",
        level: 3
    },
    {
        title: "Novelas +15/+19",
        url: "/admin/mayores",
        icon: "fa-surprise",
        level: 3
    },
    {
        title: "Novelas Boys-love",
        url: "/admin/boys-love",
        icon: "fa-heart",
        level: 3
    },
    {
        title: "Leer",
        url: "/client/inicio",
        icon: "fa-mug-hot",
        level: 1
    },
]
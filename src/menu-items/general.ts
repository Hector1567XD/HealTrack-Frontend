// assets
import { IconUser } from "@tabler/icons";
import { MenuItem, MenuItemType } from "./types";
// constant

const other: MenuItem = {
  id: "agencies-crud-category-general",
  type: MenuItemType.Group,
  title: "General",
  children: [
    {
      id: "employees",
      title: "Empleados",
      type: MenuItemType.Collapse,
      icon: IconUser,
      breadcrumbs: false,
      children: [
        {
          id: "list-employees",
          title: "Lista de empleados",
          type: MenuItemType.Item,
          url: "/employees",
          breadcrumbs: false,
        },
        {
          id: "create-employees",
          title: "Crear empleado",
          type: MenuItemType.Item,
          url: "/employees/create",
          breadcrumbs: false,
        },
      ],
    },
    {
      id: "patients",
      title: "Pacientes",
      type: MenuItemType.Collapse,
      icon: IconUser,
      breadcrumbs: false,
      children: [
        {
          id: "list-patients",
          title: "Lista de pacientes",
          type: MenuItemType.Item,
          url: "/patients",
          breadcrumbs: false,
        },
        {
          id: "create-patients",
          title: "Crear empleado",
          type: MenuItemType.Item,
          url: "/patients/create",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default other;

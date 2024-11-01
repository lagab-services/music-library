import {Icon} from 'lucide-react';

export interface NavLink {
    title: string;
    href: string;
    icon?: JSX.Element | Icon; // Optionnel : Icône pour chaque lien
}

export interface SideLink extends NavLink {
    label?: string;
    sub?: SideLink[];
}

export interface NavSection {
    title?: string; // Titre de la section (facultatif)
    links: NavLink[]; // Liens dans cette section
}

export interface NavItem {
    title: string; // Le nom affiché dans la navigation
    href: string;  // Le chemin vers la page
    icon?: JSX.Element; // Optionnel : Icône pour le menu
    children?: NavItem[]; // Optionnel : Sous-menus pour cet item
    megaMenu?: boolean; // Indique s'il s'agit d'un méga menu
    sections?: NavSection[]; // Liste des sections du méga menu
    requiresAuth?: boolean; // Optionnel : Indiquer si l'authentification est requise
}
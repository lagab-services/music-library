import {SideLink} from '@/types/nav';
import {AudioLines, BarChart3, Calendar, ClipboardList, LayoutDashboard, LayoutGrid, Play, ReceiptText, Tags, Waypoints} from 'lucide-react';
import React from 'react';

export const sidelinks: SideLink[] = [
    {
        title: 'Dashboard',
        label: '',
        href: '/dashboard',
        icon: <LayoutDashboard size={18}/>,
    },
    {
        title: 'Music Livrary',
        href: '/folders',
        icon: <Play size={18}/>,
    },
    {
        title: 'Tags',
        label: '3',
        href: '/folders',
        icon: <Tags size={18}/>,
    },
    {
        title: 'Playlists',
        href: '/chats',
        icon: <AudioLines size={18}/>,
        sub: [
            {
                title: 'Toutes les playlist',
                label: '',
                href: '/invoice/quotes',
            },
            {
                title: 'Spotify',
                label: '',
                href: '/invoice/invoices',
            },
            {
                title: 'Deezer',
                label: '',
                href: '/invoice/customers',
            },
            {
                title: 'Soundcloud',
                label: '',
                href: '/invoice/customers',
            },
        ],
    },
    {
        title: 'Apps',
        label: '',
        href: '/apps',
        icon: <LayoutGrid size={18}/>,
    },
    {
        title: 'Analysis',
        label: '',
        href: '/analysis',
        icon: <BarChart3 size={18}/>,
    },
]
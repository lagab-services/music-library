import {SideLink} from '@/types/nav';
import {AudioLines, BarChart3, LayoutDashboard, LibraryBig, Play, Tags} from 'lucide-react';
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
        icon: <LibraryBig size={18}/>,
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
                href: '/playlist/',
            },
            {
                title: 'Spotify',
                label: '',
                href: '/playlist/spotify',
            },
            {
                title: 'Deezer',
                label: '',
                href: '/playlist/deezer',
            },
            {
                title: 'Soundcloud',
                label: '',
                href: '/playlist/soundcloud',
            },
        ],
    },
    {
        title: 'Apps',
        label: '',
        href: '/apps',
        icon: <Play size={18}/>,
    },
    {
        title: 'Analysis',
        label: '',
        href: '/analysis',
        icon: <BarChart3 size={18}/>,
    },
]
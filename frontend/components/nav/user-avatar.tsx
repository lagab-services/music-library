'use client'
import React from 'react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {signOut, useSession} from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {ChevronDown} from 'lucide-react';

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    showUserName: boolean
    showMail: boolean
    showChevron?: boolean
}

const getInitials = (fullName: string): string => {
    const names = fullName
        .split(' ')                      // Sépare par les espaces
        .filter(name => name);            // Filtre les espaces vides

    if (names.length === 0) return '';  // Gère le cas d'une chaîne vide

    // Retourne les initiales du premier et du deuxième mot (si disponible)
    return names.slice(0, 2)            // Prend les deux premiers éléments
        .map(name => name.charAt(0))      // Prend la première lettre de chaque élément
        .join('')                         // Combine les initiales ensemble
        .toUpperCase();                   // Convertit en majuscules
};

const UserAvatar = ({className, showUserName, showMail, showChevron}: UserAvatarProps) => {
    const {data: session} = useSession();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={className}>
                    <Avatar className='h-7 w-7 inline-block'>
                        <AvatarImage
                            src={session!.user.image as string}
                            alt={session!.user.name as string}/>
                        <AvatarFallback>{getInitials(session!.user.name as string)}</AvatarFallback>
                    </Avatar>
                    {(showUserName || showMail) && session &&
                        <div className="grid flex-1 text-left  leading-tight">
                            {showUserName && <span className="text-gray-900 text-xs font-semibold ">{session.user.name}</span>}
                            {showMail && <span className="text-xs text-muted-foreground text-ellipsis overflow-hidden ">{session.user.email}</span>}
                        </div>
                    }
                    {(showChevron &&
                        <ChevronDown className='h-4 w-4 '/>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session!.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session!.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem onClick={() => signOut({callbackUrl: '/', redirect: true})}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAvatar;
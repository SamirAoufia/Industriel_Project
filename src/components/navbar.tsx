import React, { useEffect, useState } from 'react';
import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode, // Importer useColorMode
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { type Props } from 'next/script';
import { signIn, signOut, useSession } from 'next-auth/react';
import { stat } from 'fs';

interface Link { 
    label: string;  
    href: string;
}

const Links: Link[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Valeur', href: '/valeur' },
    { label: 'Historique', href: '/historique' },

];

const NavLink = (props: Props) => {
    const { children, href } = props;

    return (
        <Box
            as={Link}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            href={href}>
            {children}
        </Box>
    )
}

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode(); // Récupérer le mode de couleur


    const { data: session, status } = useSession();
    

    const [avatar, setAvatar] = useState< null | string >();
    const[connected, setConnected] = useState< boolean >(false);

    useEffect(() => {
        if(status === "authenticated"){
            setAvatar(session.user.image);
            setConnected(true);
        }
        else{
            setAvatar(null);
            setConnected(false);    
        }
    },[session, status]);
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <img src="image/iconshelha.jpeg" alt="" height={160} width={160} />
                        </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link) => (
                                <NavLink key={link.label} href={link.href}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {/* Bouton de bascule du mode sombre */}
                        <IconButton
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            aria-label={colorMode === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
                            onClick={toggleColorMode}
                            mr={6}
                        />
                        {connected ? (
                            // Si l'utilisateur est connecté, affiche l'avatar et le bouton de déconnexion
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={avatar}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Profile</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            // Si l'utilisateur n'est pas connecté, affiche le bouton de connexion
                            <Button onClick={() => signIn('discord')}>Login</Button>
                        )}
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.label} href={link.href}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

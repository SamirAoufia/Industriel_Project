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
    useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import { type Props } from 'next/script';
import { signIn, signOut, useSession } from 'next-auth/react';

interface Link {
    label: string;
    href: string;
}

const Links: Link[] = [
    { label: 'Accueil', href: '/' },
    { label: 'Valeur', href: '/valeur' },
    { label: 'Historique', href: '/historique' }
    
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
            href={href}>
            {children}
        </Box>
    )
}

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const { data: session, status } = useSession();
    const [avatar, setAvatar] = useState<null | string>();
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
        if (status === "authenticated") {
            setAvatar(session.user.image);
            setConnected(true);
        } else {
            setAvatar(null);
            setConnected(false);
        }
    }, [session, status]);

    // Logique conditionnelle pour déterminer les droits d'accès
    const filteredLinks = connected
        ? session.user.name === 'tech_samir'
            ? Links.filter(link => link.label === 'Accueil' || link.label === 'Valeur')
            : session.user.name === 'bysaama'
                ? Links.filter(link => link.label === 'Accueil' || link.label === 'Valeur' || link.label === 'Historique')
                : Links.filter(link => link.label === 'Accueil')
        : Links.filter(link => link.label === 'Accueil');

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
                            {filteredLinks.map((link) => (
                                <NavLink key={link.label} href={link.href}>
                                    {link.label}
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <IconButton
                            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            aria-label={colorMode === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
                            onClick={toggleColorMode}
                            mr={6}
                        />
                        {connected ? (
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
                                    <MenuItem>Bienvenue {session?.user.name}</MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={() => signOut()}>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Button onClick={() => signIn('discord')}>Login</Button>
                        )}
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {filteredLinks.map((link) => (
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

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import {
  Flex,
  IconButton,
  HStack,
  Box,
  Button,
  Stack,
  Link as CharkaLink,
  Avatar,
  useColorModeValue,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useColorMode } from "@chakra-ui/color-mode";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { GlobalContext, AuthContext } from "../contexts/GlobalContext";

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const text = useColorModeValue("dark", "light");
  const {
    userInfo,
    web3Auth,
    provider,
    setProvider,
    tezosKeys,
    setTezosKeys,
    account,
    setAccount,
    balance,
    setBalance,
  }: any = useContext(GlobalContext);

  const login = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3Auth.connect();
    setProvider(web3authProvider);
  };

  const logout = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3Auth.logout();
    setProvider(null);
  };

  const loggedInView = (
    <>
      <Tooltip
        zIndex={9999999999}
        label={account ? "Wallet Address" : "Tezos"}
        aria-label="A tooltip"
      >
        <Box
          px={2}
          py={1}
          rounded={"md"}
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.900"),
          }}
          color={useColorModeValue("blue.500", "blue.300")}
        >
          {account ? account : " "}
        </Box>
      </Tooltip>
    </>
  );

  const unloggedInView = <></>;

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.700")}
        px={4}
        boxShadow={"lg"}
        sx={{
          position: "fixed",
          display: "flex",
          flexDirection: ["column", "row"],
          justifyContent: "space-between",
          top: 0,
          width: "100%",
          zIndex: 9999999,
        }}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          w={["95%", "95%", "95%"]}
          maxW={"container.lg"}
          mx="auto"
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={["inherit", "inherit", "none"]}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Heading
             display={["none", "none", "inherit"]}
              sx={{
                fontFamily: "Pacifico",
                color: "blue.500",
              }}
              textShadow="lg"
              as="h4"
            >
              GreyMeta
            </Heading>

            <HStack as="nav" spacing="4" display={{ base: "none", md: "flex" }}>
              {provider ? loggedInView : unloggedInView}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <ColorModeSwitcher justifySelf="flex-end" />
            {provider ? (
              <Button onClick={logout} className="card">
                Log Out
              </Button>
            ) : (
              <Button onClick={login} className="card">
                Log in
              </Button>
            )}
          </Flex>
        </Flex>

        {isOpen && (
          <Box
            pb={4}
            w={["100%", "100%", "80%"]}
            maxW={"container.lg"}
            display={["inherit", "inherit", "none"]}
          >
            <Stack as={"nav"} spacing={4}>
              {provider ? loggedInView : unloggedInView}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};

export default NavBar;

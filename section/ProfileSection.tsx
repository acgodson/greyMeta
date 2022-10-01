import React, {
  Context,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SlideFade,
  Box,
  Heading,
  Avatar,
  Link,
  Flex,
  ButtonGroup,
  Button,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Web3Auth } from "@web3auth/web3auth";
import { TezosToolkit } from "@taquito/taquito";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { BiPhoneCall } from "react-icons/bi";
import Paragraph from "../components/Paragraph";
import RPC from "../utils/tezosRPC";
import { GlobalContext, AuthContext } from "../contexts/GlobalContext";

//type userinfoType = Partial<OpenloginUserInfo>;

type signature = {
  bytes: string;
  sig: string;
  prefixSig: string;
  sbytes: string;
};

const ProfileSection = () => {
  let router = useRouter();
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

  const signMessage = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const result: signature = await rpc.signMessage();

    if (result) {
      fetch("/api/retrieve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: tezosKeys.pkh, //This should be called from the serverside in production
          key: tezosKeys.pk,
          bytes: result.bytes,
          sig: result.prefixSig,
        }),
      });
    }
    console.log(result);
  };

  const signAndSendTransaction = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const result = await rpc.signAndSendTransaction();
    console.log(result);
  };
  const loggedInView = (
    <>
      <Button 
      
      boxShadow="none"
      opacity="0.6"
      onClick={signMessage} className="card">
        Balance {balance ? balance.e  : ""}
        <Box as="span" fontSize= "12px">
        STZ
        </Box>
      </Button>

      <Box>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDirection={["column-reverse", "column-reverse", "row"]}
        >
          <Heading
            as="h1"
            fontSize={{ base: "28px", md: "40px", lg: "48px" }}
            mb={3}
          >
            Welcome, {userInfo ? userInfo.name : " "}
          </Heading>
          <Flex alignItems={"flex-end"}>
            <Avatar
              display={["none", "none", "inherit"]}
              name="Teo Wen Long"
              src="/profile_picture.png"
              mb={5}
              size="lg"
            />
            <Heading
            mb={5}
              display={["inherit", "inherit", "none"]}
              sx={{
                fontFamily: "Pacifico",
                color: "blue.500",
              }}
              textShadow="lg"
              as="h4"
            >
              GreyMeta
            </Heading>
          </Flex>
        </Flex>
        <Paragraph mr={1.5} fontSize={["md", "xl"]} lineHeight={1.6}>
          Start practicing with NFTs in your catalog, purchase cards from others
          or simply create yours
        </Paragraph>

        <Box mt={2}>
          <ButtonGroup h="fit-content">
            <Button
              onClick={() => navigate("/flashcards")}
              colorScheme="blue"
              boxShadow="none"
              size="sm"
              py={4}
              h="45px"
              margin={"5px"}
              fontSize="xl"
            >
              Library
            </Button>

            <Button
              colorScheme="pink"
              onClick={() => navigate("/mint")}
              size="sm"
              h="45px"
              py={4}
              margin={"5px"}
              boxShadow="none"
              fontSize="xl"
            >
              My Catalog
            </Button>

            {/* 
            <Grid
              mt={5}
              templateColumns={[
                "1fr",
                "repeat(2,1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
              ]}
              gap={[2, 5, 5, 5]}
            >
            
            </Grid> */}
          </ButtonGroup>
        </Box>
      </Box>
    </>
  );

  const unloggedInView = (
    <Box>
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexDirection={["column-reverse", "column-reverse", "row"]}
      >
        <Heading
          as="h1"
          fontSize={{ base: "28px", md: "40px", lg: "48px" }}
          mb={3}
        >
          Let's make learning fun and easy
        </Heading>
        <Flex alignItems={"flex-end"}>
          {/* <Avatar
            name="Teo Wen Long"
            src="/profile_picture.png"
            mb={5}
            size="lg"
          /> */}
        </Flex>
      </Flex>
      <Paragraph mr={1.5} fontSize={["md", "xl"]} lineHeight={1.6}>
        Study smart, practice with
        <Box
          as="span"
          color={useColorModeValue("blue.500", "blue.400")}
          fontWeight="500"
        >
          {" "}
          NFT flashcards
        </Box>{" "}
        and test yourself in
        <Box
          as="span"
          color={useColorModeValue("blue.500", "blue.400")}
          fontWeight="500"
        >
          {" "}
          competitive games
        </Box>{" "}
      </Paragraph>

      <Box mt={2}>
        <ButtonGroup h="fit-content">
          <Button
            onClick={() => navigate("/flashcards")}
            colorScheme="blue"
            size="sm"
            py={4}
            h="45px"
            margin={"5px"}
            fontSize="xl"
          >
            Start Learning
          </Button>

          <Button
            colorScheme="pink"
            onClick={() => navigate("/mint")}
            size="sm"
            h="45px"
            py={4}
            margin={"5px"}
            fontSize="xl"
          >
            Start Publishing
          </Button>

          {/* 
            <Grid
              mt={5}
              templateColumns={[
                "1fr",
                "repeat(2,1fr)",
                "repeat(3, 1fr)",
                "repeat(4, 1fr)",
              ]}
              gap={[2, 5, 5, 5]}
            >
            
            </Grid> */}
        </ButtonGroup>
      </Box>
    </Box>
  );

  function navigate(path: string) {
    router.push(path);
  }

  return (
    <SlideFade in offsetX={80}>
      {provider ? loggedInView : unloggedInView}
    </SlideFade>
  );
};

export default ProfileSection;

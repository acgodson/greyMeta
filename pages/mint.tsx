/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  SlideFade,
  Box,
  FormControl,
  FormLabel,
  Flex,
  Button,
  Input,
  Heading,
  Textarea,
  Text,
  useColorModeValue,
  useToast,
  Grid,
  List,
  ListItem,
} from "@chakra-ui/react";
import Head from "next/head";
import ErrorMessage from "../components/ErrorMessage";
import { GlobalContext } from "../contexts/GlobalContext";
import ipfsNode from "../utils/ipfs-node";
import { INFURA_PROJECT_SECRET, INFURA_PROJECT_ID } from "../constants";

type info = {
  name: string;
  email: string;
  copies: string;
  description: string;
  title: string;
};

function Mint() {
  const cards = [];
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

  const toast = useToast();

  const [name, setName] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [copies, setCopies] = useState<string>("1");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [publishedOnIPFS, setPublishedOnIPFS] = useState<boolean>(false);
  const [cid, setCid] = useState<string>("");
  const [collectionInfo, setCollectionInfo] = useState<info | null>(null);

  const clearInput = () => {
    setName("");
    setTitle("");
    setCopies("");
    setEmail("");
    setDescription("");
    setIsLoading(false);
  };

  useEffect(() => {
    // if (!name && !userInfo) {
    const _name = userInfo.name;
    const _email = userInfo.email;
    // const address = account;
    setName(_name);
    setEmail(_email);
    // }
  }, [userInfo.name, userInfo.email]);

  useEffect(() => {
    if (cid) {
      cidFetcher(cid);
    }
  }, [cid]);

  async function cidFetcher(cid: string) {
    let request = await fetch(`https://ipfs.io/ipfs/${cid}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (request) {
      const data = await request.text();
      if (data) {
        const dataOBj: info = JSON.parse(data);
        setCollectionInfo(dataOBj);
        console.log(JSON.parse(data));
      }
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    setIsLoading(true);

    const CollectionObj = {
      name: name,
      email: email,
      copies: copies,
      description: description,
      title: title,
    };

    const data = JSON.stringify(CollectionObj);
    const ipfs = ipfsNode();

    ipfs.add(data).then((res) => {
      if (res) {
        setCid(res.path);
        setPublishedOnIPFS(true);
      }
      setIsLoading(false);
    });

    // toast({
    //   title: "Email sent.",
    //   description:
    //     "You had successfully sent the email. I will reply your email ASAP. Thank you!",
    //   status: "success",
    //   duration: 9000,
    //   isClosable: true,
    // });
  };

  //   ("QmddchiYMQGZYLZf86jhyhkxRqrGfpBNr53b4oiV76q6aq");

  const handleContent = (e: { preventDefault: () => void }) => {};

  const onCreateView = (
    <Container maxW="container.lg" mt={["5", "10"]} mb={["5", "10"]}>
      <SlideFade in offsetX={80}>
        <Flex width="full" align="center" justifyContent="center">
          <Box
            p={8}
            maxWidth="container.lg"
            borderWidth={1}
            borderRadius={8}
            boxShadow="lg"
          >
            <Heading size={"lg"}>Create New Collection</Heading>
            <Text fontSize={"lg"} my={2}>
              Hello tutor, it's time to put your content out there!
            </Text>
            <form onSubmit={handleSubmit}>
              <Grid
                my={4}
                textAlign="left"
                templateColumns={[
                  "1fr",
                  "repeat(1,1fr)",
                  "repeat(2, 1fr)",
                  "repeat(2, 1fr)",
                ]}
                placeContent="start"
                alignItems="start"
                gap={[2, 5, 5, 5]}
              >
                {error && <ErrorMessage message={error} />}

                <FormControl mt={6}>
                  <FormLabel key={"name"}>Author's Name/Address</FormLabel>

                  <Input
                    id="name"
                    type={"text"}
                    value={name}
                    placeholder="Your Name"
                    required={true}
                    readOnly={true}
                    size="lg"
                    onChange={(event) => setName(event.currentTarget.value)}
                    bg={useColorModeValue("gray.100", "gray.900")}
                  />
                </FormControl>

                <FormControl mt={6}>
                  <FormLabel key={"email"}>Email</FormLabel>
                  <Input
                    id="email"
                    type={"email"}
                    value={email}
                    placeholder="Email"
                    size="lg"
                    readOnly={true}
                    onChange={(event) => setEmail(event.currentTarget.value)}
                    bg={useColorModeValue("gray.100", "gray.900")}
                  />
                </FormControl>

                <FormControl isRequired my={6}>
                  <FormLabel key={"title"}>Course Title</FormLabel>
                  <Input
                    id="title"
                    type={"text"}
                    value={title}
                    placeholder="Course Title"
                    required={true}
                    readOnly={false}
                    size="lg"
                    onChange={(event) => setTitle(event.currentTarget.value)}
                    bg={useColorModeValue("gray.100", "gray.900")}
                  />
                </FormControl>

                <FormControl isRequired my={6}>
                  <FormLabel key={"copies"}>Number of Copies</FormLabel>
                  <Input
                    id="copies"
                    type={"number"}
                    value={copies}
                    placeholder="How many copies"
                    required={true}
                    size="lg"
                    readOnly={true}
                    onChange={(event) => setCopies(event.currentTarget.value)}
                    bg={useColorModeValue("gray.100", "gray.900")}
                  />
                </FormControl>
              </Grid>{" "}
              <FormControl isRequired mt={6}>
                <FormLabel key={"description"}>Course Description</FormLabel>
                <Textarea
                  id="description"
                  type={"text"}
                  value={description}
                  placeholder="Type your message..."
                  size="lg"
                  onChange={(event) =>
                    setDescription(event.currentTarget.value)
                  }
                  bg={useColorModeValue("gray.100", "gray.900")}
                />
              </FormControl>
              <Button
                variant="solid"
                type="submit"
                width="full"
                // bg={useColorModeValue('gray.200', 'gray.900')}
                mt={4}
                isLoading={isLoading}
                loadingText="Submitting"
                colorScheme={"blue"}
              >
                Create Collection
              </Button>
            </form>
          </Box>
        </Flex>
      </SlideFade>
    </Container>
  );

  const OnIPFSView = (
    <>
      <Container>
        <Heading>
          MetaData On IPFS
          {collectionInfo != null ? (
            <List>
              <ListItem>CID: {cid}</ListItem>
              <ListItem>Collection {collectionInfo.title}</ListItem>
              <ListItem>Description {collectionInfo.description}</ListItem>
              <ListItem>Author{collectionInfo.name}</ListItem>
              <ListItem>copies: {collectionInfo.copies}</ListItem>
            </List>
          ) : (
            <></>
          )}
        </Heading>
      </Container>

      <Button
        variant="solid"
        type="submit"
        width="full"
        // bg={useColorModeValue('gray.200', 'gray.900')}
        mt={4}
        isLoading={isLoading}
        loadingText="Submitting"
        colorScheme={"blue"}
      >
        Add New Card
      </Button>

      <Container maxW="container.lg" mt={["5", "10"]} mb={["5", "10"]}>
        <SlideFade in offsetX={80}>
          <Flex width="full" align="center" justifyContent="center"></Flex>

          <form onSubmit={handleContent}>
            <FormControl mt={6}>
              <FormLabel key={"front"}>Front Text</FormLabel>
              <Input
                id="front"
                type={"text"}
                value={name}
                placeholder="Add Text that appears in front"
                required={true}
                readOnly={false}
                size="lg"
                onChange={(event) => setName(event.currentTarget.value)}
                bg={useColorModeValue("gray.100", "gray.900")}
              />
            </FormControl>
          </form>
        </SlideFade>
      </Container>
    </>
  );

  return (
    <React.Fragment>
      <Head>
        <title>Mint NFT - GreyMeta</title>
        <meta name="description" content="" />
        <link rel="icon" href="/profile_picture.png" />
      </Head>

      <main>{publishedOnIPFS ? OnIPFSView : onCreateView}</main>
    </React.Fragment>
  );
}

export default Mint;

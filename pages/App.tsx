import React from "react";
import { Container, Divider } from "@chakra-ui/react";
import Head from "next/head";
import { RecentCardsSection } from "../section/RecentCardsSection";
import ProfileSection from "../section/ProfileSection";
import PopularTagsSection from "../section/PopularTagsSection";

function App() {
  return (
    <React.Fragment>
      <Head>
        <title>GreyMeta | E-Learning</title>
        <meta property="og:title" content="GreyMeta | E-Learning"></meta>
        <meta name="description" content="  Study smart, practice with" />
        <link rel="icon" href="/profile_picture.png" />
      </Head>

      <main>
        <Container maxW="container.lg" mt={["5", "10"]} mb={["5", "10"]}>
          <ProfileSection />
          <Divider my={7} />
          <RecentCardsSection project={undefined} />
          <Divider my={7} />
          <PopularTagsSection />
        </Container>
      </main>
    </React.Fragment>
  );
}

export default App;

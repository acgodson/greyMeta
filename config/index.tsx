import { FaDiscord, FaGithub } from "react-icons/fa";

const siteConfig = {
  copyright: `© ${new Date().getFullYear()} Tezos Hackathon by Tinybird#2423. Open Source License.`,
  author: {
    name: "TinyBird",
    accounts: [
      {
        url: "https://github.com/acgodson/greyMeta",
        icon: <FaGithub />,
        name: "Github",
        type: "gray",
        label: "github",
      },
      {
        url: "https://discord.com/",
        icon: <FaDiscord />,
        name: "Linkedin",
        type: "linkedin",
        label: "github",
      },
    ],
  },
};

export { siteConfig };

import React, {
  Context,
  createContext,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  FaReact,
  FaJs,
  FaDiscord,
  FaAndroid,
  FaJava,
  FaLinkedin,
  FaStackOverflow,
  FaMedium,
  FaGithub,
  FaHtml5,
  FaBook,
  FaUserShield,
  FaHospital,
} from "react-icons/fa";
import { Web3Auth } from "@web3auth/web3auth";
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

import RPC from "../utils/tezosRPC";
import { WEB3AUTH_ID } from "../constants";

export interface AuthContext {
  values: {};
}

export const gameTags = [
  {
    name: "HTML QUIZ",
    icon: <FaHtml5 fontSize="20px" />,
    url: "",
  },
  {
    name: "Vocabulary",
    icon: <FaBook fontSize="20px" />,
    url: "",
  },

  {
    name: "Health Saftey",
    icon: <FaHospital fontSize="20px" />,
    url: "",
  },
  {
    name: "Cyber Security",
    icon: <FaUserShield fontSize="20px" />,
    url: "",
  },
];

export const liveNFTs = [
  {
    name: "HTML Quiz",
    imageUrl:
      "https://play-lh.googleusercontent.com/tgLiP-ZL-sBuZt2RzDU1tN88Cp7NPbdjF7c0311_dui86f1HrAQM0j4gXaRE0pb5zW0=s360-rw",
    alt: "html",
    summary:
      "Brush up your html knowledge with the latest summary from my udemy course",
  },
  {
    name: "SAT English",
    imageUrl:
      "https://play-lh.googleusercontent.com/tgLiP-ZL-sBuZt2RzDU1tN88Cp7NPbdjF7c0311_dui86f1HrAQM0j4gXaRE0pb5zW0=s360-rw",
    alt: "english",
    summary:
      "Prepare for SAT or any English quiz using these sets of carefully created words",
  },
];

export const GlobalContext = createContext<AuthContext["values"] | null>(null);

const GlobalProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState<Partial<any> | null>(null);
  const [web3Auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(
    null
  );
  const [tezosKeys, setTezosKeys] = useState<any | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<any | null>(null);

  //Web3auh Client ID
  const clientId = WEB3AUTH_ID;
  //initalizing web3auth on tezos chain
  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.OTHER,
          },
        });

        setWeb3Auth(web3auth);

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            clientId,
            network: "testnet",
            uxMode: "popup",
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const getUserData = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    if (provider) {
      const user = await web3Auth.getUserInfo();
      setUserInfo(user);
    }
  };

  const getTezosKeyPair = async () => {
    if (!provider) {
      console.log("provider not initialized yet | user not logged in");
      return;
    }
    const rpc = new RPC(provider as SafeEventEmitterProvider);
    const tezosKey = await rpc.getTezosKeyPair();
    if (tezosKey) {
      setTezosKeys(tezosKey);
    }
    console.log(tezosKey);
  };

  const getAccounts = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const userAccount = await rpc.getAccounts();
    if (userAccount) {
      setAccount(userAccount);
    }
    console.log(userAccount);
  };

  const getBalance = async () => {
    if (!provider) {
      console.log("provider not initialized yet");
      return;
    }
    const rpc = new RPC(provider);
    const balance = await rpc.getBalance();
    if (balance) {
      setBalance(balance);
    }
    console.log(balance);
  };

  useEffect(() => {
    //Get users authenticated profile from web3auth
    if (!userInfo) {
      getUserData();
    }
  });

  useEffect(() => {
    //Get tezosKeyPair from web3auth provider
    if (!tezosKeys) {
      getTezosKeyPair();
    }
    if (!account) {
      getAccounts();
    }
  });

  useEffect(() => {
    if (!balance) {
      getBalance();
    }
  });

  return (
    <GlobalContext.Provider
      value={{
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

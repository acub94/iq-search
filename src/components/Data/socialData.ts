import {
  RiTwitterFill,
  RiTelegramFill,
  RiInstagramFill,
  RiGithubFill,
  RiFacebookFill,
  RiShareLine,
  RiThumbUpLine,
  RiThumbDownLine,
} from "react-icons/ri";
import { BsDiscord } from "react-icons/bs";

export const Socials = [
  {
    id: 1,
    href: "https://twitter.com/IQWIKI",
    name: "twitter",
    icon: RiTwitterFill,
  },
  {
    id: 2,
    href: "https://github.com/EveripediaNetwork",
    name: "github",
    icon: RiGithubFill,
  },
  {
    id: 3,
    href: "https://instagram.com/everipedia",
    name: "instagram",
    icon: RiInstagramFill,
  },
  {
    id: 4,
    href: "https://web.facebook.com/everipedia?_rdc=1&_rdr",
    name: "facebook",
    icon: RiFacebookFill,
  },
  {
    id: 5,
    href: "https://t.me/everipedia",
    name: "telegram",
    icon: RiTelegramFill,
  },

  {
    id: 6,
    href: "https://discord.gg/x9EWvTcPXt",
    name: "discord",
    icon: BsDiscord,
  },
];

export const ResultIcons = [
  {
    id: 1,
    icon: RiShareLine,
  },
  {
    id: 2,
    icon: RiThumbUpLine,
  },
  {
    id: 3,
    icon: RiThumbDownLine,
  },
];

export const tech = [
  { label: "Languages", items: ["C++", "Java", "Python"] },
  {
    label: "Web Development",
    items: ["ReactJs", "ExpressJs", "NodeJs", "Django", "GSAP", "ThreeJs"],
  },
  {
    label: "Blockchain",
    items: ["Solidity", "Web3Js", "Ganache", "Hardhat", "Foundry"],
  },
  { label: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB"] },
  {
    label: "Tools & Systems",
    items: ["Unity", "Blender", "Windows", "Kali Linux"],
  },
  { label: "Security", items: ["Nmap", "Burp Suite", "Hydra", "Wireshark"] },
];

export const techCount = tech.reduce((total, category) => total + category.items.length, 0);
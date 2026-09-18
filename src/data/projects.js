import Chemical_Equipment_Parameter_Visualizer from "/assets/Chemical_Equipment_Parameter_Visualizer.jpg";
import ObstacleMania from "/assets/ObstacleMania.jpg";
import Solidity_Wallet from "/assets/Solidity_Wallet.jpg";
import Coffee_Website from "/assets/Coffee Website.jpg";

export const projects = [
  {
    image: Chemical_Equipment_Parameter_Visualizer,
    name: "Chemical Equipment Parameter Visualizer",
    info: "A hybrid web and desktop application to analyze and visualize chemical equipment data in real time.",
    githubLink: "https://github.com/aysh-mzmdr/Chemical_Equipment_Parameter_Visualizer/",
    hasLiveLink: false,
    liveLink: "",
    tags: ["Django", "React", "Pandas"],
  },
  {
    image: ObstacleMania,
    name: "ObstacleMania",
    info: "A high-speed obstacle dodging game built in Unity with multiple difficulty levels and real-time collision mechanics.",
    githubLink: "https://github.com/aysh-mzmdr/ObstacleMania/",
    hasLiveLink: true,
    liveLink: "https://aysh-mzmdr.github.io/ObstacleMania/",
    tags: ["Unity", "C#", "WebGL"],
  },
  {
    image: Solidity_Wallet,
    name: "Solidity Wallet",
    info: "A decentralized wallet interface for sending and receiving Ether through on-chain blockchain transactions.",
    githubLink: "https://github.com/aysh-mzmdr/Solidity_Wallet/",
    hasLiveLink: false,
    liveLink: "",
    tags: ["Solidity", "Web3.js", "ThreeJs"],
  },
  {
    image: Coffee_Website,
    name: "Coffee Website",
    info: "A front-end responsive website designed and built for a fictional coffee shop brand.",
    githubLink: "https://github.com/aysh-mzmdr/Coffee_Website/",
    hasLiveLink: true,
    liveLink: "https://aysh-mzmdr.github.io/Coffee_Website/",
    tags: ["HTML", "CSS", "JavaScript"],
  },
];

export const projectCount = projects.length
import Chemical_Equipment_Parameter_Visualizer from "/assets/Chemical_Equipment_Parameter_Visualizer.jpg";
import The_Unknown_Labyrinth from "/assets/Labyrinth.jpg";
import Solidity_Wallet from "/assets/Solidity_Wallet.jpg";
import Pokedex from "/assets/Pokedex.jpg";

export const projects = [
  {
    image: The_Unknown_Labyrinth,
    name: "The Unknown Labyrinth",
    info: "Navigate a procedurally generated, algorithmically-verified atmospheric first-person maze-horror game built in Unity, with custom radial fog shader that fades visibility realistically.",
    githubLink: "https://github.com/aysh-mzmdr/The_Unknown_Labyrinth",
    hasLiveLink: true,
    liveLink: "https://aysh-mzmdr.github.io/The_Unknown_Labyrinth/",
    tags: ["Unity", "Procedural Generation", "HLSL", "C#", "WebGL"],
  },
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
    image: Pokedex,
    name: "Pokedex",
    info: "An interactive, animated Pokédex that fetches live Pokémon data from PokeAPI, complete with sound effects, cries, and a scan-through-entries experience.",
    githubLink: "https://github.com/aysh-mzmdr/Pokedex/",
    hasLiveLink: true,
    liveLink: "https://aysh-mzmdr.github.io/Pokedex/",
    tags: ["React", "JavaScript", "REST API", "CSS"],
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
];

export const projectCount = projects.length
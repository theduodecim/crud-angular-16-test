import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { Hero } from "./main/interfaces/hero.interface";


export class MockHeroVillanData implements InMemoryDbService {
    createDb(reqInfo?: RequestInfo | undefined): {} | Observable<{}> | Promise<{}> {
                const heros: Hero[] = [
                {
                  id: "1",
                  name: "The Mighty Thor",
                  description: "A powerful Norse god of thunder and lightning.",
                  gear: "Mjolnir, his enchanted hammer",
                  category: "Melee",
                  rating: 5
                },
                {
                  id: "2",
                  name: "Wonder Woman",
                  description: "A powerful Amazonian warrior and princess.",
                  gear: "The Lasso of Truth, her magical lasso",
                  category: "Melee",
                  rating: 5
                },
                {
                  "id": "3",
                  "name": "Captain America",
                  "description": "A super-soldier with superhuman strength and durability.",
                  "gear": "His indestructible shield",
                  "category": "Melee",
                  "rating": 4
                },
                {
                  "id": "498",
                  "name": "The Invisible Woman",
                  "description": "A member of the Fantastic Four with the ability to turn invisible and generate force fields.",
                  "gear": "Her invisible force fields",
                  "category": "Ranged",
                  "rating": 4
                },
                {
                  "id": "499",
                  "name": "The Thing",
                  "description": "A member of the Fantastic Four with superhuman strength and durability.",
                  "gear": "His rocky skin",
                  "category": "Melee",
                  "rating": 4
                },
                {
                  "id": "500",
                  "name": "Human Torch",
                  "description": "A member of the Fantastic Four with the ability to fly and generate fire.",
                  "gear": "His fiery powers",
                  "category": "Ranged",
                  "rating": 4
                },
                {
                    "id": "501",
                    "name": "The Scarlet Witch",
                    "description": "A powerful mutant with the ability to manipulate reality.",
                    "gear": "Her chaos magic",
                    "category": "Ranged",
                    "rating": 5
                  },
                  {
                    "id": "502",
                    "name": "Doctor Strange",
                    "description": "A powerful sorcerer who protects the Earth from mystical threats.",
                    "gear": "The Eye of Agamotto and the Cloak of Levitation",
                    "category": "Ranged",
                    "rating": 5
                  },
                  {
                    "id": "503",
                    "name": "Spider-Man",
                    "description": "A teenage superhero with superhuman strength, agility, and the ability to cling to walls.",
                    "gear": "His web-shooters and spider-sense",
                    "category": "Melee",
                    "rating": 5
                  },
                  {
                    "id": "597",
                    "name": "The Flash",
                    "description": "A superhero with the ability to move at superhuman speeds.",
                    "gear": "His lightning-fast reflexes",
                    "category": "Speedster",
                    "rating": 4
                  },
                  {
                    "id": "598",
                    "name": "Aquaman",
                    "description": "The king of Atlantis with superhuman strength and the ability to communicate with sea creatures.",
                    "gear": "His trident and Atlantean armor",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "599",
                    "name": "Green Lantern",
                    "description": "A member of the Green Lantern Corps with the ability to create constructs out of light.",
                    "gear": "His power ring",
                    "category": "Ranged",
                    "rating": 4
                  },
                  {
                    "id": "600",
                    "name": "Batman",
                    "description": "A wealthy philanthropist who fights crime as a vigilante.",
                    "gear": "His high-tech gadgets and martial arts skills",
                    "category": "Melee",
                    "rating": 5
                  },
                  {
                    "id": "601",
                    "name": "The Incredible Hulk",
                    "description": "A powerful mutant with superhuman strength and durability.",
                    "gear": "His massive muscles and rage",
                    "category": "Melee",
                    "rating": 5
                  },
                  {
                    "id": "602",
                    "name": "Iron Man",
                    "description": "A genius billionaire playboy philanthropist with a high-tech suit of armor.",
                    "gear": "His Iron Man suit",
                    "category": "Ranged",
                    "rating": 5
                  },
                  {
                    "id": "603",
                    "name": "Captain Marvel",
                    "description": "A powerful Kree warrior with superhuman strength, speed, and flight.",
                    "gear": "Her Kree powers and binary energy blasts",
                    "category": "Ranged",
                    "rating": 5
                  },
            
                  {
                    "id": "619",
                    "name": "Ant-Man",
                    "description": "A superhero with the ability to shrink to the size of an ant and control ants.",
                    "gear": "His Ant-Man suit",
                    "category": "Ranged",
                    "rating": 3
                  },
                  {
                    "id": "620",
                    "name": "The Wasp",
                    "description": "A superhero with the ability to shrink to the size of a wasp and fly.",
                    "gear": "Her Wasp suit",
                    "category": "Ranged",
                    "rating": 3
                  },
                  {
                    "id": "621",
                    "name": "The Vision",
                    "description": "A powerful android with superhuman strength, durability, and flight.",
                    "gear": "His density manipulation and solar beam abilities",
                    "category": "Ranged",
                    "rating": 4
                  },
                  {
                    "id": "622",
                    "name": "Winter Soldier",
                    "description": "A highly skilled assassin with a cybernetic arm.",
                    "gear": "His cybernetic arm and martial arts skills",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "623",
                    "name": "Black Widow",
                    "description": "A highly skilled assassin and spy.",
                    "gear": "Her martial arts skills and Widow's Bites",
                    "category": "Melee",
                    "rating": 4
                  },
                 
                  {
                    "id": "649",
                    "name": "Hawkeye",
                    "description": "A skilled archer with superhuman accuracy.",
                    "gear": "His bow and arrows",
                    "category": "Ranged",
                    "rating": 4
                  },
                  {
                    "id": "650",
                    "name": "Iron Fist",
                    "description": "A skilled martial artist with the ability to channel his chi into his fists.",
                    "gear": "His martial arts skills and chi-enhanced fists",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "651",
                    "name": "Luke Cage",
                    "description": "A superhero with superhuman strength and durability.",
                    "gear": "His unbreakable skin",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "652",
                    "name": "Jessica Jones",
                    "description": "A private investigator with superhuman strength and flight.",
                    "gear": "Her superhuman strength and flight",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "653",
                    "name": "Daredevil",
                    "description": "A blind vigilante with heightened senses and martial arts skills.",
                    "gear": "His billy clubs and heightened senses",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "654",
                    "name": "The Punisher",
                    "description": "A vigilante who uses deadly force to fight crime.",
                    "gear": "His arsenal of weapons and martial arts skills",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "655",
                    "name": "Ghost Rider",
                    "description": "A vigilante with the power to transform into a flaming skeleton.",
                    "gear": "His demonic powers and hellfire chain",
                    "category": "Ranged",
                    "rating": 4
                  },
                  {
                    "id": "656",
                    "name": "Blade",
                    "description": "A half-human, half-vampire vampire hunter.",
                    "gear": "His sword and martial arts skills",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "657",
                    "name": "Morbius, the Living Vampire",
                    "description": "A living vampire with superhuman strength, speed, and healing.",
                    "gear": "His vampiric abilities",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "658",
                    "name": "Venom",
                    "description": "A human bonded to an alien symbiote with superhuman strength, speed, and durability.",
                    "gear": "His symbiote suit and spider-like abilities",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "659",
                    "name": "Deadpool",
                    "description": "A mercenary with superhuman healing and a regenerative factor.",
                    "gear": "His swords and guns",
                    "category": "Melee",
                    "rating": 4
                  },
                  {
                    "id": "660",
                    "name": "Wolverine",
                    "description": "A mutant with superhuman strength, speed, agility, and healing.",
                    "gear": "His adamantium claws and skeleton",
                    "category": "Melee",
                    "rating": 5
                  }
                 ]


//Villans emulated Enpoint
                const villans: Hero[] = [
                  {
                      "id": "125",
                      "name": "Red Goblin",
                      "description": "A fusion of Green Goblin and Carnage with a thirst for chaos.",
                      "category": "Melee",
                      "gear": "Pumpkin Bombs",
                      "rating": 4
                  },
                  {
                      "id": "126",
                      "name": "Kraven the Hunter",
                      "description": "A skilled big game hunter with enhanced physical abilities.",
                      "category": "Melee",
                      "gear": "Spear",
                      "rating": 3
                  },
                  {
                      "id": "127",
                      "name": "Electro",
                      "description": "A villain with the ability to control electricity and discharge powerful blasts.",
                      "category": "Ranged",
                      "gear": "Electric Gauntlets",
                      "rating": 4
                  },
                  {
                      "id": "128",
                      "name": "Sandman",
                      "description": "A criminal who can transform his body into sand.",
                      "category": "Melee",
                      "gear": "None",
                      "rating": 3
                  },
                  {
                      "id": "129",
                      "name": "Black Adam",
                      "description": "An ancient Egyptian warrior with the power of six Egyptian gods.",
                      "category": "Melee",
                      "gear": "Scarab Amulet",
                      "rating": 5
                  },
                  {
                      "id": "130",
                      "name": "Vulture",
                      "description": "An elderly inventor with a suit that grants him enhanced strength and flight.",
                      "category": "Ranged",
                      "gear": "Wing Suit",
                      "rating": 3
                  },
                  {
                      "id": "131",
                      "name": "Deadshot",
                      "description": "A deadly assassin with unmatched accuracy.",
                      "category": "Ranged",
                      "gear": "Wrist-Mounted Guns",
                      "rating": 4
                  },
                  {
                      "id": "132",
                      "name": "Lizard",
                      "description": "A scientist who transforms into a giant, powerful lizard.",
                      "category": "Melee",
                      "gear": "None",
                      "rating": 3
                  },
                  {
                      "id": "133",
                      "name": "Juggernaut",
                      "description": "A behemoth with unstoppable momentum and incredible strength.",
                      "category": "Melee",
                      "gear": "None",
                      "rating": 4
                  },
                  {
                      "id": "134",
                      "name": "Sabretooth",
                      "description": "A vicious mutant with superhuman strength and a healing factor.",
                      "category": "Melee",
                      "gear": "Claws",
                      "rating": 4
                  },
                  {
                    "id": "135",
                    "name": "Green Goblin",
                    "description": "A brilliant scientist turned insane with a variety of weapons and gadgets.",
                    "category": "Ranged",
                    "gear": "Pumpkin Bombs",
                    "rating": 4
                },
                {
                    "id": "136",
                    "name": "Sinestro",
                    "description": "A former Green Lantern with a yellow power ring that creates constructs fueled by fear.",
                    "category": "Ranged",
                    "gear": "Yellow Power Ring",
                    "rating": 4
                },
                {
                    "id": "137",
                    "name": "Reverse-Flash",
                    "description": "A speedster with the ability to travel through time and manipulate the Speed Force.",
                    "category": "Speedster",
                    "gear": "None",
                    "rating": 5
                },
                {
                    "id": "138",
                    "name": "Ra's al Ghul",
                    "description": "An immortal villain and leader of the League of Shadows.",
                    "category": "Melee",
                    "gear": "Sword of Destiny",
                    "rating": 4
                },
                {
                    "id": "139",
                    "name": "Mysterio",
                    "description": "A special effects artist and illusionist who uses deception to commit crimes.",
                    "category": "Ranged",
                    "gear": "Holographic Projector",
                    "rating": 3
                },
                {
                    "id": "140",
                    "name": "Doctor Octopus",
                    "description": "A brilliant scientist with mechanical tentacles and a grudge against Spider-Man.",
                    "category": "Melee",
                    "gear": "Mechanical Tentacles",
                    "rating": 4
                },
                {
                    "id": "141",
                    "name": "Black Manta",
                    "description": "A high-tech underwater mercenary with a personal vendetta against Aquaman.",
                    "category": "Ranged",
                    "gear": "Harpoon Gun",
                    "rating": 4
                },
                {
                    "id": "142",
                    "name": "The Riddler",
                    "description": "A criminal mastermind who leaves riddles as clues for his crimes.",
                    "category": "Mastermind",
                    "gear": "Riddles and Traps",
                    "rating": 3
                },
                {
                    "id": "143",
                    "name": "Clayface",
                    "description": "A shape-shifting villain with the ability to transform into any form.",
                    "category": "Melee",
                    "gear": "None",
                    "rating": 4
                },
                {
                    "id": "144",
                    "name": "Cheetah",
                    "description": "A cursed archaeologist with the abilities and appearance of a cheetah.",
                    "category": "Melee",
                    "gear": "Claws",
                    "rating": 4
                }
                
          // Add more villain data here...
        ];
            return {heros, villans};
    }

}




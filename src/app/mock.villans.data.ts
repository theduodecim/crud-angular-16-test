import { InMemoryDbService } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { Hero } from "./main/interfaces/hero.interface";


export class MockVillainData implements InMemoryDbService {
    createDb(): {} | Observable<{}> | Promise<{}> {
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
  
      return { villans };
    }
}
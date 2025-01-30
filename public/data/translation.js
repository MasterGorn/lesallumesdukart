const translations = {
    fr: {
        subnav: {
            maps: "Secrets des maps",
            tips: "Astuces",
            championship: "Championnat",
            beta: "Version Beta"
        },
        konamiCode: {
            rainbowRoad: "🌟 Thème Route Arc-en-ciel Activé ! 🌟",
            message: "Vous avez découvert le Konami Code !",
            close: "Fermer"
        },
        mapSecrets: {
            title: "📍 Secrets des maps 📍",
            content: "Découvrez les secrets des 16 circuits de Mario Kart 64.",
            legend: {
                show: "Afficher la légende",
                hide: "Masquer la légende",
                difficulty: {
                    titleDifficulty: "Difficulté",
                    veryEasy: "Très facile",
                    easy: "Facile",
                    medium: "Moyen",
                    hard: "Difficile",
                    veryHard: "Très difficile"
                },
                gain: {
                    titleGain: "Gain",
                    veryLittle: "Une mini portion",
                    little: "⅛ de tour",
                    medium: "¼ de tour",
                    aLot: "½ tour",
                    reallyALot: "1 tour"
                },
                mode: {
                    titleMode: "Modes",
                    time: "Time Trial",
                    GrandPrix: "Grand Prix",
                    Multiplayers: "Multijoueurs",
                }
            },
            size: {
                decrease: "Réduire",
                increase: "Agrandir"
            },
            circuitsData: circuitsDataFR,
        },
        tips: {
            title: "🛞 Astuces 🛞",
            tip1: {
                title: "🏎️ Carapace rouge en première position",
                content: "Une carapace rouge tirée en première position fera le tour du circuit jusqu’à toucher un joueur sur la route. 🎯"
            },
            tip2: {
                title: "🌬️ Aspiration",
                content: "Profitez de l’aspiration derrière un autre joueur pour gagner en vitesse et dépasser facilement. 🚀"
            },
            tip3: {
                title: "🍌 Éviter de glisser sur une banane",
                content: "Si vous touchez une banane, appuyez rapidement sur le bouton de frein 🅱️ pendant une secondepour ne pas perdre le contrôle de votre véhicule. Une petite note de musique 🎵 s’affichera si la manipulation est réussie !"
            },
            tip4: {
                title: "🚦 Départ rapide",
                content: "Appuyez sur le bouton d’accélération juste avant que la lumière devienne verte pour un départ boosté."
            },
            tip5: {
                title: "🏎️ Accélération après un virage",
                content: "Utilisez le bouton R pour déraper en sortie de virage. Bougez la manette de gauche à droite pour changer la fumée (jaune → orange). Relâchez R quand elle est orange pour une accélération."
            },
            tip6: {
                title: "🛡️ Contrer une carapace bleue",
                content: "3 façons de contrer une carapace bleue : Avec une autre carapace bleue maintenue à l’arrière, avec un fantôme 👻 ou une étoile. ⭐"
            },
            tip7: {
                title: "🎯 Piéger ses adversaires",
                content: "Placez un faux bloc juste derrière un vrai bloc pour qu’il soit détecté au dernier moment."
            },
            tip8: {
                title: "⚡ Maximiser les éclairs",
                content: "Sur les courses avec des tremplins (Wario Stadium, Autodrome Royal, Château de Bowser, Jungle DK), lancez l’éclair lorsque les concurrents approchent du tremplin. Ils ne pourront pas le passer. Sur les courses avec de longs sauts secrets (Plage Koopa, Autodrome Royal, Route Arc-en-ciel), utilisez l’éclair au bon moment pour faire rater les passages secrets à vos adversaires. Enfin, sur Montagne Choco, utilisez le lors de la boucle pour faire tomber vos adversaires d'un niveau."
            },
            tip9: {
                title: "🔊 Couper la musique",
                content: "Pendant une partie, appuyez sur L pour adoucir ou couper la musique. Recommencez pour la réactiver."
            },
            tip10: {
                title: "🏁 Voir les records de Mario Raceway",
                content: "À l’écran titre, appuyez sur Z pour voir les meilleurs temps de Mario Raceway (mode Time Trial)."
            }
        },
        championship: {
            title: "🏆 Championnat 🏆",
            content: {
                intro: `<div class="championshipIntro">
                    <p>🎮 Avec mon frère jumeau et deux de nos meilleurs potes, nous faisons des soirées <strong>Mario Kart 64</strong> depuis plus de 25 ans, avec des règles très précises qui ont évolué au fil du temps.</p>
                    <p>🏆 Ces règles ont fini par devenir le cadre parfait pour un <strong>championnat</strong> sur ce jeu mythique.</p>
                </div>`,
                rules: `<div>
                    <p>🏁 <strong>Voici nos règles de jeu depuis 25 ans :</strong></p>
                    <ul class="championshipRules">
                        <li class="championshipRulesItem">🎮 Partie de 4 joueurs :
                            <ul class="championshipRulesSublist">
                                <li>Martin prend Yoshi.</li>
                                <li>Romain prend Bowser.</li>
                                <li>Bryan prend Donkey Kong.</li>
                                <li>Et je prends Wario, après avoir joué Toad pendant une dizaine d’années.</li>
                            </ul>
                        </li>
                        <li class="championshipRulesItem">🛞 On joue sur les <strong>16 courses</strong> (dans l’ordre) en 150CC.</li>
                        <li class="championshipRulesItem">🏆 Système de points :
                            <ul class="championshipRulesSublist">
                                <li>1er : 5 points.</li>
                                <li>2ème : 3 points.</li>
                                <li>3ème : 1 point.</li>
                                <li>4ème : 0 point.</li>
                            </ul>
                        </li>
                        <li class="championshipRulesItem">📊 À la fin des 16 courses, on additionne les points de toutes les courses. 
                            <br>💡 Astuce : Pour éviter les déconnexions, vous pouvez prendre des <strong>captures d’écran</strong> sur l’écran des résultats entre chaque course.
                        </li>
                        <li class="championshipRulesItem">⚔️ <strong>Égalité :</strong> 
                            <ul class="championshipRulesSublist">
                                <li>Si deux joueurs ont un score identique à la fin de la 16ème course, on rejoue les <strong>4 premières courses</strong>, soit 20 courses au total.</li>
                                <li>Si l’égalité persiste après la 20ème course, on continue avec les 4 suivantes, etc.</li>
                            </ul>
                        </li>
                        <li class="championshipRulesItem">📜 Passages secrets et bugs <strong>autorisés</strong>.</li>
                        <li class="championshipRulesItem">⏱️ Comptez environ 1 heure pour faire les 16 courses.</li>
                    </ul>
                </div>`,
                linkGoogleSheet: "https://docs.google.com/spreadsheets/d/1V36CXA8sAwXWd9L5uCtKBBC7t18V0mh0l6_Oqk4387Y/edit?gid=39949723#gid=39949723",
                googleSheet: `<div>
                    <p>📊 Nous vous proposons ici un <strong>tableau Google Sheet</strong> qui vous permettra :</p>
                    <ul>
                        <li>De conserver vos scores au fil du temps. 🕒</li>
                        <li>De calculer tout un tas de données. 📈</li>
                        <li>Et de déterminer qui est <strong>le meilleur joueur</strong> de la saison. 🥇</li>
                    </ul>
                    <p>Cliquez sur l'image du tableau ci-dessus pour accéder au Google Sheet.</p>
                </div>`,
                instagram: `<div>
                    <p>👥 <strong>Suivez-nous sur Instagram</strong> pour suivre l'avancée du championnat et les vidéos de passages secrets et belles actions.</p>
                    <p>Cliquez sur l'image du tableau ci-dessus pour accéder notre compte Instagram.</p>
                </div>`
            }
        },
        beta: {
            title: "🏗️ Version Beta 🏗️",
            content: {
                intro: "Les datas et images de la version beta de Mario Kart 64 sont disponibles ci-dessous. Elles témoignent des avancées et changements du jeu en cours de développement. Elles nous permettent de s'imaginer le jeu avec des options en plus, des personnages différents, une vue différente, etc.",
                items: "On peut voir que l'oeuf de Yoshi avait été imaginé, tout comme des billes. On y voit des champignons mécontents, peut être empoisonnés. Il y a également la plume surement supprimée car le saut se fait grâce à un bouton et le poids 10t aurait pu avoir le même effet qu'un Thwomp.",
                debugMode: "Le mode debug est présent, comme dans beaucoup de jeux, il permet de paramétrer des options et faire des tests pendant le développement du jeu.",
                drivers: "On voit un look bien différent pour les pilotes, vue de face, avec Kamek à la place de Donkey Kong.",
                kamek: "Kamek est présent sur la route (au loin près de Peach) et en 3ème position sur la gauche.",
                titleScreen: "Le premier écran titre nous montre le premier nom du jeu, mais aussi les anciens looks des personnages que l'on retrouve dans l'écran de sélection des pilotes.",
                ui: "La première interface utilisateur est présente et plutôt grossière par rapport au rendu final.",
                box: "La caisse d'objets a un look très différent de la version finale. Elle était sombre et plus carrée.",
                feather: "Preuve que la plume a été prévue pendant longtemps, le design des caisses d'objets avait déjà changée alors que la plume était encore présente.",
                kart: "Le stage Pont Ligubre est présent, avec des pentes.",
                town: "Une course dans la ville était prévue, avec des passages entre les batiments et dans un tunnel.",
                verticalScreen: "À deux joueurs, l'écran était séparé en deux par la verticalité de la caméra.",
                verticalBattle: "L'écran séparé par la vertical en mode battle. Il est encore plus flagrant ici que la visibilité est bien réduite par rapport à l'écran séparé par l'horizontale.",
            }
        },
        team: {
            title: "👥 L'équipe 👥",
            content: {
                name1: "Martin",
                name2: "Pierre",
                name3: "Bryan",
                name4: "Romain",
                role1: "La victime",
                role2: "Le rageux",
                role3: "Le chanceux",
                role4: "Le bourrin"
            }
        },
        footer: {
            copyright: {
                year: "2025 Les Allumés du Kart. © ",
                company: "Culture Games",
                rights: ". - Tous droits réservés.",
                nintendo: `Les personnages et éléments des jeux de ce site sont les propriétés de la société <span class="konamiCode">Nintendo</span>.`
            }
        }
    },
    en: {
        subnav: {
            maps: "Map Secrets",
            tips: "Tips",
            championship: "Championship",
            beta: "Beta"
        },
        konamiCode: {
            rainbowRoad: "🌟 Rainbow Road Theme Activated ! 🌟",
            message: "You have discovered the Konami Code !",
            close: "Close"
        },
        mapSecrets: {
            title: "📍  Map Secrets 📍",
            content: "Discover the secrets of the 16 tracks of Mario Kart 64.",
            legend: {
                show: "Show legend",
                hide: "Hide legend",
                difficulty: {
                    titleDifficulty: "Difficulty",
                    veryEasy: "Very easy",
                    easy: "Easy",
                    medium: "Medium",
                    hard: "Hard",
                    veryHard: "Very hard"
                },
                gain: {
                    titleGain: "Gain",
                    veryLittle: "A tiny portion",
                    little: "⅛ of a lap",
                    medium: "¼ of a lap",
                    aLot: "½ of a lap",
                    reallyALot: "1 lap"
                },
                mode: {
                    titleMode: "Modes",
                    time: "Time Trial",
                    GrandPrix: "Grand Prix",
                    Multiplayers: "Multiplayers",
                }
            },
            size: {
                decrease: "Decrease",
                increase: "Increase"
            },
            circuitsData: circuitsDataEN,
        },
        tips: {
            title: "🛞 Tips 🛞",
            tip1: {
                title: "🏎️ Red shell in first position",
                content: "A red shell fired while in first position will travel around the track until it hits a player on the road. 🎯"
            },
            tip2: {
                title: "🌬️ Drafting",
                content: "Take advantage of drafting behind another player to gain speed and overtake easily. 🚀"
            },
            tip3: {
                title: "🍌 Avoid slipping on a banana",
                content: "When you hit a banana, quickly press the brake button to avoid losing control of your vehicle. A small musical note 🎵 will appear if done correctly!"
            },
            tip4: {
                title: "🚦 Quick start",
                content: "Press the accelerator a fraction of a second before the light turns green for a boost start."
            },
            tip5: {
                title: "🏎️ Boosting out of a turn",
                content: "Use the R button to drift through a turn. Wiggle the control stick left and right to change the smoke color (yellow → orange). Release R when it’s orange for a mini boost."
            },
            tip6: {
                title: "🛡️ Blocking a blue shell",
                content: "3 ways to block a blue shell: Hold another blue shell behind you, use a ghost 👻 or a star. ⭐"
            },
            tip7: {
                title: "🎯 Tricking your opponents",
                content: "Place a fake item box right behind a real one, making it hard to detect until the last moment."
            },
            tip8: {
                title: "⚡ Maximizing lightning",
                content: "In tracks with ramps (Wario Stadium, Royal Raceway, Bowser’s Castle, DK Jungle), use the lightning bolt just as opponents approach the ramp to stop them from jumping. In tracks with long shortcut jumps (Koopa Troopa Beach, Royal Raceway, Rainbow Road), use the lightning at the perfect moment to make opponents miss the shortcut. Finally, on Choco Mountain, use it during the loop to knock your opponents down a level."
            },
            tip9: {
                title: "🔊 Turn off the music",
                content: "During the game, press L to lower or turn off the music. Press again to bring it back."
            },
            tip10: {
                title: "🏁 View Mario Raceway records",
                content: "On the title screen, press Z to view the best times on Mario Raceway (Time Trial mode)."
            }
        },
        championship: {
            title: "🏆 Championship 🏆",
            content: {
                intro: `<div>
                    <p>🎮 With my twin brother and two of our best friends, we've been playing <strong>Mario Kart 64</strong> for over 25 years, with very specific rules that have evolved over time.</p>
                    <p>🏆 These rules have become the perfect framework for a <strong>championship</strong> on this legendary game.</p>
                </div>`,
                rules: `<div>
                    <p>🏁 <strong>Here are our rules for over 25 years:</strong></p>
                    <ul class="championshipRules">
                        <li class="championshipRulesItem">🎮 4-player matches:
                            <ul class="championshipRulesSublist">
                                <li>Martin plays Yoshi.</li>
                                <li>Romain plays Bowser.</li>
                                <li>Bryan plays Donkey Kong.</li>
                                <li>I play Wario, after playing Toad for about ten years.</li>
                            </ul>
                        </li>
                        <li class="championshipRulesItem">🛞 Play on all <strong>16 tracks</strong> (in order) at 150CC.</li>
                        <li class="championshipRulesItem">🏆 Scoring system:
                            <ul class="championshipRulesSublist">
                                <li>1st: 5 points.</li>
                                <li>2nd: 3 points.</li>
                                <li>3rd: 1 point.</li>
                                <li>4th: 0 point.</li>
                            </ul>
                        </li>
                        <li class="championshipRulesItem">📊 At the end of the 16 tracks, add up the points from all races.
                            <br>💡 Tip: To avoid losing track due to disconnections, you can take <strong>screenshots</strong> of the results screen after each race.
                        </li>
                        <li class="championshipRulesItem">⚔️ <strong>Tiebreaker:</strong>
                            <ul class="championshipRulesSublist">
                                <li>If two players have identical scores after the 16th track, replay the <strong>first 4 tracks</strong>, making it 20 races total.</li>
                                <li>If the tie persists after the 20th track, continue with the next 4 tracks, and so on.</li>
                            </ul>
                        </li>
                        <li class="championshipRulesItem">📜 Secret paths and glitches are <strong>allowed</strong>.</li>
                        <li class="championshipRulesItem">⏱️ It takes about 1 hour to play all 16 tracks.</li>
                    </ul>
                </div>`,
                linkGoogleSheet: "https://docs.google.com/spreadsheets/d/1V36CXA8sAwXWd9L5uCtKBBC7t18V0mh0l6_Oqk4387Y/edit?gid=1796197462#gid=1796197462",
                googleSheet: `<div>
                    <p>📊 Here, we offer you a <strong>Google Sheet</strong> that allows you to:</p>
                    <ul>
                        <li>Keep track of your scores over time. 🕒</li>
                        <li>Calculate a variety of data. 📈</li>
                        <li>And determine who is <strong>the best player</strong> of the season. 🥇</li>
                    </ul>
                    <p>Click on the table image above to access the Google Sheet.</p>
                </div>`,
                instagram: `<div>
                    <p>👥 <strong>Follow us on Instagram</strong> to follow the progress of the championship and see videos of secret passages and beautiful actions.</p>
                    <p>Click on the image of the table above to access our Instagram account.</p>
                </div>`
            }
        },
        beta: {
            title: "🏗️ Beta version 🏗️",
            content: {
                intro: "The data and images from the beta version of Mario Kart 64 are available below. They showcase the game's progress and changes during development. They allow us to imagine the game with additional options, different characters, a different perspective, and more.",
                items: "We can see that Yoshi's egg was envisioned, as well as marbles. There are also grumpy mushrooms, possibly poisoned. The feather is also present, likely removed because jumping is done via a button, and the 10t weight might have had the same effect as a Thwomp.",
                debugMode: "The debug mode is present, as in many games, allowing developers to configure options and run tests during the game's development.",
                drivers: "The drivers have a very different look, seen from the front, with Kamek replacing Donkey Kong.",
                kamek: "Kamek appears on the track (far away near Peach) and is in 3rd position on the left.",
                titleScreen: "The first title screen shows us the game's original name, as well as the early looks of the characters that appear in the driver selection screen.",
                ui: "The first user interface is present and rather crude compared to the final version.",
                box: "The item box has a very different look from the final version. It was dark and more square.",
                feather: "Proof that the feather was planned for a long time, the design of the item boxes had already changed when the feather was still present.",
                kart: "The Banshee Boardwalk stage is present, featuring slopes.",
                town: "A city race was planned, with passages between buildings and in a tunnel.",
                verticalScreen: "In two-player mode, the screen was split vertically by the camera perspective.",
                verticalBattle: "The screen was split vertically in battle mode. It is even more evident here that visibility was significantly reduced compared to the horizontally split screen.",
                
            }
        },
        team: {
            title: "👥 The Team 👥",
            content: {
                name1: "Martin",
                name2: "Pierre",
                name3: "Bryan",
                name4: "Romain",
                role1: "The victim",
                role2: "The rageful",
                role3: "The lucky one",
                role4: "The braggart"
            }
        },
        footer: {
            copyright: {
                year: "2025 The Kart Fanatics. © ",
                company: "Culture Games",
                rights: ". - All rights reserved.",
                nintendo: `The characters and elements of the games on this site are the properties of the <span class="konamiCode">Nintendo</span> company.`
            }
        }
    }
}
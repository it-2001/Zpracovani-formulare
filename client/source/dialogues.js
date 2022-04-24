let dialogueScript = {
    en: {
        main: [
            [
                0,
                [0, "This is a demo, who cares about dialogues??"],
                [1, "Having some would be nice."],
                [0, "Yeah.. but there is no time for that."],
                [2, "We promise to have an interesting plot next time."],
                [0, "We will see. xd"],
                [2, "Anyway, whoever is reading this, I wish you good luck!"],
                ["_fight", 2]
            ]
        ]
    },
    cs: {
        main: [
            [
                0,
                [0, "Koho zajímají doalogy v demu??"],
                [1, "Bylo by fajn nějaké mít."],
                [0, "Jasně, ale na takové věci prostě není čas."],
                [2, "Slibujeme, že pro příště vytvoříme zajímyvý děj."],
                [0, "Uvidíme. xd"],
                [2, "Každopádně, všem co tohle čtou, přeji hodně štěstí!"],
                ["_fight", 2]
            ]
        ]
    },
    pl: {
        main: [
            [
                0,
                [0," To jest demo, kogo obchodzi dialogi ?"],
                [1, "Byłoby miło mieć trochę."],
                [0, "Tak... ale nie ma na to czasu."],
                [2, "Obiecujemy ciekawą fabułę następnym razem."],
                [0, "Zobaczymy. xd"],
                [2, "Zresztą ktokolwiek to czyta, życzę powodzenia!"],
                ["_fight", 2]
            ]
        ]
    }
}
function getDialogue(chapter, script) {
    var current = dialogueScript[langs[lang]].main[chapter][script]
    if (current === undefined) return undefined
    switch (current[0]) {
        case "_fight":
            game.startFight(current[1])
            return undefined
        case "_shout":
            game.dialogue.mono("shouting", current[1], current[2], current[3])
            return null
        case "_declare":
            game.dialogue.mono("declaring", current[1], current[2], current[3])
            return null
        default:
            return current
    }
} 
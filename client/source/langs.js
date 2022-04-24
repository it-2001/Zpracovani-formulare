let languages = {
    en:{
        Back: "Back",
        Volume:"Volume",
        Start:"Start",
        Options:"Options",
        MusicRoom:"Music Room",
        Normal:"Normal",
        Hard:"Hard",
        Nightmare:"Nightmare",
        Language:"Language",
        Resolution:"Resolution",
        Optimal:"Optimal",
        Quit:"Quit",
        Dialogues: "Dialogues",
        Practice:"Practice",
        Render:"Render",
        About:"About",
        SaveRecord:"Save record",
        Leaderboard: "Leaderboard"
    },
    cs:{
        Back: "Zpět",
        Volume:"Hlasitost",
        Start:"Start",
        Options:"Možnosti",
        MusicRoom:"Hudebna xd",
        Normal:"Normální",
        Hard:"Těžká",
        Nightmare:"Nemožná (srovnej se s tím)",
        Language:"Jazyk",
        Resolution:"Rozlišení",
        Optimal:"Optimální",
        Quit:"Odejít",
        Practice:"Cvičení",
        Dialogues: "Dialogy",
        Render:"Vykreslování",
        About:"O projektu",
        SaveRecord:"Uložit Záznam",
        Leaderboard: "Žebříček"
    },
    pl:{
        Back: "Powrót",
        Volume:"Głośność",
        Start:"Start",
        Options:"Opcje",
        MusicRoom:"Muzyka",
        Normal:"Normalna",
        Hard:"Trudna",
        Nightmare:"Koszmar",
        Language:"Język",
        Resolution:"Rezolucja",
        Optimal:"Optymalny",
        Quit:"Porzucić",
        Dialogues: "Dialogi",
        Practice:"Przećwiczyć",
        Render:"Renderowanie",
        About:"O projekcie",
        SaveRecord:"Zapisz Rekord",
        Leaderboard: "Leaderboard"
    }
}
let langs = []
for(let i in languages)
    langs.push(i)
let lg = keyword => languages[langs[lang]][keyword]
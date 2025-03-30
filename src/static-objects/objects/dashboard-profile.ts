export const profileText = [
  {
    title: "Vítejte v administrační části webu !",
    text: "Zde naleznete základní údaje o tom jak funguje administrační část, rozkliknutím sekcí níže se zobrazí podrobnosti k uvedeným tématům.",
    clearance: "visitor, member, editor, admin",
  },
  {
    title: "Jak funguje navigace v administrační části ?",
    text: "Povolené stránky naleznete pod vaší profilovkou v pravém horním rohu. Případně ještě pod logem v pravo od ikony domečku klikněte na tlačítko dashboard a zobrazí se základní navigace stránek.",
    clearance: "visitor",
  },
  {
    title: "Změna hesla",
    text: "Změna hesla není v adminu zatím naprogramovaná, nicméně lze změnit bez problému heslo před přihlášením kliknutím na zapomenuté heslo.",
    clearance: "visitor, member, editor, admin",
  },
  {
    title: "Profil a výměna obrázku",
    text: "Úvodní profilová stránka slouží převážně pro poskytnutí informací o úrovni oprávnění, jaké lze provádět operace, změnu úvodní fotografie. Nahrání nové fotografie by mělo proběhnout rychle, změna fotografie se dle zvolené architektury webu může projevit se zpožděním až několika minut.",
    clearance: "visitor, member, editor, admin",
  },
  {
    title: "Vkládání komentářů a lajkování (srdíčka)",
    text: "Ke každému článku lze vložit komentáře a lajk buď pod hlavní textem článku, případně srdíčko ještě na kartě článku buď v sekci články nebo u nejnovějších článků na hlavní straně.",
    clearance: "visitor, member, editor, admin",
  },
  {
    title: "Přidání článku krok za krokem",
    text: `Po kliknutí na tlačítko články v menu:
            - Vyberte kategorii příspěvku
            - Zadejte titulek článku
            - Vyplňte obsah článku
            - Nahrajte fotografie
            - Klikněte na některou z fotografií (zvolí se jako náhledá v kartě článků) Pokud nebude zvolena stane se náhledovou automaticky první nahraná.
            - Pokud budete chtít provést na článku po nahrátí nějaké změnu tak v seznamu článků najděte publikovaný článek, klikněte na ikonku tužky a článek se objeví k editování. Proveďte úpravy, klikněte na uložit.`,
    clearance: "member, editor, admin",
  },
  {
    title: "Nahrání novinky",
    text: `Nahrání novinky funguje ve stejném duchu jako článek s tou vyjímkou že obsahuje jiný (komplexnější) textový editor a nelze nahrávat fotogalerii (z důvodu povahy novinky jenž má omezenou platnost a následně se maže). Nicméně jedná se o zdarma verzi s omezením (1000x načtení měsíčně zdarma) tak moc neklikejte refresh :). Po zvoleném expiračním datu se nebude novinka již nadále zobrazovat v seznamu.`,
    clearance: "editor, admin",
  },
  {
    title: "Kalendář",
    text: `To co nahrajete na kalendář se automaticky projeví na hlavní stránce. Na rozdíl od hlavní stránky je kalendář v adminu interaktivní (na hlavní stránce je zamčený). Lze vkládat, mazat, editovat nové události. Na hlavní stránce se zobrazuje pouze aktuální měsíc, v adminu lze vyplnit dopředu. Akce na více dní je bohužel nutno naklikat po dni. Zadání v intervalech taky není naprogramováno, musí se naklikat.`,
    clearance: "editor, admin",
  },
  {
    title: "Knihovna",
    text: `Knihovna je taky plně interaktivní, lze do prvního řádku vkládat nové příspěvky, případně po kliknutí na tužku v první řádku položku editovat. Opět na veřejné části stránky je umožněno pouze prohlížení, nezobrazují se citlivá data (kdo má vypůjčeno, atd)`,
    clearance: "editor, admin",
  },
  {
    title: "Půjčovna",
    text: `Půjčovna má stejně jako knihovna a kalendář dvě verze (admin interaktivní a veřejná k prohlížení). Lze přidávat, upravovat, mazat nové položky. Veškeré citlivé údaje nejsou na veřejné stránce k dispozici.`,
    clearance: "editor, admin",
  },
  {
    title: "Úrovně oprávnění uživatelů",
    text: `Po kliknutí na tlačítko články v menu:
            - Admin: jednoduše povoleno vše
            - Editor: povoleno vše kromě sekce uživatelů
            - Member: kometáře, srdíčka, články
            - Visitor: komentáře, srdíčka`,
    clearance: "admin",
  },
];

export const ProfileAllowedActions = [
  {
    title: "Lajkovat články, vkládat komentáře",
    text: "Každý článek lze pod hlavním textem okomentovat, případně přidat srdíčko",
    clearance: "visitor, member, editor, admin",
  },
  {
    title: "Profil a výměna obrázku",
    text: "Na stránce profil (první stránka po přihlášení) lze měnit fotografii, více info v nápovědě.",
    clearance: "visitor, member, editor, admin",
  },
  {
    title: "Vkládat články",
    text: "Náhled na články všech uživatelů včetně úpravy, mazání",
    clearance: "member, editor, admin",
  },
  {
    title: "Publikovat novinky",
    text: "Náhled na novinky všech uživatelů včetně úpravy, mazání",
    clearance: "editor, admin",
  },
  {
    title: "Správa kalendáře",
    text: "Plná kontrola nad funkcemi kalendáře",
    clearance: "editor, admin",
  },
  {
    title: "Správa knihovny",
    text: "Plná kontrola nad knihovnou",
    clearance: "editor, admin",
  },
  {
    title: "Správa půjčovny",
    text: "Plná kontrola nad půjčovnou",
    clearance: "editor, admin",
  },
  {
    title: "Správa uživatelů",
    text: "Blokování, mazání, změna práv uživatelů",
    clearance: "admin",
  },
];

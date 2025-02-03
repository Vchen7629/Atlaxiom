import { UpdatedCard } from "./buttontypes";
import { Card, OwnedCard } from "./datatypes";

export type MonsterDrawer = {
    monstercarddrawerprops: {
        userId: string;
        openDrawer: string | null;
        setOpenDrawer: React.Dispatch<React.SetStateAction<string | null>>;
        allCardsView: boolean;
        setAllCardsView: React.Dispatch<React.SetStateAction<boolean>>;
        allCardsListResults: Card[]
        setAllCardsListResults: React.Dispatch<React.SetStateAction<Card[]>>;
        collectionCardsView: boolean;
        setCollectionCardsView: React.Dispatch<React.SetStateAction<boolean>>;
        collectionMonsterCards: OwnedCard[];
        setCollectionMonsterCards: React.Dispatch<React.SetStateAction<OwnedCard[]>>;
        allMonsterCards: Card[];
        setAllMonsterCards: React.Dispatch<React.SetStateAction<Card[]>>;
        setMonsterCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>;
    }
}

export type SpellDrawer = {
    spellcarddrawerprops: {
        openDrawer: string | null;
        setOpenDrawer: React.Dispatch<React.SetStateAction<string | null>>;
    }
}

export type TrapDrawer = {
    trapcarddrawerprops: {
        openDrawer: string | null;
        setOpenDrawer: React.Dispatch<React.SetStateAction<string | null>>;
    }
}
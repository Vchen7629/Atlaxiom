import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { FAQSidebar, PageAction, PageState, PageType } from "./types/dropdownmenutypes";
import { useReducer } from "react";
   
export function FAQPageMenuSideBar({ MenuProps}: FAQSidebar) {
    const {
      setWelcomePage,
      setDarkLightModePage,
      setCreationOverviewPage,
      setHowToCreateAccountPage,
      setCardSearchPageOverview,
      setCardSearchPageFilter,
      setCardSearchSelectedCardPage,
      setCardSearchPageGalleryList,
    } = MenuProps

    const initialState: PageState = {
      welcomePage: true,
      darkLightModePage: false,
      creationOverviewPage: false,
      howToCreateAccountPage: false,
      cardSearchPageOverview: false,
      cardSearchPageFilter: false,
      cardSearchSelectedCardPage: false,
      cardSearchPageGalleryList: false,
    };

    const [_, dispatch] = useReducer(pageReducer, initialState);

    function pageReducer(state: PageState, action: PageAction): PageState {
      switch (action.type) {
        case 'SET_PAGE':
          const newState = {
            welcomePage: action.payload === 'welcome',
            darkLightModePage: action.payload === 'darkLightMode',
            creationOverviewPage: action.payload === 'creationOverview',
            howToCreateAccountPage: action.payload === 'howToCreateAccount',
            cardSearchPageOverview: action.payload === 'cardSearchOverview',
            cardSearchPageFilter: action.payload === 'cardSearchFilter',
            cardSearchSelectedCardPage: action.payload === 'cardSearchSelectedCard',
            cardSearchPageGalleryList: action.payload === 'cardSearchGalleryList',
          };

          setWelcomePage(newState.welcomePage);
          setDarkLightModePage(newState.darkLightModePage);
          setCreationOverviewPage(newState.creationOverviewPage);
          setHowToCreateAccountPage(newState.howToCreateAccountPage);
          setCardSearchPageOverview(newState.cardSearchPageOverview);
          setCardSearchPageFilter(newState.cardSearchPageFilter);
          setCardSearchSelectedCardPage(newState.cardSearchSelectedCardPage);
          setCardSearchPageGalleryList(newState.cardSearchPageGalleryList);

          return newState;
        default:
          return state;
      }
    }

    function handlePageChange(page: PageType) {
      dispatch({ type: 'SET_PAGE', payload: page });
    };

    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-0">
          <button 
            className="ml-2 flex flex-1 items-center justify-between py-4 font-bold hover:text-[hsl(var(--background3))]"
            onClick={() => handlePageChange("welcome")}
          >
            Welcome
          </button>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-1">
          <button 
            className="ml-2 flex flex-1 items-center justify-between py-4 font-bold hover:text-[hsl(var(--background3))]"
            onClick={() => handlePageChange("darkLightMode")}
          >
            Using Dark/Light Mode
          </button>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-2">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Creating a User Account</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("creationOverview")}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("howToCreateAccount")}>How to create a user account</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-3">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Card Search Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchOverview")}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchFilter")}>Card Search Filters</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Selected Card Page</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchGalleryList")}>Gallery and List View</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-4">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Collection Manager Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Creating a new Deck</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Duplicating Decks</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Favoriting Decks</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Deleting Decks</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Gallery and List View</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-5">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Deck Builder Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Building your Deck</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Gallery and List View</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-6">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Edit Profile Options</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Viewing Decks through profile</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Your Statistics</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Changing your Username</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Changing your Email</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Changing your Password</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={() => handlePageChange("cardSearchSelectedCard")}>Deleting your account</button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
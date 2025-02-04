import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { FAQSidebar } from "./types/dropdownmenutypes";
   
  export function FAQPageMenuSideBar({ MenuProps}: FAQSidebar) {
    const {
      setWelcomePage,
      setDarkLightModePage,
      setCreationOverviewPage,
      setHowToCreateAccountPage,
      setCardSearchPageFilter,
    } = MenuProps

    function handleWelcomeClick() {
      setWelcomePage(true);
      setDarkLightModePage(false);
      setCreationOverviewPage(false);
      setHowToCreateAccountPage(false);
      setCardSearchPageFilter(false);
    }

    function handleDarkLightModeClick() {
      setWelcomePage(false);
      setDarkLightModePage(true);
      setCreationOverviewPage(false);
      setHowToCreateAccountPage(false);
      setCardSearchPageFilter(false);
    }

    function handleCreationOverviewClick() {
      setWelcomePage(false);
      setDarkLightModePage(false);
      setCreationOverviewPage(true);
      setHowToCreateAccountPage(false);
      setCardSearchPageFilter(false);
    }

    function handleHowToCreateAccountClick() {
      setWelcomePage(false);
      setDarkLightModePage(false);
      setCreationOverviewPage(false);
      setHowToCreateAccountPage(true);
      setCardSearchPageFilter(false);
    }

    function handleSearchFilter() {
      setWelcomePage(false);
      setDarkLightModePage(false);
      setCreationOverviewPage(false);
      setHowToCreateAccountPage(false);
      setCardSearchPageFilter(true);
    }

    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-0">
          <button 
            className="ml-2 flex flex-1 items-center justify-between py-4 font-bold hover:text-[hsl(var(--background3))]"
            onClick={handleWelcomeClick}
          >
            Welcome
          </button>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-1">
          <button 
            className="ml-2 flex flex-1 items-center justify-between py-4 font-bold hover:text-[hsl(var(--background3))]"
            onClick={handleDarkLightModeClick}
          >
            Using Dark/Light Mode
          </button>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-2">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Creating a User Account</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleCreationOverviewClick}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleHowToCreateAccountClick}>How to create a user account</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-3">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Card Search Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Card Search Filters</button>
            <button className="text-start pl-[1vw]">Selected Card Page</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Gallery and List View</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-4">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Collection Manager Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Creating a new Deck</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Duplicating Decks</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Favoriting Decks</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Deleting Decks</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Gallery and List View</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-5">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Deck Builder Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Building your Deck</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Gallery and List View</button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-6">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Edit Profile Options</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Overview</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Viewing Decks through profile</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Your Statistics</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Changing your Username</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Changing your Email</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Changing your Password</button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>Deleting your account</button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
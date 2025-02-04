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
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleCreationOverviewClick}>
              <span>Overview</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleHowToCreateAccountClick}>
                <span>How to create a user account</span>
            </button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-3">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Card Search Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Overview</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
                <span>Card Search Filters</span>
            </button>
            <button className="text-start pl-[1vw]">
              <span>Selected Card Page</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
                <span>Gallery and List View</span>
            </button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-4">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Collection Manager Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Overview</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Creating a new Deck</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Duplicating Decks</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Favoriting Decks</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Deleting Decks</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
                <span>Gallery and List View</span>
            </button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-5">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Deck Builder Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Overview</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Building your Deck</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Gallery and List View</span>
            </button>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem className="border-[hsl(var(--text))] text-[hsl(var(--text))]" value="item-6">
          <AccordionTrigger className="ml-2 font-bold hover:text-[hsl(var(--background3))]">Edit Profile Options</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Overview</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Viewing Decks through profile</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Your Statistics</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Changing your Username</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Changing your Email</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Changing your Password</span>
            </button>
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]" onClick={handleSearchFilter}>
              <span>Deleting your account</span>
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
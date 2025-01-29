import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
   
  export function FAQPageMenuSideBar() {
    return (
      <Accordion type="single" collapsible className="w-full">
         <AccordionItem value="item-1">
          <AccordionTrigger>Card Search Page</AccordionTrigger>
          <AccordionContent className="flex flex-col space-y-[1.5vh]">
            <button className="text-start pl-[1vw] hover:text-[hsl(var(--background3))]">
                <span>Card Search Filters</span>
            </button>
            <button className="text-start pl-[1vw]">
                <span>Clear Filter Button</span>
            </button>
            <button className="text-start pl-[1vw]">
                <span>Selecting a desired Card</span>
            </button>
            <button className="text-start pl-[1vw]">
                <span>Card Search Filters</span>
            </button>

          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Collection Manager Page</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Deck Builder Page</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Edit Profile Options</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Using Dark/Light Mode</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
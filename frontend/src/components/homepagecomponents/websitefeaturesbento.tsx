import {
    PersonIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
  } from "@radix-ui/react-icons";

   
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { useSelector } from "react-redux";
import { AuthenticationState } from "@/components/footer/types/hometypes";
import { startTransition } from "react";
import { useNavigate } from "react-router-dom";
//import { Marquee } from "../ui/marquee";
//import { cn } from "@/lib/utils";
//import { BarChart } from "lucide-react";
//import { ComponentBarChart } from "../profilepagecomponents/statisticscomponents/charts/barchartyear";
import { SearchCardBentoBackground } from "./searchCardBentoBackgroundcomponents/searchforcardsbackground";
import { UserProfileBentoGridBackground } from "./userprofilebentobackgroundcomponents/userprofilebackground";

/*const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];*/

   
  export function WebsiteFeaturesBento() {
    const isAuthenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);
    const navigate = useNavigate()

    const features = [
        {
          Icon: GlobeIcon,
          name: "Create and Manage Decks",
          description: (
            <>
              <p className="hidden lg:flex flex-col text-md text-gray-400">
                <span>- Create Decks</span>
                <span>- Add owned cards or search for cards to add via drag and drop</span>
                <span>- Duplicate, Favorite, or Delete Decks</span>
                <span>- Search for previously created Decks</span>
              </p>
              <p className="flex lg:hidden text-xs flex-col text-gray-400">
                <span>- Create Decks</span>
                <span>- Add owned cards or search for cards to add via drag and drop</span>
                <span>- Duplicate, Favorite, or Delete Decks</span>
                <span>- Search for previously created Decks</span>
              </p>
            </>
            ) as React.ReactNode,
            //href: isAuthenticated ? "/Deck" : "/login", 
            navigateHandler: () => {
              startTransition(() => {
                window.location.href = isAuthenticated ? "/Deck" : "/login";
              });
            },
            cta: "Learn more",
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
            background: <div/>/*(
              (
                <Marquee
                  pauseOnHover
                  className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
                >
                  {files.map((f, idx) => (
                    <figure
                      key={idx}
                      className={cn(
                        "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                        "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
                      )}
                    >
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-col">
                          <figcaption className="text-sm font-medium dark:text-white ">
                            {f.name}
                          </figcaption>
                        </div>
                      </div>
                      <blockquote className="mt-2 text-xs">{f.body}</blockquote>
                    </figure>
                  ))}
                </Marquee>
              )
            )*/
          },
        {
            Icon: FileTextIcon,
            name: "Manage Your Card Collection",
            description: "Add and Modify your Yugioh Card Collection",
            //href: "/FAQ",
            navigateHandler: () => {
              startTransition(() => {
                navigate('/FAQ', { state: { welcomepage: false, searchOverview: true } });
              });
            },
            cta: "Learn more",
            background: <img className="absolute -right-20 -top-20 opacity-60" alt="Card Collection Feature details homepage element"/>,
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
        },
        {
            Icon: InputIcon,
            name: "Search For Cards",
            description: (
              <>
                <p className="hidden lg:flex text-md flex-col text-gray-400">
                  <span>- Search Through a dataset of thousands of Yugioh Cards</span>
                  <span>- Filter Search Results via different filters</span>
                  <span>- Add Selected Cards to your User Collection</span>
                  <span>- View Pricing History of the Card</span>
                </p>
                <p className="flex lg:hidden text-xs flex-col text-gray-400">
                  <span>- Search Through a dataset of thousands of Yugioh Cards</span>
                  <span>- Filter Search Results via different filters</span>
                  <span>- Add Selected Cards to your User Collection</span>
                  <span>- View Pricing History of the Card</span>
                </p>
              </>
              ) as React.ReactNode,
              navigateHandler: () => {
                startTransition(() => {
                  navigate('/FAQ', { state: { welcomepage: false, searchOverview: true } });
                });
              },
            cta: "Learn more",
            className: " lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
            background: (
                <SearchCardBentoBackground/>
            )
        },
        {
          Icon: PersonIcon,
          name: "User Profiles",
          description: (
            <>  
              <p className="hidden lg:flex text-md flex-col text-gray-400">
                <span>- View Statistics of your User Account like collection history or collection status</span>
                <span>- Edit User Account Details like Username, Email, or Password</span>
                <span>- Delete your user account</span>
              </p>
              <p className="flex lg:hidden text-xs flex-col text-gray-400">
              <span>- View Statistics of your User Account like collection history or collection status</span>
                <span>- Edit User Account Details like Username, Email, or Password</span>
                <span>- Delete your user account</span>
              </p>
            </>
          ) as React.ReactNode,
          href: isAuthenticated ? "/profile" : "/login",
          navigateHandler: () => {
            startTransition(() => {
              navigate('/FAQ', { 
                state: { 
                  welcomepage: false, 
                  searchOverview: true 
                } 
              });
            });
          },
          cta: "Learn more",
          className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-4",
          background: <UserProfileBentoGridBackground />
        },
      ];

    return (
      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>
    );
  }
import {
    PersonIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
  } from "@radix-ui/react-icons";

   
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { useSelector } from "react-redux";
import { AuthenticationState } from "@/components/footer/footerbuttons/hometypes";
   
  export function WebsiteFeaturesBento() {
    const isAuthenticated = useSelector((state: AuthenticationState) => state.auth.token !== null);

    const features = [
        {
            Icon: GlobeIcon,
            name: "Create and Manage Decks",
            description: (
                <p className="flex flex-col text-gray-400">
                  <span>- Create Decks</span>
                  <span>- Add owned cards or search for cards to add via drag and drop</span>
                  <span>- Duplicate, Favorite, or Delete Decks</span>
                  <span>- Search for previously created Decks</span>
                </p>
              ) as React.ReactNode,
            href: isAuthenticated ? "/Deck" : "/login",
            cta: "Learn more",
            background: <img className="absolute -right-20 -top-20 opacity-60" />,
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
          },
        {
            Icon: FileTextIcon,
            name: "Manage Your Card Collection",
            description: "Add and Modify your Yugioh Card Collection",
            href: isAuthenticated ? "/getcards" : "/login",
            cta: "Learn more",
            background: <img className="absolute -right-20 -top-20 opacity-60" />,
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
        },
        {
            Icon: InputIcon,
            name: "Search For Cards",
            description: (
                <p className="flex flex-col text-gray-400">
                  <span>- Search Through a dataset of thousands of Yugioh Cards</span>
                  <span>- Filter Search Results via different filters</span>
                  <span>- Add Selected Cards to your User Collection</span>
                  <span>- View Pricing History of the Card</span>
                </p>
              ) as React.ReactNode,
            href: isAuthenticated ? "/searchloggedin" : "/search",
            cta: "Learn more",
            background: <img className="absolute -right-20 -top-20 opacity-60" />,
            className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        },
        {
          Icon: PersonIcon,
          name: "User Profiles",
          description: (
            <p className="flex flex-col text-gray-400">
              <span>- View Statistics of your User Account like collection history or collection status</span>
              <span>- Edit User Account Details like Username, Email, or Password</span>
              <span>- Delete your user account</span>
            </p>
          ) as React.ReactNode,
          href: isAuthenticated ? "/profile" : "/login",
          cta: "Learn more",
          background: <img className="absolute -right-20 -top-20 opacity-60" />,
          className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-4",
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
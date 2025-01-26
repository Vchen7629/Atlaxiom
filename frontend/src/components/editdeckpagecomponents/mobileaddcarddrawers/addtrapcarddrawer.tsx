
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmarkSquare } from "@fortawesome/free-solid-svg-icons";

const AddTrapCardDrawer = ({ openDrawer, setOpenDrawer}: any) => {
    return (
        <Drawer modal={false} open={openDrawer === "trap"}>
            <DrawerTrigger asChild>
                <Button 
                    className={`text-white h-9 px-2 bg-footer rounded-md`} 
                    variant="default"
                    onClick={() => setOpenDrawer("trap")}
                >
                    <FontAwesomeIcon icon={faPlus}/>Add Card
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto max-w-full">
                    <DrawerHeader className="flex w-full justify-between">
                        <DrawerTitle className="text-2xl text-[hsl(var(--background3))]">Add Trap Cards</DrawerTitle>
                            <DrawerClose className="bg-transparent" onClick={() => setOpenDrawer(null)}>
                                <FontAwesomeIcon icon={faXmarkSquare} className="fa-2xl text-[hsl(var(--background3))]"/>
                            </DrawerClose>
                    </DrawerHeader>
                    <section className="flex flex-col pl-2 items-center  space-y-[1%]">
                    </section>
                </div> 
            </DrawerContent>
        </Drawer>
    )}

export default AddTrapCardDrawer
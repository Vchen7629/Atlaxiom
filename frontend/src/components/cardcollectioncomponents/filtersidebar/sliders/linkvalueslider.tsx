import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { LinkSliderProps } from "../../types/dropdowntypes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLessThanEqual, faEquals, faGreaterThanEqual } from "@fortawesome/free-solid-svg-icons"

export function LinkScaleSliderComponent({ linkprops, className, ...props }: LinkSliderProps) {
  const {
    setCanClearFilter,
    linkFilter, setLinkFilter,
    setListCurrentPage,
    setGalleryCurrentPage,
    linkLessThanEqual, setLinkLessThanEqual, 
    linkEqual, setLinkEqual, 
    linkGreaterThanEqual, setLinkGreaterThanEqual,
  } = linkprops 

  const handleSliderChange = (newValue: number[]) => {
    setLinkFilter(newValue[0])
    setListCurrentPage(1);
    setGalleryCurrentPage(1);
    setCanClearFilter(newValue[0] !== null);
  }

  const handleLessThanClick = () => {
    setLinkLessThanEqual(true);
    setLinkEqual(false);
    setLinkGreaterThanEqual(false);
    setCanClearFilter(true);
  }

  const handleEqualClick = () => {
      setLinkLessThanEqual(false);
      setLinkEqual(true);
      setLinkGreaterThanEqual(false);
      setCanClearFilter(true);
  }

  const handleGreaterThanClick = () => {
      setLinkLessThanEqual(false);
      setLinkEqual(false);
      setLinkGreaterThanEqual(true);
      setCanClearFilter(true);
  }

  return (
    <div className="flex w-[94%]  my-2 justify-between">
      <div className="flex w-fit text-[hsl(var(--text))]">
        <button className={`${linkLessThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tl-lg rounded-bl-lg`} onClick={handleLessThanClick}><FontAwesomeIcon icon={faGreaterThanEqual} className="fa-xs"/></button>
        <button className={`${linkEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2`} onClick={handleEqualClick}><FontAwesomeIcon icon={faEquals} className="fa-xs"/></button>
        <button className={`${linkGreaterThanEqual ? "bg-[hsl(var(--background3))]" : "bg-[hsl(var(--atkdefcomponent))]"} h-6 px-2 rounded-tr-lg rounded-br-lg`} onClick={handleGreaterThanClick}><FontAwesomeIcon icon={faLessThanEqual} className="fa-xs"/></button>
      </div>
      <Slider
        value={[linkFilter ?? 1]}
        onValueChange={handleSliderChange}
        defaultValue={[1]}
        max={13}
        step={1}
        className={cn("w-[50%] mr-2", className)}
        {...props}
      />
      <span className="px-2 flex items-center justify-center rounded-lg bg-[hsl(var(--atkdefcomponent))] text-[hsl(var(--text))]">
        {linkFilter ?? 1}
      </span>
    </div>
  )
}

import ToolbarButton from "./ToolbarButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './Toolbar.css';
export default function Toolbar({open, setOpen, setMode, setSelectedDeck}){

    function handleClick() {
        setOpen(prev => !prev)
    }

    


    return (
        
       
        <div className="toolbar">
            <div onClick={handleClick}>
            <FontAwesomeIcon icon={faBars} className="nav-icon"  />
             {open && ( 
                <>
                <ToolbarButton onClick={()=> {setMode("study")
                setSelectedDeck(null)
                    
                }}>Study Mode</ToolbarButton>
                <ToolbarButton onClick={()=> {setMode("create")
                    setSelectedDeck(null)}
                }>Flashcards</ToolbarButton>                
                <ToolbarButton onClick={()=> {setMode("create-decks")
                    setSelectedDeck(null)}
                }>Create Decks</ToolbarButton>
                <ToolbarButton onClick={()=> {setMode("edit-decks")
                    setSelectedDeck(null)
             }}>Edit Decks</ToolbarButton>
                </>
             )}
                
            </div>
              </div>


    )
}
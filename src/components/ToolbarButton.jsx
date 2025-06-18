import './ToolbarButton.css'

export default function ToolbarButton({children, onClick}){
   
    return(
        <button className="toolbar-button" onClick={onClick}>{children}</button>
    )
}
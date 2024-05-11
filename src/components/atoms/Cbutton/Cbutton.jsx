import Button from "@mui/material/Button";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


function Cbutton({children, variant = "contained", type = "", onClick, showIcon}) {

  
    return (
        <div>
            <Button onClick={onClick} type={type} variant={variant} size="small" disableElevation icon='false'>
            {children}
            {showIcon && <ArrowDropDownIcon fontSize='medium' /> }
            </Button>
        </div>
    )
}

export default Cbutton
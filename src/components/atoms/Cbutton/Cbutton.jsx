import Button from "@mui/material/Button";



function Cbutton({children, variant = "contained", type = "", onClick }) {

  
    return (
        <div>
            <Button onClick={onClick} type={type} variant={variant} size="small" disableElevation>
            {children}
            </Button>
        </div>
    )
}

export default Cbutton
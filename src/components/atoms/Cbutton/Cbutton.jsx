import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip from '@mui/material/Tooltip';

function Cbutton({
  children,
  variant = 'contained',
  type = '',
  onClick,
  showIcon,
  disabled,
  tooltip,
}) {
  return (
    <div>
      <Tooltip title={tooltip} arrow>
        <span>
          <Button
            onClick={onClick}
            type={type}
            variant={variant}
            size="small"
            disableElevation
            disabled={disabled}
          >
            {children}
            {showIcon && <ArrowDropDownIcon fontSize="medium" />}
          </Button>
        </span>
      </Tooltip>
    </div>
  );
}

export default Cbutton;

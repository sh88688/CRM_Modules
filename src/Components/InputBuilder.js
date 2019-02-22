import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tooltip from "@material-ui/core/Tooltip";
import NotificationsIcon from "@material-ui/icons/Notifications";

const InputBuilder = props => {
  let inputElement = null;
  let startAdornment = null;
  let endAdornment = null;

  if (props.inputAdornment) {
    startAdornment = props.inputAdornment.startAdornment ? (
      <InputAdornment position={props.inputAdornment.startAdornment.position}>
        {props.inputAdornment.startAdornment.value}
      </InputAdornment>
    ) : null;
    endAdornment = props.inputAdornment.endAdornment ? (
      <Tooltip title="Hii ">
        <InputAdornment position={props.inputAdornment.endAdornment.position}>
          <NotificationsIcon />
        </InputAdornment>
      </Tooltip>
    ) : null;
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <TextField
          fullWidth
          error={props.errorValue === false && props.touched !== false}
          onChange={props.changed}
          {...props.elementConfig}
          InputProps={{
            startAdornment: startAdornment,
            endAdornment: endAdornment
          }}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <TextField
          fullWidth
          multiline={true}
          rows={3}
          rowsMax={4}
          error={props.errorValue === false && props.touched !== false}
          onChange={props.changed}
          {...props.elementConfig}
          InputProps={{
            startAdornment: startAdornment,
            endAdornment: endAdornment
          }}
        />
      );
      break;
    case "select":
      inputElement = (
        <TextField
          select
          fullWidth
          value={props.value}
          {...props.elementConfig.configs}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.displayValue}
            </MenuItem>
          ))}
        </TextField>
      );
      break;
    case "radio":
      inputElement = (
        <FormControl component="fieldset">
          <FormLabel
            component="legend"
            style={{ paddingTop: "8px", marginLeft: "2px" }}
          >
            <Typography component="h5" variant="subtitle1">
              {props.elementConfig.configs.label}
            </Typography>
          </FormLabel>
          <RadioGroup
            {...props.elementConfig.configs}
            onChange={props.changed}
            value={props.value}
            row
          >
            {props.elementConfig.options.map(option => (
              <FormControlLabel
                key={option.value}
                {...option}
                control={<Radio color={props.elementConfig.configs.color} />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      );
      break;
    default:
      inputElement = (
        <input
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <Grid item xs={12} md={12} lg={12}>
      {inputElement}
    </Grid>
  );
};

export default InputBuilder;

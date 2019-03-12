import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import InputBuilder from "./Components/InputBuilder";
import ErrorBoundary from "./Components/ErrorBoundary";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import LinearProgress from "@material-ui/core/LinearProgress";
import checkValidity from "./Components/FieldValidator";
import isFormValid from "./Components/FormValidSetter";

import { withStyles } from "@material-ui/core/styles";

const styles = {
  button: {
    fontSize: "10px",
    fontWeight: "500"
  },
  cardActions: {
    marginBottom: "10px",
    marginLeft: "10px"
  }
};

class FormRender extends Component {
  //constructor
  constructor(props) {
    super(props);

    this.state = {
      iForm: this.props.json,
      formIsValid: false,
      loading: false,
      alertopen: false,
      submitJson: ""
    };
  }
  handleAlertClose = () => {
    this.setState({ alertopen: false });
  };

  submitHandler = event => {
    event.preventDefault();

    let didFormValid = isFormValid(this.state.iForm);
    this.setState({
      iForm: didFormValid.validatedForm,
      formIsValid: didFormValid.formValidity
    });

    const formData = {};
    for (let formElementIdentifier in this.state.iForm) {
      formData[formElementIdentifier] = this.state.iForm[
        formElementIdentifier
      ].value;
    }
    if (didFormValid.formValidity) {
      this.setState({ loading: true });
      setTimeout(() => {
        console.log(formData);
        this.setState({
          loading: false,
          submitJson: JSON.stringify(formData),
          alertopen: true
        });
      }, 1000);
    }
  };

  inputChangedHandler = (event, inputIdentifier) => {
    //make a copy of iForm State
    const updatediForm = {
      ...this.state.iForm
    };
    // make a copy of Changed Element
    const updatedFormElement = {
      ...updatediForm[inputIdentifier]
    };
    //update changed value
    updatedFormElement.value = event.target.value;

    //check validity
    let getValidity = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedFormElement.valid = getValidity.isValid;
    updatedFormElement.elementConfig.helperText = getValidity.errorText;
    //updated element's touched property
    updatedFormElement.touched = true;
    updatediForm[inputIdentifier] = updatedFormElement;

    //Checking The whole form Validity
    // let formIsValid = isFormValid(updatediForm);

    this.setState({ iForm: updatediForm });
  };

  render() {
    const { classes } = this.props;
    const formElementsArray = [];

    let Loader = this.state.loading ? (
      <LinearProgress color="secondary" />
    ) : null;

    for (let key in this.state.iForm) {
      formElementsArray.push({
        id: key,
        config: this.state.iForm[key]
      });
    }
    let form = (
      <Grid container spacing={24}>
        {formElementsArray.map(formElement => (
          <InputBuilder
            key={formElement.id}
            touched={formElement.config.touched}
            errorValue={formElement.config.valid}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            inputAdornment={formElement.config.inputAdornment}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
      </Grid>
    );

    return (
      <div>
        <Grid container spacing={24} justify={"center"}>
          <Grid item xs={12} lg={8}>
            <Card className={classes.card}>
              {Loader}
              <CardContent>
                <Typography gutterBottom variant="h6">
                  {this.props.formHeader}
                </Typography>
                <Divider />
                <br />
                <ErrorBoundary>{form}</ErrorBoundary>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={this.submitHandler}
                >
                  Save
                </Button>
                <Button
                  className={classes.button}
                  variant="outlined"
                  color="default"
                >
                  Cancel
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        <Dialog
          open={this.state.alertopen}
          onClose={this.handleAlertClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>{this.state.submitJson}</DialogContent>
          <DialogActions>
            <Button onClick={this.handleAlertClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(FormRender);

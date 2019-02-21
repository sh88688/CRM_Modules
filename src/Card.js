import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const styles = {
  button: {
    fontSize: "11px",
    fontWeight: "500"
  }
};

function ImgMediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="subheading" component="h2">
          Add Ticket Status
        </Typography>
        <Divider />
      </CardContent>
      <CardActions>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          Save
        </Button>
        <Button
          className={classes.button}
          disabled
          variant="contained"
          color="default"
        >
          Cancel
        </Button>
      </CardActions>
    </Card>
  );
}

ImgMediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ImgMediaCard);

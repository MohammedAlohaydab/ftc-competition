import React from "react";
import {Box, Button, Card, CardContent, LinearProgress, Typography} from "@material-ui/core";
import firebase from "firebase";
import PropTypes from "prop-types";

const HomePageView = ({updateCounter, setLoading }) => {


  const handleClick = () => {
    setLoading(true);
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
          updateCounter();
        setLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
      <Box width="90%" m={2}>

          <Card >
              <CardContent>

                  <Typography gutterBottom variant="h3" component="h2">
                     Here you go!
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                      Welcome to this challenge, there are some notes before you go to the answer page
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                      Arrived: The number of participants who have arrived to this site
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                  Remaining Time: before the competition ends
              </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                      Answer: your answer to solve this challenge
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                      Hints: There are three hints, each one will reduce the remaining time of this challenge (the time of each hint will appear when pressed)
              </Typography>
                  <Typography gutterBottom color={"secondary"} variant="h6" component="h6">
                                The Remaining time and Hints are shared with all participants
                  </Typography>
                  <Button
                      onClick={handleClick}
                      variant="contained"
                      size="large"
                      color="primary"
                      style={{ margin: "10px", fontSize: 21 }}
                  >
                     Go to Answer Page
                  </Button>
              </CardContent>

          </Card>
      </Box>

  );
};
HomePageView.propTypes = {
  setLoading: PropTypes.func,
};
export default HomePageView;

import React, { useEffect } from "react";
import {Box, Button, Card, CardContent, LinearProgress, Typography} from "@material-ui/core";
import { useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
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
                     لقد وصلت
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                      اهلا بك في المسابقة, هذه بعض التوضيحات قبل أن تذهب لصفحة الاجابة
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                      عدد الواصلين: عدد الاشخاص الذين سبقوك الى هذا الموقع
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                  الوقت المتبقي: 24 ساعه تبدأ بالتنازل عند دخول اول شخص للموقع
              </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                      الشفرة: الجواب لهذا اللغز
                  </Typography>
                  <Typography gutterBottom variant="h6" component="h6">
                  التلميحات:  عندك ثلاث تلميحات, ولكن كل تلميحه بسعرها, فكر زين قبل لا تظهر اي تلميحة
              </Typography>
                  <Typography gutterBottom color={"secondary"} variant="h6" component="h6">
                                الوقت المتبقي والتلميحات مشتركة بين الجميع
                  </Typography>
                  <Button
                      onClick={handleClick}
                      variant="contained"
                      size="large"
                      color="primary"
                      style={{ margin: "10px", fontSize: 21 }}
                  >
                      الذهاب الى صفحة الاجابة
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

import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, Typography} from "@material-ui/core";
import firebase from "../../../firebase";


const WinnerPageView = () => {
    const [winnersCount, setwWnnersCount] = useState(-1);

    useEffect(() => {

        const unsubscribeWinnersCountListener = firebase
            .firestore()
            .collection("docs")
            .doc("competition")
            .onSnapshot((result) => {
                setwWnnersCount(result.data()["winnersCount"]);
            });

        return () => {
            unsubscribeWinnersCountListener();
        };
    }, []);

    const cardContent = (title, desc) => {
        return (
            <Box width="90%" m={2}>
                <Card >
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            {title}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                            {desc}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        );
    }

    const firstOneText = () => {
        return cardContent("Congratulations!", " You did it!!\n" +
            "                            You are the first winner.");
    }
    const notFirstOneText = () => {
       return cardContent("Congratulations!", "You did it!!\n" +
           "But you aren't the first one.\n "+winnersCount+" before you");
    }
    const pageContent = () => {
        if (winnersCount ===-1)
            return <h1>Loading...</h1>
        else if (winnersCount === 1)
            return firstOneText();
        else
            return notFirstOneText();
    }

   return(
       pageContent()
   );
};

export default WinnerPageView;

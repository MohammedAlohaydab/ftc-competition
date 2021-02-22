import React from "react";
import {Box, Card, CardContent, Typography} from "@material-ui/core";


const EndingCompPageView = () => {
    return (

        <Box width="90%" m={2}>

            <Card >
                <CardContent>

                    <Typography gutterBottom variant="h3" component="h2">
                        The Game is Over!
                    </Typography>

                </CardContent>
            </Card>
        </Box>
    );
};

export default EndingCompPageView;

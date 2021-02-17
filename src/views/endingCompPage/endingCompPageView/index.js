import React from "react";
import {Box, Card, CardContent, Typography} from "@material-ui/core";


const EndingCompPageView = () => {
    return (

        <Box width="90%" m={2}>

            <Card >
                <CardContent>

                    <Typography gutterBottom variant="h3" component="h2">
                       !انتهت المسابقة
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        شكرا لك, نشوفك بالفعاليات الجاية
                    </Typography>

                </CardContent>
            </Card>
        </Box>
    );
};

export default EndingCompPageView;

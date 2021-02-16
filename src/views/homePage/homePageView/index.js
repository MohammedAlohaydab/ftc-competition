import React, {useEffect} from "react";
import { Button } from "@material-ui/core";


const HomePageView = () => {


  return (
    <div>
      <center>
        <h3>لقد وصلت</h3>
      </center>
      <Button
        // onClick={handleClick}
        variant="outlined"
        size="large"
        color="inherit"
        style={{ margin: "100px", fontSize: 21 }}
      >
        الذهاب الى صفحة الاجابة
      </Button>
    </div>
  );
};

export default HomePageView;

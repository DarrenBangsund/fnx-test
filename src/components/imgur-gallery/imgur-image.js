import React from "react";
import { Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const styles = {
    button: {
        background: "gray",
        borderRadius: "5px"
    }
}

const ImgurImage = props => {
    const {image, onClick, classes} = props;
    return (
        <div>
            {/* {image.images[0].id} */}
            <Button className={classes.button} onClick={ev => onClick(ev, image)}>
                <div>
                    <img style={{ width: "100%" }} src={image.images[0].link} />
                    <Typography>
                        {image.title}
                    </Typography>
                </div>
            </Button>
        </div>
    )
}

ImgurImage.defaultProps = {
    image: {},
    onClick: () => {}
}

export default withStyles(styles)(ImgurImage);
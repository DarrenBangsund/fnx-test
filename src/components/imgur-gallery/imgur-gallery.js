import React from "react";
import {connect} from "react-redux";
import { fetchImageGallery } from "../../store/actions/imgur";
import { getImagesFromState } from "../../store/reducers/imgur";
import ImgurImage from "./imgur-image"; 
import InfiniteScroll from 'react-infinite-scroller';
import _ from "lodash";

import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography, withWidth } from "@material-ui/core";
import Error from "./error";

const breakPoints = {
    xs: 12,
    sm: 6,
    md: 3,
    lg: 2,
    xl: 2
}

class ImgurGallery extends React.Component {
    constructor() {
        super();
        this.state = {
            nextPage: 0,
            currentImageInDialog: {},
            canFetch: true,
            error: {}
        }
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleFetchHotImages = this.handleFetchHotImages.bind(this);
        this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    }

    componentDidMount() {
        this.handleFetchHotImages(this.state.nextPage);
    }
    
    handleFetchHotImages(page) {
        if(!this.state.canFetch) return;

        this.setState({
            canFetch: false
        });

        this.props.dispatchFetchHotImages(page)
        .then(() => {
            return this.setState({
                nextPage: this.state.nextPage++
            });
        })
        .catch(err => this.setState({
            error: err
        }))
        .finally(() => {
            setTimeout(
                this.setState({
                    canFetch: true
                }), 5000
            )
        })
    }

    handleCloseSnackbar() {
        this.setState({
            error: {}
        })
    }

    handleDialogClose() {
        this.setState({
            currentImageInDialog: {}
        });
    }
    
    handleDialogOpen(event, element) {
        this.setState({
            currentImageInDialog: element
        });
    }

    render() {
        const colNum = 12/breakPoints[this.props.width];
        const formattedColumns = this.props.images.reduce((prev, current, idx, arr) => {
            const indexOfColumn = idx%colNum;
            if(prev[indexOfColumn] == undefined) prev[indexOfColumn] = [];
            prev[indexOfColumn].push(current);
            return prev;
        }, []);

        return (
            <div>
                <InfiniteScroll
                pageStart={0}
                initialLoad={false}
                loadMore={this.handleFetchHotImages}
                hasMore={this.state.canFetch}
                loader={<div className="loader" key={0}><Typography variant="h1">Loading ...</Typography></div>}>
                    <Grid direction="row" container spacing={4}>
                        {formattedColumns.map((colImages, colIdx) => {
                            return (
                                <Grid key={`${colIdx}`} xs={12} sm={6} md={3} lg={2} item> 
                                    <Grid container direction="column" spacing={4}>
                                        {colImages.map((img, idx) => {
                                            // if(!img.images || img.images[0].type != "image/jpeg") return null;
                                            return (
                                                <Grid key={`${colIdx}-${idx}`} item>
                                                    <ImgurImage onClick={this.handleDialogOpen} key={img.id} image={img} />
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Dialog open={!!this.state.currentImageInDialog.id} onClose={this.handleDialogClose}>
                        <DialogTitle>
                            <Typography variant="h4">{this.state.currentImageInDialog.title}</Typography>
                        </DialogTitle>
                        <DialogContent>
                            {
                                this.state.currentImageInDialog.id && 
                                <img style={{maxWidth: "100%"}} src={this.state.currentImageInDialog.images[0].link} />
                        }
                        </DialogContent>
                    </Dialog>

                    <Error open={this.state.error.message} message={this.state.error.message} onClose={this.handleCloseSnackbar} />
                </InfiniteScroll>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const images = _.filter(getImagesFromState(state), val => val.images && val.images[0].type == "image/jpeg");
    
    return {
        images,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatchFetchHotImages: (page) => dispatch(fetchImageGallery("hot", page))
    }
}

function mergeProps(propsFromState, propsFromDispatch, ownProps) {
    return {
        ...ownProps,
        ...propsFromState,
        ...propsFromDispatch,
    }
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps, mergeProps)(ImgurGallery);

ImgurGallery.defaultProps = {
    images: []
}

export default withWidth()(connectedComponent);
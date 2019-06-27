function fetchImagesAction(images) {
    return {
        type: "FETCH_IMAGES",
        payload: images,
    }
}

export function fetchImageGallery(gallery, page) {
    const url = `https://api.imgur.com/3/gallery/${gallery}/time/${page}?` +
                    `IMGURPLATFORM=web` +
                    `&IMGURUIDJAFO=2af5e523b9237d582c60d5c7d6a210ec09396426c9510376427b976fb455a28b` +
                    `&SESSIONCOUNT=1` +
                    `&client_id=546c25a59c58ad7` +
                    `&realtime_results=false` +
                    `&showViral=true`;
    return dispatch => {
        return fetch(url)
        .then(res => res.json())
        .then(res => {
            if(res.data.error) throw new Error(res.data.error);
            return dispatch(fetchImagesAction(res.data));
        })
    }
}
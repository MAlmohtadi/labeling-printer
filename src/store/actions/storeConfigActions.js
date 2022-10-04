import { UPDATE_STORE_CONFIG } from "./types";


export const updateStoreConfig = (config) => (dispatch) => {
    dispatch({
        type: UPDATE_STORE_CONFIG,
        payload: config
    })
}
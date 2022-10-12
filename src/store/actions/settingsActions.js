import { UPDATE_SETTINGS } from "./types";


export const updateSettings = (config) => (dispatch) => {
    dispatch({
        type: UPDATE_SETTINGS,
        payload: config
    })
}
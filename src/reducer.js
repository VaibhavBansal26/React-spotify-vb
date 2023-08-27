export const initialstate = {
    user:null,
    playlists:[],
    playing:false,
    item:null,
   // discover_weekly:null,
   //token:'BQA_VLFcX9GmL5QC7vXyY2QCv0c4Hfpd-EJFAYnyOLpOtfftMr4G_0jhH2ay6Vsna_hTXJZyDu4wxjsbRR6EHgFpu_HPLPadyQZedvLTsPWg5Qzv-W9J1usk_vRCoaZF5yBi8rc_KOiC4dKA_-x-ExzDr0rdmlzPvt_IiprkJcxw82fg'
};

export const reducer = (state,action) => {
    console.log(action);
    //Action -> type, payload
    switch(action.type) {
        case 'SET_USER':
            return{
                ...state,
                user:action.user
            }
        case "SET_TOKEN":
            return{
                ...state,
                token:action.token
            }
        case "SET_PLAYLIST":
            return{
                ...state,
                playlists:action.playlists
            }
        case "SET_DISCOVER_WEEKLY":
            return{
                ...state,
                discover_weekly:action.discover_weekly
            }
        case "SET_ITEM":
            return{
                ...state,
                item:action.item
            }
        case "SET_PLAYING":
            return{
                ...state,
                playing:action.playing
            }
        default:
            return state;
    }
}

export default reducer;
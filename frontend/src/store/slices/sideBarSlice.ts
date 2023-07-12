import { createSlice } from "@reduxjs/toolkit"


export interface SideBarStateType {
  isShown: boolean,
  isBackgroundDarkened: boolean
}

const initialState: SideBarStateType = {
  isShown: false,
  isBackgroundDarkened: false
}

export const sideBarSlice = createSlice({
  name: "sideBarSlice",
  initialState,
  reducers: {

    /**
     * Toggle sideBar state
     */
    toggleState: (state) => {
      state.isShown = !state.isShown
    },

    /**
     * Show sideBar
     */
    showSideBar: (state) => {
      state.isShown = true
    },

    /**
     * Hide sideBar
     */
    hideSideBar: (state) => {
      state.isShown = false
    },

    /**
     * Toggle background state
     */
    toggleBackgroundState: (state) => {
      state.isBackgroundDarkened = !state.isBackgroundDarkened
    },

    /**
     * Darken background
     */
    darkenBackground: (state) => {
      state.isBackgroundDarkened = true
    },

    /**
     * Lighten background
     */
    lightenBackground: (state) => {
      state.isBackgroundDarkened = false
    }
  }
})

export default sideBarSlice.reducer
export const { toggleState, showSideBar, hideSideBar, toggleBackgroundState, darkenBackground, lightenBackground } = sideBarSlice.actions
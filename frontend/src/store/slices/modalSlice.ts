import { createSlice } from "@reduxjs/toolkit"


export interface ModalStateType {
  isShown: boolean
}

const initialState: ModalStateType = {
  isShown: false
}

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {

    /**
     * Toggle modal state
     */
    toggleState: (state) => {
      state.isShown = !state.isShown
    },

    /**
     * Show modal
     */
    showModal: (state) => {
      state.isShown = true
    },

    /**
     * Hide modal
     */
    hideModal: (state) => {
      state.isShown = false
    }
  }
})

export default modalSlice.reducer
export const { toggleState, showModal, hideModal } = modalSlice.actions
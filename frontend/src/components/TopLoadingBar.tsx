import { LinearProgress } from "@mui/material"


type loadingBarProps = {
  isLoading: boolean
}

export default function TopLoadingBar({ isLoading }: loadingBarProps) {
  if(isLoading)
    return (
      <div className="absolute top-0 left-0 w-full">
        <LinearProgress color="error"/>
      </div>
    )
}
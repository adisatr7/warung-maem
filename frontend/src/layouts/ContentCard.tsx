import { ReactNode } from "react"
import { contentCardStyle, headerRedLine, headerTextStyle } from "../styles"


type PropsType = {
  children: ReactNode,
  pageTitle: string
}

export default function ContentCard({ children, pageTitle }: PropsType) {
  return (
    <div className={contentCardStyle}>
          
      {/* Header label */}
      <h1 className={headerTextStyle}>{pageTitle}</h1>

      {/* Garis */}
      <div className={headerRedLine}/>

      {/* Contents */}
      {children}

    </div>
  )
}
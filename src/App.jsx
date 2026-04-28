import { useState } from "react"
import Header, { Banner } from "./Components.jsx"
import { Headbar } from "./Components.jsx"
import { ScrollableCard } from "./Components.jsx"
import { Cards } from "./Components.jsx"

const App=()=>{

  const [category, setCategory]=useState("all")
  const [sorted, setSorted]=useState("default")
  const [searchValue, setSearchValue]=useState("")


  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      maxWidth: "1243px",
      minHeight: "100vh",
      margin: "0 auto",
      padding: "0",
    }}>
    <Header category={category} setCategory={setCategory} sorted={sorted} setSorted={setSorted} setSearchValue={setSearchValue} searchValue={searchValue}></Header>
    <Headbar></Headbar>
    <Banner></Banner>
    <ScrollableCard></ScrollableCard>
    <Cards category={category} sorted={sorted} searchValue={searchValue}></Cards>
    </div>
  )
}
export default App
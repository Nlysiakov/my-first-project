import { useState } from "react"
import Header, { Banner } from "./Components.jsx"
import { ScrollableCard } from "./Components.jsx"
import { Cards } from "./Components.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App=()=>{

  const [category, setCategory]=useState("all")
  const [sorted, setSorted]=useState("default")
  const [searchValue, setSearchValue]=useState("")


  return (
    <div className="main">
    <Header category={category} setCategory={setCategory} sorted={sorted} setSorted={setSorted} setSearchValue={setSearchValue} searchValue={searchValue}></Header>
    <Banner></Banner>
    <ScrollableCard></ScrollableCard>
    <Cards category={category} sorted={sorted} searchValue={searchValue}></Cards>
    </div>
  )
}
export default App
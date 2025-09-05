import { useState, useEffect } from 'react'
import './App.css'
import {nanoid} from "nanoid"

function App() {
  const [string, setString] = useState("")
  const [bookmarks, setBookmarks] = useState([])
  const [filterString, setfilterString] = useState("")
  const [filteredBookmarks, setFilteredBookmarks] = useState([])

  useEffect(() => {
    setFilteredBookmarks(bookmarks.filter((el) => el.name.includes(filterString))
    )
  }, [filterString, bookmarks])

  const categories = {
    movies: "Фильмы",
    music: "Музыка",
    site: "Сайты"
  }

  const [category, setCategory] = useState(Object.entries(categories)[0][0])

  const handleCatChange = (e) => {
    setCategory(e.target.value)
  }
  
  const handleChange = (e) => {
    setString(e.target.value)
  }

  const handleAdd = () => {
    const bookmark = {
      name: string,
      id: nanoid(),
      date: new Date(),
      ready: false,
      category: category
    }

    setBookmarks((val) => [bookmark, ...val])
    console.log(bookmarks);
  }

  const handleToggle = (id) => {
    setBookmarks((old)=> old.map((el)=>(el.id == id ? {...el,ready: !el.ready} : el )))
  }

  const handleDelete = (id) => {
    setBookmarks((old) => old.filter((el) => el.id != id))
  }

  return (
    <div className="bookmark">
      <div className="input">
       <input onChange={handleChange} value={string} type="text" />
       <select onChange={handleCatChange} name="" id="">
        {Object.entries(categories).map((el)=>(
          <option value={el[0]} key={el[0]} >{el[1]}</option>
        ))}
       </select>
       <button onClick={handleAdd}>Add bookmark</button>
      </div>
      <div className='bookmark__filter'>
        <span>Поиск:</span>
        <input type="text"
        value={filterString}
        onChange={(el)=> setfilterString(el.target.value)} />
      </div>
      <div className="bookmark-list">
        {filteredBookmarks.map((el) => (
          <div className='bookmark' key={el.id}>
            <input className="bookmark__ready" type="checkbox" checked = {el.ready} onChange={() => handleToggle(el.id)} />
            <span className='bookmark__name'>{el.name}</span>
            <span className='bookmark__cat'>{categories[el.category]}</span>
            <span className='bookmark__date'>{el.date.toISOString()}</span>
            <button className='bookmark__delete' onClick={ () => handleDelete(el.id)}>x</button>
          </div>
        ))}
        </div>
    </div>
      
  )
}

export default App

import { useState } from 'react'
import './App.css'
import {nanoid} from "nanoid"

function App() {
  const [string, setString] = useState("")
  const [bookmarks, setBookmarks] = useState([])

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

  return (
    <div className="bookmark">
      <div className="input">
       <input onChange={handleChange} value={string} type="text" />
       <select onChange={handleCatChange} name="" id="">
        {Object.entries(categories).map((el)=>(
          <option value={el[0]}>{el[1]}</option>
        ))}
       </select>
       <button onClick={handleAdd}>Add bookmark</button>
      </div>
      <div className="bookmark-list">
        {bookmarks.map((el) => (
          <div className='bookmark'>
            <input className="bookmark__ready" type="checkbox" checked = {el.ready} />
            <span className='bookmark__name'>{el.name}</span>
            <span className='bookmark__cat'>{categories[el.category]}</span>
            <span className='bookmark__date'>{el.date.toISOString()}</span>
          </div>
        ))}
        </div>
    </div>
      
  )
}

export default App

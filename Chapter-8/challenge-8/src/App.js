import logo from './logo.svg';

import { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

let DataAwal = [
  {
    id: 1,
    username: 'raissa',
    email: 'raissa@email.com',
    exp: '90',
    lvl: '10'
  },
  {
    id: 2,
    username: 'raissa2',
    email: 'raissa2abc@email.com',
    exp: '80',
    lvl: '9'
  },
  {
    id: 3,
    username: 'raissa3',
    email: 'raissa3def@email.com',
    exp: '110',
    lvl: '11'
  }
]

function App() {
  

  const [formPlayer, setFormPlayer] = useState(
    {
      id: '',
      username: '',
      email: '',
      exp: '',
      lvl: ''
    }
  )

  const [formEditPlayer, setFormEditPlayer] = useState(
    {
      id: '',
      username: '',
      email: '',
      exp: '',
      lvl: ''
    }
  )
  const [player, setPlayer] = useState([
  {
      id: 1,
      username: 'raissa',
      email: 'raissa@email.com',
      exp: '90',
      lvl: '10'
    },
    {
      id: 2,
      username: 'raissa2',
      email: 'raissa2abc@email.com',
      exp: '80',
      lvl: '9'
    },
    {
      id: 3,
      username: 'raissa3',
      email: 'raissa3def@email.com',
      exp: '110',
      lvl: '11'
    },
  ]);

  const [search, setSearch] = useState('')

  const addData = () => {
    // let databaru = {
      // username: 'raissa3',
      // email: 'raissa3@email.com',
      // exp: '110',
      // lvl: 11
    // }

    setPlayer([ ...player, formPlayer])
    setFormPlayer ({
      
      username: '',
      email: '',
      exp: '',
      lvl: ''
    })
  }

  const changeHandler = (e) => {
    //console.log(e.target.value)
    //console.log(e.target.name)
    setFormPlayer({
      ...formPlayer,
      [e.target.name] : e.target.value
    })
  }

  const changeEdit = (e) => {
    //console.log(e.target.value)
    //console.log(e.target.name)
    setFormEditPlayer({
      ...formEditPlayer,
      [e.target.name] : e.target.value
    })
  }

  const searchHandler = (e) => {
    setSearch(e.target.value)
  }
  
  const searchClick = () => {
    let playerTemp = DataAwal
    let playerFinal = playerTemp.filter((el) => {
      if(el.username.search(search) >= 0 || el.email.search(search) >= 0 || el.exp.search(search) >= 0 || el.lvl.search(search)){
        return el
      }
    })
    if(search === ""){
      setPlayer(DataAwal);
    }else{
      setPlayer(playerFinal)
    }
    
  }

  const editData = (playerid) => {
    player.filter((el) => {
      if (el.id === playerid) {
        setFormEditPlayer(el)
      }
    })
  }
  
  const edit = () => {
    let temp = player
    let players = player.findIndex((el) => el.id == formEditPlayer.id)
    temp[players].username = formEditPlayer.username
    temp[players].email = formEditPlayer.email
    temp[players].exp = formEditPlayer.exp
    temp[players].lvl = formEditPlayer.lvl
    setPlayer(temp)
		setFormEditPlayer({
			id: '',
			username: '',
			email: '',
			exp: '',
			lvl: ''
		});
  }
  


  return (
    
  <div className="App mt-5">
        
    <div class=" w-75 mx-auto justify-content-md-center my-5">
            <input
            type="text"
            value= {search}
            name = "username"
            onChange={searchHandler}
            placeholder="Search"
            class = "mx-3"
            >  
            </input>
          <button type="button" onClick={searchClick} class="btn btn-primary btn-sm mx-3">Search</button>

    </div>


    <div className="w-75 mx-auto">    
      <table class="table">
        <thead>
          <tr>
          <th scope="col">NO</th>
            <th scope="col">USERNAME</th>
            <th scope="col">EMAIL</th>
            <th scope="col">EXPERIENCE</th>
            <th scope="col">LEVEL</th>
            <th scope="col">EDIT</th>
          </tr>
        </thead>
        <tbody>
          {player.map((player, index) =>{
            let player_id = player.id
            return(
              <tr>
                <th scope="row"> {index + 1 } </th>
                <td>{player.username}</td>
                <td>{player.email}</td>
                <td>{player.exp}</td>
                <td>{player.lvl}</td>
                <td>
                  <button onClick={() => editData(player_id)}>Edit </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    
  <div class="container my-5">
    <div class="row justify-content-md-center">
      <div class="col">
        <form>
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Username</label>
            <div class="col-sm-10">
            <input
                type="text"
                value={formPlayer.username}
                name = "username"
                onChange={changeHandler}
            >
            </input>
            </div>
          </div>
          
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
            <input
                type="email"
                value={formPlayer.email}
                name = "email"
                onChange={changeHandler}
            >  
            </input>
            </div>
          </div>
          
          
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Experience</label>
            <div class="col-sm-10">
              <input
                  type="text"
                  value={formPlayer.exp}
                  name = "exp"
                  onChange={changeHandler}
              > 
              </input>
            </div>
          </div>

          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Level</label>
            <div class="col-sm-10">
              <input
                    type= "text"
                    defaultValue ={formPlayer.lvl}
                    name = "lvl"
                    onChange={changeHandler}
                >
                </input>
            </div>
          </div>
          <button type="button" onClick={addData} class="btn btn-primary btn-sm">Insert</button>
          </form>

      </div>

      <div class="col">
        <form>
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Username</label>
            <div class="col-sm-10">
            <input
                type="text"
                value={formEditPlayer.username}
                name = "username"
                onChange={changeEdit}
            >
            </input>
            </div>
          </div>
          
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
            <input
                type="email"
                value={formEditPlayer.email}
                name = "email"
                onChange={changeEdit}
            >  
            </input>
            </div>
          </div>
          
          
          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Experience</label>
            <div class="col-sm-10">
              <input
                  type="text"
                  value ={formEditPlayer.exp}
                  name = "exp"
                  onChange={changeEdit}
              > 
              </input>
            </div>
          </div>

          <div class="form-group row">
            <label  class="col-sm-2 col-form-label">Level</label>
            <div class="col-sm-10">
              <input
                    type="text"
                    defaultValue={formEditPlayer.lvl}
                    name = "lvl"
                    onChange={changeEdit}
                >
                </input>
            </div>
          </div>
          <button type="button" onClick={edit} class="btn btn-primary btn-sm">Edit</button>
          </form>

      </div>

    </div>
      
    </div>
    </div>
  );
}

export default App;

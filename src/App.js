import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useState } from 'react';

function App() {

  const dispatch = useDispatch()
  const { userList } = useSelector((state) => state.userReducer);
  // console.log("UserData = " , userList);
  const [thisId , setThisId] = useState(0);


  const [thisUser , setThisUser] = useState(
    {
      id : 0,
      name : "",
      age : "",
      address : ""
    }
  ) 

  const inputHandler = async (e) =>{
    const { name , value } = e.target;
    setThisUser({
      ...thisUser,
      [name] : value
    })
  }

  const resetForm = () =>{
    setThisId(0);
    setThisUser({
      id : 0,
      name : "",
      age : "",
      address : ""
    })
  }

  const addNew = () =>{
    resetForm()
  }

  const handleEdit = (obj) =>{
    console.log(obj);
    setThisUser(obj);
    setThisId(obj?.id);
  }


  const handleSubmit = () =>{
    console.log(thisId);
    if(thisId === 0){
      const id = userList?.length ? userList[userList?.length - 1].id + 1 : 1;
      thisUser['id'] = id
      dispatch({
        type : 'ADD_USER',
        payload : thisUser
      })
    }
    else{
      dispatch({
        type:'EDIT_USER',
        payload : {index : thisId , data : thisUser}
      })
    }

    resetForm();
  }

  const handleDelete = (id) =>{
    console.log(id)
    dispatch({
      type:'DELETE_USER',
      payload : {index : id}
    })
  }


  const handleFile = (e) =>{
    console.log("File = " , e.target.files[0].name);

    const [file] = e.target.files;
    if (file) {
        console.log("File = " , URL.createObjectURL(file))
        document.getElementById('profile_image').src = URL.createObjectURL(file)
    }
  }

 

  return (
    <div className="App">
      <button onClick={() => addNew()}>New</button><br />
      <input 
        type = "text"
        name = "name"
        value={thisUser?.name}
        onChange={(e) => inputHandler(e)}
      /><br />
      <input 
        type = "text"
        name = "age"
        value={thisUser?.age}
        onChange={(e) => inputHandler(e)}
      /><br />
      <input 
        type = "text"
        name = "address"
        value={thisUser?.address}
        onChange={(e) => inputHandler(e)}
      /><br />

      <img src="" className="d-block rounded" id="profile_image" width="100" height="100" style={{margin:'inherit'}} />

      <input 
        type='file'
        onChange={(e) => handleFile(e)}
      />

      <button onClick={() => handleSubmit()}>{thisId === 0 ? 'Add' : 'Save Changes'}</button><br />

      <div>
        <h1>User List</h1>
        { !!userList && userList?.length ? (
          userList?.map((data , i) =>(
            <div key={i}>
              <p>{data.name}</p>
              <p>{data.age}</p>
              <p>{data.address}</p>
              <button onClick={() =>handleEdit(data)}>Edit</button>
              <button onClick={() =>handleDelete(data.id)}>Delete</button>
            </div>
          ))
        ) :  (
          <p>No User Data</p>
        )}
      </div>
    </div>
  );
}

export default App;

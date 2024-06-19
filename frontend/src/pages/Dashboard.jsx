import { useEffect, useState } from "react"
import AppBar from "../components/AppBar"
import BalanceComponent from "../components/BalanceComponent"
import InputBox from "../components/InputBox"
import axios from "axios"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"


const Dashboard = () => {
  const [search, setSearch] = useState("")
  const [users,setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async()=>{
      const response =await axios.get(`http://localhost:3000/api/v1/users/search/?filter=${search}`)
      setUsers(response.data.user)
    }
    fetchData();
  },[search])

  console.log(users)

  return (
    <div className="p-10">
      <AppBar user = "User"/>
      <BalanceComponent balance = {1000}/>
      <InputBox
          label="Users"
          placeholder="Search Users....."
          onChange={(e) => setSearch(e.target.value)}
        />
      <div>
      {
        users.length > 0 ? (
          users.map((item, index) => (
            <div key={index} className="flex justify-between py-2">
              <div>{item.firstName} {item.lastName}</div>
              <Button onClick={() => {
                navigate("/send?id=" + item._id + "&name=" + item.firstName);
            }} label={"Send Money"} />
            </div>
          ))
        ) : (
          <div>Search for user</div>
        )
      }
      </div>
    </div>
  )
}

export default Dashboard

import React, {useEffect, useState} from 'react'
import { useCookies } from 'react-cookie'
import TinderCard from 'react-tinder-card'
import axios from '../axios'
import "./TinderCards.css"
function TinderCards() {
  const[user,setUser] = useState(null)
  const[genderedUsers,setGenderedUsers] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  //Fetching user from database
  const userId = cookies.UserId
  const getUser = async () => {
    try{
      const response = await axios.get('http://localhost:8001/user',{
      params: {userId}
    })
    setUser(response.data)
      }catch (error) {
        console.error(error)
      }
  }

  const getGenderedUsers = async () => {
    try{
      const response = axios.get('http://localhost:8001/gendered-users',{
        params: {gender: user?.gender_interest}})
        setGenderedUsers(response.data)
    }catch(e){console.log(e)}
  }
  //Executing retrievals of user groups
  useEffect(() => {
    getUser()
    getGenderedUsers()
  }, [user,genderedUsers])
  console.log('user', user)
  console.log('gendered user', genderedUsers)
    const [people, setPeople] = useState([]);
    const [lastDirection, setLastDirection] = useState();
  
    useEffect(() => {
      async function fetchData() {
        const req = await axios.get('/tinder/users')
        console.log("Fetching Tinder Cards from Cluster...")
        console.log("Data Retrieved: "+req.data)
        setPeople(req.data)
      }
      fetchData()
    },[])

    const swiped = (direction, nameToDelete) => {
      console.log("removing: "+ nameToDelete);
      setLastDirection(direction);
    };

    //console.log(people)
    const outOfFrame = (name) => {console.log(name + " left the screen");};
    return (
      <>
      {user &&
    <div className='tinderCards'>
      <div className='tinderCards_cardContainer'>
      {people.map((person) =>(
        <TinderCard 
          className='swipe'
          keys= {person.first_name}
          preventSwipe={["up","down" ]}
          onSwipe={(dir) => swiped(dir, person.first_name)}
          onCardLeftScreen={() => outOfFrame(person.first_name)}
          ><div
          style={{backgroundImage: 'url('+person.url+')'}}
          className="card">
         <h3>{person.first_name}</h3>
          </div>
        </TinderCard>))}
          </div>
        </div>
    }</>
  )


}
export default TinderCards;
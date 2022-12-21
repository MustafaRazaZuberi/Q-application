import React, { useEffect, useState } from 'react'
import "./MyCompanies.css"
import logo from "./../../../src/qapplogo.png"
import {
    auth, swal,
    addDoc, db, collection, ref, uploadBytes, getDownloadURL, storage, onSnapshot, where, query, getDoc,
    getDocs,
    setDoc,
    doc
} from "./../../config/Firebase"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MyCompanies = () => {
    const navigate = useNavigate()

    const logout = async () => {
        auth.signOut();
        await swal("Congratulations!", "Logged out!", "success");
        navigate("/")
    }








    const authData = useSelector(state => state.auth)
    console.log(authData)
    async function getCompaniesFromDB() {
        const querySnapshot = await getDocs(collection(db, "companies"))
        const companies = []
        querySnapshot.forEach((doc) => {
            companies.push({ id: doc.id, ...doc.data() })
        })
        return companies
    }
    let [allCompanies, setAllCompanies] = useState([])
    let [drName, setDrName] = useState("")
    let [since, setSince] = useState("")
    let [startTime, setStartTime] = useState("")
    let [endTime, setEndTime] = useState("")
    let [companyAddress, setCompanyAddress] = useState("")
    let [imageUrl, setImageUrl] = useState("")


    let [myCompanies, setMyCompanies] = useState([])

    let [doctorForToken,setDoctorForToken] = useState(0)

    useEffect(() => {
        const loadCompanies = async () => {
            const companies = await getCompaniesFromDB()
            console.log(companies)
            setAllCompanies(companies)
            companies.forEach((item) => {
                if (item.userId == authData.uid) {
                   

                    myCompanies.push(item)
                }

            })
        }
        loadCompanies()
    }, [])

    const generateToken = async  () =>{
        const noOfTokens = document.getElementById("noOfTokens").value
        const timePerToken = document.getElementById("timePerToken").value + "minutes"
        if (noOfTokens.length == 0 || timePerToken.length == 0) {
            swal("Please fill all inputs!");
            return
          }
          console.log(noOfTokens,timePerToken)
          console.log(doctorForToken)
          const token = {
            noOfTokens,timePerToken
          }

          const docRef = doc(db, "companies", doctorForToken,"tokens");
          await setDoc(docRef,token)

        
    }


    console.log("Myadsdas" + myCompanies)
    const myCompaniesDisplay = myCompanies.map((item, index) => {
        return <div className="row singleItem" key={index}>
            <div className="col-lg-3 col-md-4">
                <div className="img-container">
                    <img src={item.image} alt="team member" className="img-full" />
                </div>
            </div>
            <div className="col-lg-9 col-md-8">
                <div className="member_designation">
                    <h2>Dr. {item.companyName}</h2>
                    <span>since {item.since}</span>
                </div>
                <h5>Start Time : {item.startTime}</h5>
                <h5>Closing Time : {item.endTime}</h5>
            </div>
            <div className='tokenProcedure'>
                <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tokenForm" onClick={()=>{setDoctorForToken(item.id)}}>Generate Tokens</button>
                <button className="btn btn-danger ">Disable Tokens</button>
                <button className="btn btn-success">Reset</button>
            </div>
            <h6>Total Token : 0</h6>
            <h6>Time per Token : 0 minutes</h6>
            <h6>Sold Token : 0</h6>
        </div>
    })

    return (
        <div>


            <div className="myCompanyItem">
                <div className="container " style={{ marginTop: "-110px" }}>
                    <section className="member-details">
                        <div className="HomeHeader" style={{ marginTop: "30px" }}>
                            <div className="logo"><img src={logo} style={{ width: "60px", height: "60px" }} alt="" /></div>
                            <div className="userInfo">   <h2>Hey, {authData.name} <p>How are you feeling today?</p></h2></div>

                            <div className="dropdown">
                                <i className="fa-solid fa-user profileIcon" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" ></i>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
                                    <li><a className="dropdown-item" >My Companies</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="container">
                            {myCompaniesDisplay}

                        </div>

                    </section>
                </div>
            </div>




{/* token modal */}
<div className="modal fade" id="tokenForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Token Form</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <span>No of Tokens</span>
      <input type="number" className="form-control" id='noOfTokens' placeholder="No of Tokens"  />
      <br />
        <span>Time per Token</span>
      <input type="number" className="form-control" id='timePerToken' placeholder="Time per Token"  />

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={generateToken}>Generate</button>
      </div>
    </div>
  </div>
</div>


        </div>
    )
}

export default MyCompanies

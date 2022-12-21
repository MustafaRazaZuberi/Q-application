import React, { useEffect, useState } from 'react'
import logo from "./../../../src/qapplogo.png"

import {
  auth, swal,
  addDoc, db, collection, ref, uploadBytes, getDownloadURL, storage, onSnapshot, where, query, getDoc,
  getDocs
} from "./../../config/Firebase"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './detail.css'
const Detail = () => {
  const navigate = useNavigate()
  
  const authData = useSelector(state => state.auth)
  console.log(authData)
  






  const detailId = localStorage.getItem('detailId')
  console.log("detaill >>" + detailId)
  async function getCompaniesFromDB() {
    const querySnapshot = await getDocs(collection(db, "companies"))
    const companies = []
    querySnapshot.forEach((doc) => {
      companies.push({ id: doc.id, ...doc.data() })
    })
    return companies
  }
  let [allCompanies, setAllCompanies] = useState([])
  let [drName,setDrName] = useState("")
  let [since,setSince] = useState("")
  let [startTime,setStartTime] = useState("")
  let [endTime,setEndTime] = useState("")
  let [companyAddress,setCompanyAddress] = useState("")
  let [imageUrl,setImageUrl] = useState("")



  useEffect(() => {
    const loadCompanies = async () => {
      const companies = await getCompaniesFromDB()
      console.log(companies)
      setAllCompanies(companies)
      companies.forEach((item) =>{
        if(item.id == detailId){
          setDrName(item.companyName)
          setSince(item.since)
          setStartTime(item.startTime)
          setEndTime(item.endTime)
          setCompanyAddress(item.companyAddress)
          setImageUrl(item.image)
        }
      })

    }
    loadCompanies()
  }, [])




  const logout = async () => {
    auth.signOut();
    await swal("Congratulations!", "Logged out!", "success");
    navigate("/")
  }


  return (
    <>
      <div>



        <div className="container " style={{marginTop: "-110px"}}>
          <section className="member-details">
          <div className="HomeHeader" style={{ marginTop: "30px" }}>
          <div className="logo"><img src={logo} style={{ width: "60px", height: "60px" }} alt="" /></div>
          <div className="userInfo">   <h2>Hey, {authData.name} <p>How are you feeling today?</p></h2></div>

          <div className="dropdown">
            <i className="fa-solid fa-user profileIcon" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" ></i>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" onClick={logout}>Logout</a></li>
              <li><a className="dropdown-item" onClick={()=>navigate("/myCompanies")} >My Companies</a></li>
            </ul>
          </div>
        </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-4">
                  <div className="img-container">
                    <img src={imageUrl} alt="team member" className="img-full" />
                  </div>
                </div>
                <div className="col-lg-9 col-md-8">
                  <div className="member_designation">
                    <h2>Dr. {drName}</h2>
                    <span>since {since}</span>
                  </div>
                  <div className="member_desc">
                    <p>
                      Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt.ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                    </p>
                    
                  </div>
                  <div className="bg-image " style={{marginTop:"50px",position:"relative"}}>
                    <div className="member_contact">
                      <div className="row">
                        <div className="col-lg-4  mb-3 mb-lg-0">
                          <div className="media-box">
                            <div className="media-icon">
                              <i className="fa fa-tablet" aria-hidden="true"></i>
                            </div>
                            <div className="media-content">
                              <h5>Phone</h5>
                              <p><a href="callto">(+1) 251-235-3256</a></p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4  mb-3 mb-lg-0">
                          <div className="media-box">
                            <div className="media-icon">
                              <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            </div>
                            <div className="media-content">
                              <h5>Email</h5>
                              <p><a>info@example.com</a></p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="social-icons scIconBtn">
                            <button className="btn btn-social"><i className="fa fa-facebook-f"></i></button>
                            <button className="btn btn-social outlined"><i className="fa fa-twitter"></i></button>
                            <button className="btn btn-social outlined"><i className="fa fa-linkedin"></i></button>
                          </div>
                        </div>
                      </div>
                      <div className="address"> <p><span className="addHeading">Address : </span>{companyAddress}</p></div>
                    </div>
                  </div>
                  <div className="member_desc">
                    <h4 className='timingHeading'>Timings</h4>
                    <h5>Start Time : {startTime}</h5>
                    <h5>Closing Time : {endTime}</h5>
                    

                    <h4>Qualities</h4>
                    <div className="progress-holder">
                      <div className="barWrapper">
                        <span className="progressText"><b>Conscientious</b></span>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '85%' }}></div>
                          <span className="popOver" data-toggle="tooltip" data-placement="top" title="" data-original-title="80%" aria-describedby="tooltip443011"> </span>
                        </div>
                      </div>
                      <div className="barWrapper">
                        <span className="progressText"><b>Curious</b></span>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="95" aria-valuemin="0" aria-valuemax="100" style={{ width: '95%' }}></div>
                          <span className="popOver" data-toggle="tooltip" data-placement="top" title="" data-original-title="95%" aria-describedby="tooltip656043"> </span>
                        </div>
                      </div>
                      <div className="barWrapper">
                        <span className="progressText"><b>Communication</b></span>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style={{ width: '85%' }}></div>
                          <span className="popOver" data-toggle="tooltip" data-placement="top" title="" data-original-title="85%" aria-describedby="tooltip880607"> </span>
                        </div>
                      </div>
                      <div className="barWrapper">
                        <span className="progressText"><b>Empathetic</b></span>
                        <div className="progress">
                          <div className="progress-bar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '75%' }}></div>
                          <span className="popOver" data-toggle="tooltip" data-placement="top" title="" data-original-title="75%" aria-describedby="tooltip616792"> </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>

              </div>
            </div>
          </section>
        </div>



        {/* detailPageCode */}



      </div>
    </>
  )
}

export default Detail

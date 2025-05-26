import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'

const UpdateEmp = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        number: "",
        designation: "",
        gender: "",
        course: [],
        imgUpload: ""
    })
    const handler = (e) => {
        const { name, value } = e.target;
        // console.log(value,name);
        setEmployee({ ...employee, [name]: value })
    }
    console.log("HELLO EMPLOYEE", employee);

    useEffect(() => {
        axios.get("http://localhost:8080/emp/findbyidemp/" + params._id)
            .then((res) => {
                // console.log("SET KAR RHA HU",res.data.data);
                
                setEmployee(res.data.data); // Set the state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);


    const filehandler = (e) => {
        console.log("file log", e.target.files);
        const formdata = new FormData();
        formdata.append("file", e.target.files[0])
        axios.post("http://localhost:8080/file/save", formdata)
            .then((res) => {
                console.log(res.data);
                setEmployee({ ...employee, imgUpload: res.data })

            }).catch(() => {

            })
    }


    const updateEmployee = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8080/emp/updateemp/" + params._id, employee)
            .then((res) => {
                if (res) {
                    toast.success("Employee Update Successfully...!")
                   navigate("/employeelist")
                } else {
                    toast.error("Employee not added...?")
                }
            }).catch((error) => {
                console.log(error);

            })
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Update Employee </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <form action="" onSubmit={updateEmployee}>
                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Name </label>
                                <input type="text" name='name' onChange={handler} value={employee.name} class="form-control shadow" />
                            </div>
                            <div class="mb-3">
                                <label for="formGroupExampleInput2" class="form-label">Email </label>
                                <input type="text" name='email' onChange={handler} value={employee.email} class="form-control shadow" />
                            </div>
                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Mobile Number  </label>
                                <input type="text" name='number' onChange={handler} value={employee.number} class="form-control shadow" />
                            </div>
                            <div className='mb-3'>
                                <label for="formGroupExampleInput" class="form-label">Designation   </label>
                                <select name="designation" className='form-control shadow' value={employee.designation} onChange={handler} id="">
                                    <option value="">---select---</option>
                                    <option value="hr">HR</option>
                                    <option value="manager">Manager </option>
                                    <option value="sales">Sales </option>

                                </select>

                            </div>


                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Gender</label>
                                <br />
                                <input type="radio" id="male" name="gender" value="Male" checked={employee.gender == "Male" ? true : false} onChange={handler} class="form-check-input shadow" />
                                <label for="male" class="form-check-label">Male</label> &nbsp; &nbsp;


                                <input type="radio" id="female" name="gender" value="Female" checked={employee.gender == "Female" ? true : false} onChange={handler} class="form-check-input shadow" />
                                <label for="female" class="form-check-label">Female</label>

                            </div>

                            <div class="mb-3">
                                <label for="formGroupExampleInput2" class="form-label">Course</label>
                                <div>
                                    <input type="checkbox" id="mca" name="course" value="MCA" checked={employee?.course?.find((v) => v == 'MCA') ? true : false} onChange={(e) => {
                                        
                                        
                                        if (e.target.checked) {
                                            setEmployee({ ...employee, course: [...employee.course, e.target.value] });
                                        } else {
                                            setEmployee({
                                                ...employee,
                                                course: employee.course.filter((course) => course !== e.target.value),
                                            });
                                        }
                                    }} class="form-check-input shadow" />
                                    <label for="mca" class="form-check-label">MCA</label> &nbsp; &nbsp;

                                    <input type="checkbox" id="bca" name="course" value="BCA" checked={employee.course.find((v) => v == 'BCA') ? true : false} onChange={(e) => {
                                        if (e.target.checked) {
                                            setEmployee({ ...employee, course: [...employee.course, e.target.value] });
                                        } else {
                                            setEmployee({
                                                ...employee,
                                                course: employee.course.filter((course) => course !== e.target.value),
                                            });
                                        }
                                    }} class="form-check-input shadow" />
                                    <label for="bca" class="form-check-label">BCA</label>&nbsp; &nbsp;

                                    <input type="checkbox" id="bsc" name="course" value="BSc" checked={employee.course.find((v) => v == 'BSc') ? true : false} onChange={(e) => {
                                        if (e.target.checked) {
                                            setEmployee({ ...employee, course: [...employee.course, e.target.value] });
                                        } else {
                                            setEmployee({
                                                ...employee,
                                                course: employee.course.filter((course) => course !== e.target.value),
                                            });
                                        }
                                    }} class="form-check-input shadow" />
                                    <label for="bsc" class="form-check-label">BSc</label>&nbsp; &nbsp;
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Img Upload  </label>
                                <input type="file" name='img-upload' onChange={filehandler}  class="form-control shadow" />
                            <img src={employee.imgUpload} style={{height:"30px" , width:"30px"}} alt="" />
                            </div>
                            <div class="mb-3">
                                <div>
                                    <input type="submit" value="Update" className='btn btn-success shadow' />
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <div className="col-2"></div> */}
                </div>
            </div>

        </>
    )
}

export default UpdateEmp
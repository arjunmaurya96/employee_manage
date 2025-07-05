import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        number: "",
        designation: "",
        gender: "",
        course: [],
        imgUpload: "",
        nameError: "",
        emailError: "",
        numberError: "",
        designationError: "",
        genderError: "",
        courseError: "",
        imgUploadError: ""
    })


    const validateName = () => {
        if (!/\S/.test(employee.name)) {
            setEmployee(state => ({ ...state, nameError: "This field is required" }));
            return false;
        } else {
            setEmployee(state => ({ ...state, nameError: '' }));
            return true;
        }
    };
    const validateEmail = () => {
        if (!/\S/.test(employee.email)) {
            setEmployee(state => ({ ...state, emailError: "This field is required" }));
            return false;
        } else {
            setEmployee(state => ({ ...state, emailError: '' }));
            return true;
        }
    };
    const validateNumber = () => {
        if (!/\S/.test(employee.number)) {
            setEmployee(state => ({ ...state, numberError: "This field is required" }));
            return false;
        } else {
            setEmployee(state => ({ ...state, nameError: '' }));
            return true;
        }
    };
    const validatedesignation = () => {
        if (!/\S/.test(employee.designation)) {
            setEmployee(state => ({ ...state, designationError: "This field is required" }));
            return false;
        } else {
            setEmployee(state => ({ ...state, designationError: '' }));
            return true;
        }
    };
    const validategender = () => {
        if (!/\S/.test(employee.gender)) {
            setEmployee(state => ({ ...state, genderError: "This field is required" }));
            return false;
        } else {
            setEmployee(state => ({ ...state, genderError: '' }));
            return true;
        }
    };
    const validatecourse = () => {
        if (!/\S/.test(employee.course)) {
            setEmployee(state => ({ ...state, courseError: "This field is required" }));
            return false;
        } else {
            setEmployee(state => ({ ...state, courseError: '' }));
            return true;
        }
    };
    const validateimgUpload = () => {
        if (!/\S/.test(employee.imgUpload)) {
            setEmployee(state => ({ ...state, imgUploadError: "This field is required" }));
            return false;
        } else {
            setEmployee(state => ({ ...state, imgUploadError: '' }));
            return true;
        }
    };


    const handler = (e) => {
        const { name, value } = e.target;
        // console.log(value,name);

        setEmployee({ ...employee, [name]: value })
    }

    const filehandler = (e) => {
        console.log("file log", e.target.files);
        const formdata = new FormData();
        formdata.append("file", e.target.files[0])
        // axios.post("http://localhost:8080/file/save", formdata)
        axios.post("https://employee-manage-q8om.onrender.com/file/save", formdata)
            .then((res) => {
                console.log(res.data);
                setEmployee({ ...employee, imgUpload: res.data })

            }).catch(() => {

            })
    }

    console.log(employee);

    const addEmployee = (e) => {
        e.preventDefault();
        const validations = [
            validateName(),
            validateEmail(),
            validateNumber(),
            validatedesignation(),
            validategender(),
            validatecourse(),
            validateimgUpload()
        ];

        if (validations.includes(false)) return;
        axios.post("https://employee-manage-q8om.onrender.com/emp/employee", employee)
            .then((res) => {
                if (res) {
                    toast.success("Employee Added Successfully...!")
                    setEmployee({
                        name: "",
                        email: "",
                        number: "",
                        designation: "",
                        gender: "",
                        course: [],
                        imgUpload: ""
                    })
                    navigate("/dashboard")
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
                        <h1 className='text-center'>Add Employee </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <Toaster />
                        <form action="" onSubmit={addEmployee}>
                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Name </label>
                                <input type="text" name='name' onChange={handler} value={employee.name} onBlur={validateName} class="form-control shadow" />
                                <span style={{ color: "red" }}>{employee.nameError}</span>

                            </div>
                            <div class="mb-3">
                                <label for="formGroupExampleInput2" class="form-label">Email </label>
                                <input type="text" name='email' onChange={handler} value={employee.email} onBlur={validateEmail} class="form-control shadow" />
                                <span style={{ color: "red" }}>{employee.emailError}</span>
                            </div>
                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Mobile Number  </label>
                                <input type="text" name='number' onChange={handler} value={employee.number} onBlur={validateNumber} class="form-control shadow" />
                                <span style={{ color: "red" }}>{employee.numberError}</span>
                            </div>
                            <div className='mb-3'>
                                <label for="formGroupExampleInput" class="form-label">Designation   </label>
                                <select name="designation" className='form-control shadow' value={employee.designation} onBlur={validatedesignation} onChange={handler} id="">
                                    <option value="">---select---</option>
                                    <option value="hr">HR</option>
                                    <option value="manager">Manager </option>
                                    <option value="sales">Sales </option>

                                </select>
                                <span style={{ color: "red" }}>{employee.designationError}</span>
                            </div>


                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Gender</label>
                                <br />
                                <input type="radio" id="male" name="gender" value="Male" checked={employee.gender == "Male" ? true : false} onChange={handler} onBlur={validategender} class="form-check-input shadow" />
                                <label for="male" class="form-check-label">Male</label> &nbsp; &nbsp;


                                <input type="radio" id="female" name="gender" value="Female" checked={employee.gender == "Female" ? true : false} onChange={handler} onBlur={validategender} class="form-check-input shadow" />

                                <label for="female" class="form-check-label">Female</label>
                                <span style={{ color: "red" }}>{employee.genderError}</span>
                            </div>

                            <div class="mb-3">
                                <label for="formGroupExampleInput2" class="form-label">Course</label>
                                <div>
                                    <input type="checkbox" id="mca" name="course" value="MCA" onBlur={validatecourse} checked={employee.course.find((v) => v == 'MCA') ? true : false} onChange={(e) => {
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
                                <span style={{ color: "red" }}>{employee.courseError}</span>
                            </div>

                            <div class="mb-3">
                                <label for="formGroupExampleInput" class="form-label">Img Upload  </label>
                                <input type="file" name='img-upload' onChange={filehandler} onBlur={validateimgUpload} class="form-control shadow" />
                                <img src={employee.imgUpload} style={{ height: "30px", width: "30px" }} alt="" />
                                <span style={{ color: "red" }}>{employee.imgUploadError}</span>
                            </div>
                            <div class="mb-3">
                                <div>
                                    <input type="submit" value="Submit" className='btn btn-success shadow' />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>

        </>
    )
}

export default Employee
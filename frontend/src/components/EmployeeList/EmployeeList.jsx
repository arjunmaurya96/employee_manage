import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [msg, setMsg] = useState("");
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const getPaginatedEmployees = async (page = 1) => {
        try {
            const res = await axios.get(`https://employee-manage-q8om.onrender.com/emp/pages?page=${page}`);
            setEmployees(res.data.data);
            setTotalPages(res.data.totalPages);
            setCurrentPage(res.data.currentPage);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPaginatedEmployees(currentPage);
    }, [currentPage]);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };




    const fetchEmployees = async () => {
        try {
            const res = await axios.get("https://employee-manage-q8om.onrender.com/emp/empget");
            setEmployees(res.data?.Employee || []);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };


    useEffect(() => {
        fetchEmployees();
    }, []);




    const deleteEmployee = async (_id) => {
        try {
            const res = await axios.delete(`https://employee-manage-q8om.onrender.com/emp/empdelete/${_id}`);

            if (res.status === 200) {
                setMsg("Record deleted successfully!");
                fetchEmployees();
            } else {
                setMsg("Failed to delete employee.");
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
            setMsg("Error deleting employee. Please try again.");
        }
    };


    const searchHandle = async (event) => {
        const key = event.target.value;
        setSearchText(key);

        try {
            if (key.trim() !== "") {
                const result = await axios.get(`https://employee-manage-q8om.onrender.com/emp/search/${key}`);
                setEmployees(result.data);
            } else {
                fetchEmployees();
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };




    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center">Employee List</h1>

                        <div className='d-flex justify-content-end align-items-center gap-3 mb-3'>
                            <div className='w-50'>
                                <input
                                    type="text"
                                    value={searchText}
                                    className="form-control"
                                    placeholder="Search"
                                    onChange={searchHandle}
                                />
                            </div>
                            <div>
                                <select className="form-select">
                                    <option value="">--select--</option>
                                    <option value="">name</option>
                                    <option value="">email</option>
                                    <option value="">id</option>
                                    <option value="">date</option>
                                </select>
                            </div>
                        </div>

                        <div className='text-end mb-3'>
                            <Link to="/employee" className='btn btn-warning btn-sm'>Add Employee</Link>
                        </div>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Number</th>
                                    <th>Designation</th>
                                    <th>Gender</th>
                                    <th>Course</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.length > 0 ? employees.map((employee, index) => (
                                    <tr key={employee._id}>
                                        <td>{(currentPage - 1) * 3 + index + 1}</td>
                                        <td><img src={employee.imgUpload} alt={employee.name} width="50" height="50" /></td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.number}</td>
                                        <td>{employee.designation}</td>
                                        <td>{employee.gender}</td>
                                        <td>{employee.course?.join(', ')}</td>
                                        <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <Link to={`/updateemp/${employee._id}`} className="btn btn-success btn-sm">Edit</Link>
                                            &nbsp;
                                            <button className="btn btn-danger btn-sm" onClick={() => {
                                                if (window.confirm("Are you sure you want to delete this employee?")) {
                                                    deleteEmployee(employee._id);
                                                }
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="10" className="text-center">No employees found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-between">
                            <button className="btn btn-primary" onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button className="btn btn-primary" onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
                        </div>
                    </div>
                </div>
            </div >


        </>
    );
};

export default EmployeeList;

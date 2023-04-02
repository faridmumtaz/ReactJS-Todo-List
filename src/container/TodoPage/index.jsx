import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import * as bootstrap from 'bootstrap'

import Modal from "../../components/Modal";
import { event } from "jquery";

function TodoPage() {

  const [formData, setFormData] = useState({
    title: '',
    details: '',
    startDate: '',
    endDate: '',
    status: '',
    assignedTo: '',
  });
  const [tableData, setTableData] = useState(JSON.parse(localStorage.getItem("item")));
  const [addModal, setAddModal] = useState();
  const [errorModal, setErrorModal] = useState();
  const [dateErrorModal, setDateErrorModal] = useState();
  const [updateModal, setUpdateModal] = useState();
  const [deleteModal, setDeleteModal] = useState();

  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    setAddModal(new bootstrap.Modal(document.getElementById('addModal')))
    setErrorModal(new bootstrap.Modal(document.getElementById('errorModal')))
    setDateErrorModal(new bootstrap.Modal(document.getElementById('dateErrorModal')))
    setUpdateModal(new bootstrap.Modal(document.getElementById('updateModal')))
    setDeleteModal(new bootstrap.Modal(document.getElementById('deleteModal')))
  }, [])

  let dataArray = JSON.parse(localStorage.getItem("item")) ?? [];

  const handleChange = (e) => {
    setFormData(() => ({
      ...formData,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = (e,i) => {
    if (i != null) {
      if (formData.startDate > formData.endDate) {
        dateErrorModal.show();
      } else if (formData.title !== '' && formData.details !== '' && formData.startDate !== '' && formData.endDate !== '' && formData.status !== '' && formData.assignedTo !== '') {
        updateModal.show();
      } else {
        errorModal.show();
      }
    } else {
      if (formData.startDate > formData.endDate) {
        dateErrorModal.show();
      } else if (formData.title !== '' && formData.details !== '' && formData.startDate !== '' && formData.endDate !== '' && formData.status !== '' && formData.assignedTo !== '') {
        addModal.show();
      } else {
        errorModal.show();
      }
    }
  }

  const handleSave = (e,i) => {
    if(i != null){
      dataArray[i] = formData;
    }else{
      dataArray.push(formData);
    }
    localStorage.setItem("item", JSON.stringify(dataArray));
    document.getElementById('form').reset();
    setTableData(dataArray)
    addModal.hide();
    updateModal.hide();
    setFormData({
      title: '',
      details: '',
      startDate: '',
      endDate: '',
      status: '',
      assignedTo: '',
    })
    setEditItem(null)
  }


  const handleEditRecord = (i) => {
    setFormData(dataArray[i])
    setEditItem(i)
  }
  
  const handleDeleteRecord = (i) => {
    // setDeleteModal(true)
    setDeleteItem(i)
    deleteModal.show()
  }
  
  const handleDelete = (e,i) => {
    localStorage.setItem("item", JSON.stringify(dataArray.filter((item, index) => index != i)));
    setTableData(JSON.parse(localStorage.getItem("item")));
    deleteModal.hide();
  }
  return (
    <div className="container">
      {/* Modals */}
      <Modal id="addModal" onPrimaryAction={handleSave} title="Add Task" data={formData} type="confirm" primaryAction="Save"/>
      <Modal id="updateModal" onPrimaryAction={() => handleSave(event,editItem)} title="Update Task" data={formData} type="confirm" primaryAction="Update"/>
      <Modal id="deleteModal" onPrimaryAction={() => handleDelete(event,deleteItem)} title="Delete Task" data={{}} message="Are you sure you want to delete this task?" type="confirm" primaryAction="Delete"/>
      <Modal id="errorModal" type="alert" message="Fields cannot be empty!" />
      <Modal id="dateErrorModal" type="alert" message="End date is not valid!" />
      <div className="row justify-content-betweeen flex-wrap mt-5" style={{ height: "100vh" }}>
        <div className="col-lg-4">
          <form id="form" className="form">
            <InputField name="title" type="text" value={formData.title} placeholder="Add title here..." onChange={handleChange} />
            <div className="mb-3">
              <textarea
                name="details"
                className="form-control"
                value={formData.details}
                id="exampleFormControlTextarea1"
                rows="5"
                placeholder="Enter details here..."
                onChange={handleChange}
              ></textarea>
              <div className="d-flex justify-content-between mt-2">
                <div className="start-date w-40">
                  <p className="text-center">Select start date</p>
                  <InputField type="date" name="startDate" onChange={handleChange} min={new Date().toISOString().split('T')[0]} value={formData.startDate} />
                </div>
                <div className="end-date w-40">
                  <p className="text-center">Select end date</p>
                  <InputField type="date" name="endDate" onChange={handleChange} min={new Date().toISOString().split('T')[0]} value={formData.endDate} />
                </div>
              </div>
              <select name="status" className="form-select" value={formData.status} aria-label="Default select example" onChange={handleChange}>
                <option defaultValue>Open this select menu</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="QA">QA</option>
                <option value="done">Done</option>
              </select>
              <InputField type="text" name="assignedTo" value={formData.assignedTo} placeholder="Assign To..." onChange={handleChange} required />
              <Button type="button" value="Submit" onClick={() => handleSubmit(event,editItem)} operationType="primary" />
            </div>
          </form>
        </div>
        <div className="col-lg-8 tableContainer" style={{ height: "600px" }}>
          <hr />
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Details</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Assigned To</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.map((item, index) => {
                return (<tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.title}</td>
                  <td>{item.details}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td>{item.status}</td>
                  <td>{item.assignedTo}</td>
                  <td className="text-warning" onClick={() => handleEditRecord(index)}><FontAwesomeIcon icon={faPencil} /></td>
                  <td className="text-danger" onClick={() => handleDeleteRecord(index)}><FontAwesomeIcon icon={faXmark} /></td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;

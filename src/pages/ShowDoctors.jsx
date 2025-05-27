import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Spinner} from '../components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const ShowDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:4000/getDoctors')
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Doctors List</h1>
        <Link to="/addDoctor">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-state-600 rounded-md">No.</th>
              <th className="border border-state-600 rounded-md">Name</th>
              <th className="border border-state-600 rounded-md">Specialization</th>
              <th className="border border-state-600 rounded-md">Consultation Schedule</th>
              <th className="border border-state-600 rounded-md max-md:hidden">Email</th>
              <th className="border border-state-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {(doctors || []).map((doctor, index) => (
              <tr key={doctor._id} className="h-8">
                <td className="border border-state-700 rounded-md text-center">{index + 1}</td>
                <td className="border border-state-700 rounded-md text-center">{doctor.dname}</td>
                <td className="border border-state-700 rounded-md text-center">{doctor.specialization}</td>
                <td className="border border-state-700 rounded-md text-center">{doctor.availableSlots}</td>
                <td className="border border-state-700 rounded-md text-center max-md:hidden">{doctor.demail}</td>
                <td className="border border-state-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/getDoc/${doctor._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/deleteDoc/${doctor._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowDoctors;
import React, { useState } from "react";
import { LuUpload } from "react-icons/lu";
const AddEmployee: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState("details");
  const [activeSubTab, setActiveSubTab] = useState("basic");

  const today = new Date().toISOString().split("T")[0];

  const mainTabs = [
    { id: "details", label: "Employee Details" },
    { id: "salary", label: "Salary Information" },
    { id: "transfer", label: "Employee Transfer" },
  ];

  const subTabs = [
    { id: "basic", label: "Basic Information" },
    { id: "bio", label: "Employee Bio" },
    { id: "education", label: "Education / Skills" },
    { id: "emergency", label: "Emergency Contact" },
    { id: "experience", label: "Employee Experience" },
  ];

  const [educationRows, setEducationRows] = useState([
    { education: "10th", school: "Alpha School", startDate: "01/04/2020", endDate: "05/03/2021", percentage: "98%", marksheet: null },
    { education: "12th", school: "Fatima School", startDate: "05/06/2021", endDate: "03/04/2022", percentage: "91%", marksheet: null },
    { education: "BBA", school: "Anna University", startDate: "01/06/2022", endDate: "05/05/2023", percentage: "93%", marksheet: null },
    { education: "", school: "", startDate: "", endDate: "", percentage: "", marksheet: null },
  ]);

  const [skillsRows, setSkillsRows] = useState([
    { skill: "Graphic Design", institution: "Adithya Institution", priority: "Core Skill", level: "Advanced", experience: "3 years", cert: null },
    { skill: "Java", institution: "Self Learning", priority: "Secondary Skill", level: "Beginner", experience: "1 years", cert: null },
    { skill: "UI/UX Design", institution: "Tho Institution", priority: "Optional", level: "Intermediate", experience: "2 years", cert: null },
    { skill: "", institution: "", priority: "", level: "", experience: "", cert: null },
  ]);

  const [experienceRows, setExperienceRows] = useState([
    { company: "TCS", job: "Junior Software Engineer", start: "01/04/2020", end: "05/03/2021", type: "Full-Time", cert: null },
    { company: "Company", job: "Senior Software Engineer", start: "05/06/2021", end: "03/04/2022", type: "Part-time", cert: null },
    { company: "Genx Thofa", job: "Lead Engineer", start: "01/06/2022", end: "Currently", type: "Full-Time", cert: null },
    { company: "", job: "", start: "", end: "", type: "", cert: null },
  ]);

  const [selectedGovId, setSelectedGovId] = useState("");
  const [govIdLabel, setGovIdLabel] = useState("");

  const addEducationRow = () => {
    setEducationRows([...educationRows, { education: "", school: "", startDate: "", endDate: "", percentage: "", marksheet: null }]);
  };

  const addSkillsRow = () => {
    setSkillsRows([...skillsRows, { skill: "", institution: "", priority: "", level: "", experience: "", cert: null }]);
  };

  const addExperienceRow = () => {
    setExperienceRows([...experienceRows, { company: "", job: "", start: "", end: "", type: "", cert: null }]);
  };

  const removeEducationRow = (index: number) => {
    setEducationRows(educationRows.filter((_, i) => i !== index));
  };

  const removeSkillsRow = (index: number) => {
    setSkillsRows(skillsRows.filter((_, i) => i !== index));
  };

  const removeExperienceRow = (index: number) => {
    setExperienceRows(experienceRows.filter((_, i) => i !== index));
  };

  const renderSubContent = () => {
    switch (activeSubTab) {
      case "basic":
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <h3 className="text-lg font-semibold mb-4">Employee Information</h3>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="firstName" className="text-sm font-medium">First name</label>
                <input type="text" id="firstName" placeholder="First name" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="lastName" className="text-sm font-medium">Last name</label>
                <input type="text" id="lastName" placeholder="Last name" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="email" className="text-sm font-medium">Email ID</label>
                <input type="email" id="email" placeholder="@gmail.com" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                <input type="tel" id="phone" placeholder="Phone Number" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="address" className="text-sm font-medium">Address</label>
                <textarea id="address" rows={3} placeholder="Add Address" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="residentialAddress" className="text-sm font-medium">Residential Address</label>
                <textarea id="residentialAddress" rows={3} placeholder="Add Residential Address" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="department" className="text-sm font-medium">Department</label>
                <select id="department" className="border border-gray-300 rounded-md pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" selected>Select Department</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="position" className="text-sm font-medium">Position</label>
                <select id="position" className="border border-gray-300 rounded-md pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" selected>Select Position</option>
                  <option value="Developer">Developer</option>
                  <option value="Manager">Manager</option>
                  <option value="Analyst">Analyst</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="doj" className="text-sm font-medium">Date of Joining (DOJ)</label>
                <input type="text" id="doj" placeholder="DD-MM-YYYY" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="manager" className="text-sm font-medium">Reporting Manager</label>
                <select id="manager" className="border border-gray-300 rounded-md pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" selected>Select Manager</option>
                  <option value="shivaji">Shivaji</option>
                  <option value="shivani">Shivani</option>
                  <option value="jayashree">Jayashree</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Save</button>
            </div>
          </div>
        );
      case "bio":
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <h3 className="text-lg font-semibold mb-4">Employee Bio</h3>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="gender" className="text-sm font-medium">Gender</label>
                <select id="gender" className="border border-gray-300 rounded-md pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" selected >Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="dob" className="text-sm font-medium">Date of Birth</label>
                <input type="date" id="dob" defaultValue={today} className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="bloodGroup" className="text-sm font-medium">Blood-Group</label>
                <select id="bloodGroup" className="border border-gray-300 rounded-md pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" selected>Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="maritalStatus" className="text-sm font-medium">Marital Status</label>
                <select id="maritalStatus" className="border border-gray-300 rounded-md pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" selected>Select Marital Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="nationality" className="text-sm font-medium">Nationality</label>
                <select id="nationality" className="border border-gray-300 rounded-md pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" selected>Select Nationality</option>
                  <option value="indian">Indian</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="religion" className="text-sm font-medium">Religion</label>
                <select id="religion" className="border border-gray-300 rounded-md pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" selected>Select Religion</option>
                  <option value="hindu">Hindu</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <h4 className="text-lg font-semibold mb-4">Employee Documents</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Aadhaar</label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  onClick={() => document.getElementById("aadharFile")?.click()}
                >
                  <span className="text-gray-400 text-2xl flex justify-center mb-2"><LuUpload /> </span>
                  <p className="text-sm font-semibold text-gray-600">Upload your Aadhaar</p>
                  <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
                </div>
                <input type="file" id="aadharFile" className="hidden" accept="image/*,application/pdf" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Select any government ID</label>
                <select
                  id="govIdType"
                  value={selectedGovId}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedGovId(value);
                    const label = value === "pan" ? "PAN" : value === "voter" ? "Voter ID" : value === "passport" ? "Passport" : "";
                    setGovIdLabel(label);
                  }}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Government ID</option>
                  <option value="pan">PAN</option>
                  <option value="voter">Voter ID</option>
                  <option value="passport">Passport</option>
                </select>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    id="govIdNumber"
                    placeholder={selectedGovId ? `Enter ${govIdLabel} Number` : "Select ID type first"}
                    disabled={!selectedGovId}
                    className={`flex-1 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                      selectedGovId ? "focus:ring-blue-500 border-gray-300" : "focus:ring-gray-300 border-gray-200 bg-gray-50 cursor-not-allowed"
                    }`}
                  />
                  
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Save</button>
            </div>
          </div>
        );
      case "emergency":
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="contactName" className="text-sm font-medium">Contact Name</label>
                <input type="text" id="contactName" placeholder="Enter Name" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="relation" className="text-sm font-medium">Relation</label>
                <select id="relation" className="border border-gray-300 rounded-md pl-3 pr-1 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="" selected>Select Relation</option>
                  <option value="spouse">Spouse</option>
                  <option value="parent">Parent</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number</label>
                <input type="tel" id="phoneNumber" placeholder="Enter Primary Number" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="altPhone" className="text-sm font-medium">Alternate Phone Number</label>
                <input type="tel" id="altPhone" placeholder="Enter Alternate Number" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="emergencyAddress" className="text-sm font-medium">Address</label>
                <textarea id="emergencyAddress" rows={3} placeholder="Add Address" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="emergencyResidentialAddress" className="text-sm font-medium">Residential Address</label>
                <textarea id="emergencyResidentialAddress" rows={3} placeholder="Add Residential Address" className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Save</button>
            </div>
          </div>
        );
      case "education":
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-semibold mb-2">Employee Education</h4>
              <div className="flex justify-end mb-2">
                <button type="button" onClick={addEducationRow} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors">Add +</button>
              </div>
              <table className="w-full border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">Education</th>
                    <th className="border border-gray-300 p-2 text-left">School/University</th>
                    <th className="border border-gray-300 p-2 text-left">Start Date</th>
                    <th className="border border-gray-300 p-2 text-left">End Date</th>
                    <th className="border border-gray-300 p-2 text-left">Percentage %</th>
                    <th className="border border-gray-300 p-2 text-left">Marksheet</th>
                    <th className="border border-gray-300 p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {educationRows.map((row, index) => (
                    <tr key={index} className={!row.education ? "border-2 border-blue-300 bg-blue-50" : ""}>
                      <td className="border border-gray-300 p-2">
                        {row.education ? row.education : <input type="text" placeholder="Education" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.school ? row.school : <input type="text" placeholder="School/University" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.startDate ? row.startDate : <input type="text" placeholder="Start Date" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.endDate ? row.endDate : <input type="text" placeholder="End Date" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.percentage ? row.percentage : <input type="text" placeholder="Percentage %" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <span className="text-gray-400 cursor-pointer">📎</span>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {index < educationRows.length - 1 && (
                          <button
                            type="button"
                            onClick={() => removeEducationRow(index)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            X
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <h4 className="text-lg font-semibold mb-2">Employee Skills</h4>
              <div className="flex justify-end mb-2">
                <button type="button" onClick={addSkillsRow} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors">Add +</button>
              </div>
              <table className="w-full border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">Skill Name</th>
                    <th className="border border-gray-300 p-2 text-left">Institution Name</th>
                    <th className="border border-gray-300 p-2 text-left">Skill Priority</th>
                    <th className="border border-gray-300 p-2 text-left">Proficiency Level</th>
                    <th className="border border-gray-300 p-2 text-left">Experience With Skill</th>
                    <th className="border border-gray-300 p-2 text-left">Certification</th>
                    <th className="border border-gray-300 p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {skillsRows.map((row, index) => (
                    <tr key={index} className={!row.skill ? "border-2 border-blue-300 bg-blue-50" : ""}>
                      <td className="border border-gray-300 p-2">
                        {row.skill ? row.skill : <input type="text" placeholder="Skill Name" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.institution ? row.institution : <input type="text" placeholder="Institution Name" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.priority ? row.priority : <input type="text" placeholder="Skill Priority" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.level ? row.level : <input type="text" placeholder="Proficiency Level" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.experience ? row.experience : <input type="text" placeholder="Experience With Skill" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <span className="text-gray-400 cursor-pointer">📎</span>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {index < skillsRows.length - 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkillsRow(index)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            X
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Save</button>
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Employee Experience</h3>
              <div className="flex justify-end mb-2">
                <button type="button" onClick={addExperienceRow} className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors">Add +</button>
              </div>
              <table className="w-full border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 p-2 text-left">Company</th>
                    <th className="border border-gray-300 p-2 text-left">Job Title / Designation</th>
                    <th className="border border-gray-300 p-2 text-left">Start Date</th>
                    <th className="border border-gray-300 p-2 text-left">End Date</th>
                    <th className="border border-gray-300 p-2 text-left">Employment Type</th>
                    <th className="border border-gray-300 p-2 text-left">Certification</th>
                    <th className="border border-gray-300 p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {experienceRows.map((row, index) => (
                    <tr key={index} className={!row.company ? "border-2 border-blue-300 bg-blue-50" : ""}>
                      <td className="border border-gray-300 p-2">
                        {row.company ? row.company : <input type="text" placeholder="Company" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.job ? row.job : <input type="text" placeholder="Job Title / Designation" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.start ? row.start : <input type="text" placeholder="Start Date" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.end ? row.end : <input type="text" placeholder="End Date" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {row.type ? row.type : <input type="text" placeholder="Employment Type" className="w-full border-0 focus:outline-none" />}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <span className="text-gray-400 cursor-pointer">📎</span>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        {index < experienceRows.length - 1 && (
                          <button
                            type="button"
                            onClick={() => removeExperienceRow(index)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            X
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Save</button>
            </div>
          </div>
        );
      default:
        return (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <p>Content for {activeSubTab} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Employee Data</h1>
      {/* Main Tabs */}
      <div className="mb-6">
        <ul className="flex gap-2 bg-gray-200 rounded-2xl p-2">
          {mainTabs.map((tab) => (
            <li
              key={tab.id}
              className={`px-4 py-2 rounded-xl cursor-pointer transition-colors duration-200 ${
                activeMainTab === tab.id
                  ? "bg-gray-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveMainTab(tab.id)}
            >
              {tab.label}
            </li>
          ))}
          <li className="flex-1" /> {/* Empty space to match image */}
        </ul>
      </div>

      {/* Sub Tabs - Only show if main tab is details */}
      {activeMainTab === "details" && (
        <div className="mb-6">
          <ul className="flex gap-2 bg-gray-200 rounded-2xl p-2">
            {subTabs.map((tab) => (
              <li
                key={tab.id}
                className={`px-3 py-2 rounded-xl text-sm cursor-pointer transition-colors duration-200 ${
                  activeSubTab === tab.id
                    ? "bg-gray-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSubTab(tab.id)}
              >
                {tab.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Content */}
      <form className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        {activeMainTab === "details" ? renderSubContent() : (
          <div className="transition-opacity duration-300 ease-in-out opacity-100">
            <p>Content for {activeMainTab} coming soon...</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AddEmployee;
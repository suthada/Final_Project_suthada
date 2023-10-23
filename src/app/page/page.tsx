"use client";
import React, { useState } from 'react';

const MyComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    propertyType: '',
    area: '',
    appraisalPrice: '',
    calculatedAppraisalPrice: 0,
  });

  const [data, setData] = useState<
    Array<{
      name: string;
      address: string;
      propertyType: string;
      area: string;
      appraisalPrice: string;
      calculatedAppraisalPrice: number;
    }>
  >([]);

  const [editIndex, setEditIndex] = useState<number | null>(null); // สร้าง state สำหรับการแก้ไข

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAppraisalPriceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const calculateAppraisalPrice = (area: string, appraisalPrice: string, propertyType: string) => {
    // Convert area and appraisalPrice to numbers
    const numericArea = parseFloat(area);
    const numericAppraisalPrice = parseFloat(appraisalPrice);

    // Check if the property type is "ประเภทที่อยู่อาศัย"
    if (propertyType === "ประเภทที่อยู่อาศัย") {
      return numericArea * numericAppraisalPrice * 0.03; };
    if (propertyType === "ประเภทพาณิชยกรรม") {
      return numericArea * numericAppraisalPrice * 0.005; };
    if (propertyType === "ประเภทที่ว่างเปล่า") {
      return numericArea * numericAppraisalPrice * 0.03;
    } else {
      // Handle other property types here if needed
      // For now, return 0 for other property types
      return 0;
    }
  };

  const handleSave = () => {
    if (editIndex !== null) {
      // ถ้ากำลังแก้ไข ให้อัปเดตข้อมูลในรายการและเคลียร์โหมดแก้ไข
      const updatedData = [...data];
      const calculatedAppraisalPrice = calculateAppraisalPrice(formData.area, formData.appraisalPrice, formData.propertyType);
      updatedData[editIndex] = {
        name: formData.name,
        address: formData.address,
        propertyType: formData.propertyType,
        area: formData.area,
        appraisalPrice: formData.appraisalPrice,
        calculatedAppraisalPrice: calculatedAppraisalPrice,
      };
      setData(updatedData);
      setEditIndex(null);
    } else {
      // ถ้าไม่ใช่โหมดแก้ไข ให้เพิ่มข้อมูลใหม่
      const calculatedAppraisalPrice = calculateAppraisalPrice(formData.area, formData.appraisalPrice, formData.propertyType);
      const newData = {
        name: formData.name,
        address: formData.address,
        propertyType: formData.propertyType,
        area: formData.area,
        appraisalPrice: formData.appraisalPrice,
        calculatedAppraisalPrice: calculatedAppraisalPrice,
      };
      setData([...data, newData]);
    }

    setFormData({
      name: '',
      address: '',
      propertyType: '',
      area: '',
      appraisalPrice: '',
      calculatedAppraisalPrice: 0,
    });
  };

  const handleDelete = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  // สร้างฟังก์ชันเรียกใช้โหมดแก้ไข
  const handleEdit = (index: number) => {
    const itemToEdit = data[index];
    setFormData({
      name: itemToEdit.name,
      address: itemToEdit.address,
      propertyType: itemToEdit.propertyType,
      area: itemToEdit.area,
      appraisalPrice: itemToEdit.appraisalPrice,
      calculatedAppraisalPrice: itemToEdit.calculatedAppraisalPrice,
    });
    setEditIndex(index);
  };

  return (
    <div>
      <h1>คำนวณภาษี</h1> {/* Heading added here */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label htmlFor="name">กรุณากรอกชื่อนามสกุล</label>
      </div>

      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleTextareaChange}
        ></textarea>
        <label htmlFor="address">ที่อยู่</label>
      </div>

      <div className="form-floating">
        <select
          className="form-select"
          id="propertyType"
          name="propertyType"
          value={formData.propertyType}
          onChange={handleSelectChange}
        >
          <option value=""></option>
          <option value="ประเภทที่อยู่อาศัย">ประเภทที่อยู่อาศัย</option>
          <option value="ประเภทพาณิชยกรรม">ประเภทพาณิชยกรรม</option>
          <option value="ประเภทที่ว่างเปล่า">ประเภทที่ว่างเปล่า</option>
        </select>
        <label htmlFor="propertyType">ประเภท</label>
      </div>

      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          id="area"
          name="area"
          value={formData.area}
          onChange={handleTextAreaChange}
        ></textarea>
        <label htmlFor="area">ขนาดพื้นที่สิ่งปลูกสร้าง(ตรม.)</label>
      </div>

      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          id="appraisalPrice"
          name="appraisalPrice"
          value={formData.appraisalPrice}
          onChange={handleAppraisalPriceChange}
        ></textarea>
        <label htmlFor="appraisalPrice">ราคาประเมินสิ่งปลูกสร้าง</label>
      </div>

      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          id="calculatedAppraisalPrice"
          name="calculatedAppraisalPrice"
          value={formData.calculatedAppraisalPrice}
          disabled
        ></textarea>
        <label htmlFor="calculatedAppraisalPrice">คิดเป็นราคาประเมินสิ่งก่อสร้าง</label>
      </div>

      <button type="button" className="btn btn-primary btn-lg" onClick={handleSave}>
        {editIndex !== null ? "แก้ไข" : "บันทึก"}
      </button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ลำดับ</th>
            <th scope="col">ชื่อ-สกุล</th>
            <th scope="col">ที่อยู่</th>
            <th scope="col">ประเภท</th>
            <th scope="col">ขนาดพื้นที่สิ่งปลูกสร้าง(ตรม)</th>
            <th scope="col">ราคาประเมินสิ่งปลูกสร้าง</th>
            <th scope="col">คิดเป็นราคาประเมินสิ่งก่อสร้าง</th>
            <th scope="col">ลบ</th>
            <th scope="col">แก้ไข</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.address}</td>
              <td>{item.propertyType}</td>
              <td>{item.area}</td>
              <td>{item.appraisalPrice}</td>
              <td>{item.calculatedAppraisalPrice}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  ลบ
                </button>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEdit(index)}
                >
                  แก้ไข
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyComponent;

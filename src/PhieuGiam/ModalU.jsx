import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Modal, Space, notification } from 'antd';
import { FaRegPenToSquare } from "react-icons/fa6";
import { DatePicker } from 'antd';
import moment from 'moment';
import {
    Button,
    Form,
    Input,
    Modal,
    Tooltip,
    Select,
    notification,
    Space
} from "antd";
import axios from 'axios';
const { Option } = Select;
const ModalU = ({ recordId, onActionSuccess }) => {
   
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, title, des, placement) => {
        if (type === "error") {
            api.error({
                message: title,
                description: des,
                placement,
            });
        } else {
            api.success({
                message: title,
                description: des,
                placement,
            });
        }
    };
    const [open, setOpen] = useState(false);
    const showModal = () => {
        console.log(recordId);

        setOpen(true);
    };
    const handleOk = async () => {
        // Kiểm tra điều kiện validation
        const validationErrors = validateForm();

        if (validationErrors.length === 0) {
            // Gọi hàm cập nhật với dữ liệu từ state editsanPhamData và recordId
            await updatesanPham(recordId, editsanPhamData);
            onActionSuccess();
            setOpen(false);
        } else {
            // Hiển thị thông báo nếu validation không thành công
            validationErrors.forEach((error) => {
                openNotification("error", "Hệ thống", error, "bottomRight");
            });
        }
    };

    // Hàm kiểm tra validation và trả về mảng chứa các thông báo lỗi
    const validateForm = () => {
        const errors = [];


        if (!editsanPhamData.ten) {
            errors.push("Vui lòng nhập Tên  !");
        }
        if (!editsanPhamData.mucGiamGia) {
            errors.push("Vui lòng nhập mức giảm giá  !");
        }
        if (!editsanPhamData.kieuGiamGia) {
            errors.push("Vui lòng nhập kieu giam !");
        }
        if (!editsanPhamData.soLuong) {
            errors.push("Vui lòng nhập Số lượng!");

        } else if (isNaN(editsanPhamData.soLuong) || editsanPhamData.soLuong <= 0) {
            errors.push("Số lượng phải là một số dương!");
        }
        if (!editsanPhamData.ngayBatDau) {
            errors.push("Vui lòng nhập ngay Ngày bat đầu !");
        }
        if (!editsanPhamData.ngayKetThuc) {
            errors.push("Vui lòng nhập ngay kết thúc !");
        }
       
        if (!editsanPhamData.soTienGiamGiaToiDa) {
            errors.push("Vui lòng nhập số tiền giảm tối đa  !");
        }
        // if (!editsanPhamData.soTienApDungToiThieu) {
        //     errors.push("Vui lòng nhập TT sản phẩm !");
        // }
        return errors;

    };
    const handleCancel = () => {
        setOpen(false);
    };
    const [editsanPhamData, setEditsanPhamData] = useState({
        ten: '',
       
        ngayBatDau: '',
        ngayKetThuc: '',
        soLuong: '',
        mucGiamGia: '',
        kieuGiamGia:'',
       
        soTienGiamGiaToiDa:'',
        soTienApDungToiThieu: '',
    });

    const updatesanPham = async (id, data) => {
        try {
            await axios.put(`http://localhost:8080/phieu-giam-gia/update/${id}`, data);
            openNotification("success", "Hệ thống", "Sửa thành công", "bottomRight");

        } catch (error) {
            console.error("Error updating sanPham:", error);
        }
    };
    useEffect(() => {
        // Gọi handleClickEdit khi recordId thay đổi
        handleClickEdit(recordId);
    }, [recordId]);

    const handleClickEdit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/view-update/${id}`);
            const data = response.data;
            console.log(data)
            // console.log("Initial ten value:", data.ten);

            // Cập nhật state để hiển thị dữ liệu trên form
            setEditsanPhamData({
                ten: data.ten,
                ma: data.ma,
                ngayBatDau: data.ngayBatDau,
                ngayKetThuc: data.ngayKetThuc,
                
                soLuong: data.soLuong,
                mucGiamGia: data.mucGiamGia,
                kieuGiamGia: data.kieuGiamGia,
               
                soTienGiamGiaToiDa: data.soTienGiamGiaToiDa,
                soTienApDungToiThieu: data.soTienApDungToiThieu,
            });
        } catch (error) {
            console.error(`Error fetching sanPham with id ${id}:`, error);
        }
    };
    return (
        <>{contextHolder}
            <Space>

                <Button style={{
                    color: "green",
                }}
                    shape="circle"
                    icon={<FaRegPenToSquare />}
                    onClick={showModal}>

                </Button>

            </Space>
            <Modal
            
                open={open}
                title="Cập nhật phiếu giảm giá ~"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>

                        <CancelBtn />
                        <OkBtn />
                    </>
                )}
                centered
            >

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Tên  :</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="Tên  "
                        value={editsanPhamData.ten}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, ten: e.target.value })
                        }
                        } />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Mức giảm giá :</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="Mức giảm giá  "
                        value={editsanPhamData.mucGiamGia}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, mucGiamGia: e.target.value })
                        }
                        } />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Kiểu giảm giá :</span>
                   
                        {/* style={{ flex: '1' }}
                        size="medium"
                        placeholder="Kiểu giảm giá  "
                        
                        value={editsanPhamData.kieuGiamGia}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, kieuGiamGia: e.target.value })
                        }
                        } /> */}
                       
                    <Select
                        style={{ flex: '1' }}
                        value={editsanPhamData.kieuGiamGia}
                        onChange={(value) => setEditsanPhamData({ ...editsanPhamData, kieuGiamGia: value })}
                    >
                    <Option  value="PHẦNTRĂM">%</Option>
                    <Option value="TIỀNMẶT">TIỀN MẶT</Option>
                    </Select>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>SỐ Lượng:</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="SỐ lượng "
                        value={editsanPhamData.soLuong}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, soLuong: e.target.value })
                        }
                        } />
                </div>
              
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                         <Form.Item
                                label="Ngày bắt đầu"
                                name="Ngày bắt đầu"
                                rules={[
                                    { required: true, message: 'Vui lòng chọn ngày bắt đầu' },
                                    () => ({
                                        validator(_, value) {
                                            if (!value || moment(value).isSameOrAfter(moment(), 'day')) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Ngày bắt đầu không được trước hôm nay'));
                                        },
                                    }),
                                ]}
                            >
                                    <DatePicker
                                    format="YYYY-MM-DD"
                                    // disabledDate={disabledDate}
                                    value={editsanPhamData.ngayBatDau ? moment(editsanPhamData.ngayBatDau) : null}
                                    onChange={(date) => setEditsanPhamData({ ...editsanPhamData, ngayBatDau: date })}
                                    //  disabledDate={(current) => current && current < moment().startOf('day')}
                                />
                                
                            </Form.Item>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    {/* <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3> */}
                   
                         <Form.Item
                                label="Ngày kết thúc"
                                name="Ngày kết thúc"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập ngày kết thúc' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || value.isAfter(getFieldValue('ngayBatDau'), 'day')) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu'));
                                        },
                                    }),
                                ]}
                            >
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    value={editsanPhamData.ngayKetThuc}
                                    onChange={(value) => setEditsanPhamData({ ...editsanPhamData, ngayKetThuc: value })}
                                    disabledDate={(current) => current && current < moment().startOf('day')}

                                />
                            </Form.Item>
                </div>
                {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Giá trị giảm :</span>
                    <Input size="medium" placeholder="Giá trị giảm" style={{ flex: '1' }}
                        value={editsanPhamData.giaTriGiam}
                        onChange={(e) => setEditsanPhamData({ ...editsanPhamData, giaTriGiam: e.target.value })}
                    /></div> */}
                
                {/* <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>KieuGiamGia :</span>
                    <Input size="medium" placeholder="Số lượng"
                        value={editsanPhamData.kieuGiamGia} style={{ flex: '1' }}
                        onChange={(e) => setEditsanPhamData({ ...editsanPhamData, kieuGiamGia: e.target.value })}
                    /></div> */}

              
                    
                     <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Số tiền giảm tối Đa :</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="soTienApDungToiDa  "
                        value={editsanPhamData.soTienGiamGiaToiDa}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, soTienGiamGiaToiDa: e.target.value })
                        }
                        } />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ color: 'rgb(252, 40, 72)', marginRight: '5px' }}>*</h3>
                    <span style={{ marginRight: '10px' }}>Số tiền giảm tối thiểu :</span>
                    <Input
                        style={{ flex: '1' }}
                        size="medium"
                        placeholder="Kiểu giảm giá  "
                        value={editsanPhamData.soTienApDungToiThieu}
                        onChange={(e) => {
                            setEditsanPhamData({ ...editsanPhamData, soTienApDungToiThieu: e.target.value })
                        }
                        } />
                </div>

            </Modal>
        </>
    );
};
export default ModalU;
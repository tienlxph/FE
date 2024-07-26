// import "./style.css";
import {
    Button,
    Form,
    Input,

    Modal,
    Select,
    Tooltip,
    notification,
} from "antd";

import React, { useState } from "react";
import { TbBackground } from "react-icons/tb";
import { DatePicker } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
function ModalA({ onActionSuccess }) {
   
    const [ten, setten] = useState('')
    const [ma, setma] = useState('')
    const [mucGiamGia, setmucGiamGia] = useState('')
    const [kieuGiamGia, setkieuGiamGia] = useState('')
    const [ngayBatDau, setngaybatdau] = useState('')
    const [ngayKetThuc, setngayketthuc] = useState('')
    const [soLuong, setsoLuong] = useState('')
    
    const [soTienGiamGiaToiDa, setsoTienGiamGiaToiDa] = useState('')
    const [soTienApDungToiThieu, setsoTienApDungToiThieu] = useState('')
    const [trangThai, settrangThai] = useState('')
    const navigate = useNavigate();
 
    const handleClick = (e) => {
       
        e.preventDefault()
        // Kiểm tra từng trường và hiển thị thông báo lỗi
        if (!ten || ten.trim() === "") {
            openNotification("error", "Lỗi", "Tên Phiếu Giảm Giá được để trống", "bottomRight");
            return;
        }
        // if (!ma || ma.trim() === "") {
        //     openNotification("error", "Lỗi", "Tên Phiếu được để trống", "bottomRight");
        //     return;
        // // }
        // if (!soLuong || soLuong.trim() === "") {
        //     openNotification("error", "Lỗi", "Số Lượng Phiếu Giảm Giá được để trống", "bottomRight");
        //     return;
        // }

        // if (!ngayBatDau || ngayBatDau.trim() === "") {
        //     openNotification("error", "Lỗi", "Ngảy băt đầu Phiếu Giảm Giá được để trống", "bottomRight");
        //     return;
        // }
        
        if (!soLuong) {
            openNotification("error", "Lỗi", "Số lượng không được để trống", "bottomRight");
            return;
        } else if (isNaN(soLuong) || soLuong <= 0) {
            openNotification("error", "Lỗi", "Số lượng phải là một số dương lớn hơn 0!", "bottomRight");
            return;

        }
        
        if (!soTienGiamGiaToiDa) {
            openNotification("error", "Lỗi", " không được để trống", "bottomRight");
            return;
        } else if (isNaN(soTienGiamGiaToiDa) || soTienGiamGiaToiDa <= 0 ) {
            openNotification("error", "Lỗi", "Số tiền phải là một số dương lớn hơn 0!", "bottomRight");
            return;

        }
        if (!soTienApDungToiThieu) {
            openNotification("error", "Lỗi", "soTienApDungToiThieu không được để trống", "bottomRight");
            return;
        } else if (isNaN(soTienApDungToiThieu) || soTienApDungToiThieu <= 0 ) {
            openNotification("error", "Lỗi", "Số soTienApDungToiThieu phải là một số dương lớn hơn 0!", "bottomRight");
            return;

        }
        if (kieuGiamGia === 'PHẦNTRĂM' && (mucGiamGia < 0 || mucGiamGia > 100)) {
            openNotification("error", "Lỗi", "Giá trị giảm phần trăm phải nằm trong khoảng từ 0 đến 100!", "bottomRight");
            return;
        }
        if (kieuGiamGia === 'TIỀNMẶT' && (mucGiamGia < 1000)) {
            openNotification("error", "Lỗi", "Bạn đang dùng tiền VIỆT đấy ít nhất hãy cho giảm 1000 đ", "bottomRight");
            return;
        }
        const phieuGiamGia = {ten ,ma ,kieuGiamGia , mucGiamGia ,soLuong ,ngayBatDau ,ngayKetThuc ,soTienGiamGiaToiDa
            , soTienApDungToiThieu }


        fetch("http://localhost:8080/phieu-giam-gia/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(phieuGiamGia)
        }).then(() => {
            if (typeof onActionSuccess === 'function') {
                onActionSuccess();
            }

            openNotification("success", "Hệ thống", "Thêm Thành công", "bottomRight");

            setIsModalOpen(false);
             navigate('/PhieuGiamGia');
            onActionSuccess();
            console.log("New sanPhamAdded")
           

        })
            .catch((error) => {
                console.error("Error adding sanPham:", error);
            });

    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {

        setIsModalOpen(false);
    };
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

    return (
        <>
            {contextHolder}
            <div
                style={{
                    
                    marginLeft: "4px",
                    marginRight: "4px",
                }}
            >
                <Tooltip title="ADD" onClick={showModal}>
                    {/* <Button
                        type="primary"


                    >Thêm dữ liệu</Button> */}
                </Tooltip>
               <Form
                    
                    okButtonProps={{ style: { display: "none" } }}
                    cancelButtonProps={{ style: { display: "none" } }}
                    title="Thêm phiếu giảm giá"
                    open={isModalOpen}
                    onCancel={handleCancel}
                   
                    centered
                >
                    
                    <Form
                        name="wrap"
                        labelCol={{
                            flex: "110px",
                        }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{
                            flex: 1,
                        }}
                        colon={false}
                        style={{
                            maxWidth: 600,
                        }}
                    >
                        <Form.Item
                            label="Tên "
                            name="Tên"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={ten}
                                onChange={(e) => setten(e.target.value)}

                            />
                        </Form.Item>
                      

                       
                        <Form.Item
                            label="Kiểu giảm giá "
                            name="Kiểu giảm giá "
                            
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                maxWidth: 240, color:"red"
                            }}
                        >
                            <Select value={kieuGiamGia
                            
                            } onChange={(value) => setkieuGiamGia(value)}>
                                <Option  value="PHẦNTRĂM">%</Option>
                                <Option value="TIỀNMẶT">TIỀN MẶT</Option>
                            </Select>
                        </Form.Item>
                  
                        <Form.Item
                            label="Mức giảm giá "
                            name="Mức giảm giá"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={mucGiamGia}
                                onChange={(e) => setmucGiamGia(e.target.value)}

                            />
                        </Form.Item>
                        <Form.Item
                            label="Số lượng"
                            name="Số lượng"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={soLuong}
                                onChange={(e) => setsoLuong(e.target.value)}



                            />
                        </Form.Item>
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
                                    
                                    value={ngayBatDau ? moment(ngayBatDau) : null}
                                    onChange={(date) => setngaybatdau(date)}
                                   
                                    //  disabledDate={(current) => current && current > moment().startOf('day')}
                                />
                                  {/* <DatePicker
                                    format="YYYY-MM-DD"
                                    value={ngayBatDau}
                                    onChange={(date) => setngaybatdau(date)}
                                    // disabledDate={(current) => current && current < moment().startOf('day')}

                                /> */}
                            </Form.Item>
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
                                    value={ngayKetThuc}
                                    onChange={(date) => setngayketthuc(date)}
                                    disabledDate={(current) => current && current < moment().startOf('day')}

                                />
                            </Form.Item>
                        
                        <Form.Item
                            label="Số tiền giảm tối đa "
                            name="Số tiền giảm tối đa"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={soTienGiamGiaToiDa}
                                onChange={(e) => setsoTienGiamGiaToiDa(e.target.value)}

                            />
                        </Form.Item>
                        <Form.Item
                            label="Số tiền giảm tối thiểu "
                            name="Số tiền giảm tối thiểu"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={soTienApDungToiThieu}
                                onChange={(e) => setsoTienApDungToiThieu(e.target.value)}

                            />
                        </Form.Item>
                        {/* <Form.Item
                        
                            label="Trạng thái "
                            name="Trạng thái"
                            
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input
                                value={trangThai}
                                onChange={(e) => settrangThai(e.target.value)}

                            />
                        </Form.Item> */}
                        <Form.Item label=" ">
                            <Button
                                
                                type="primary"
                                htmlType="submit"
                                
                                onClick={handleClick}
                               
                            >
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                    </Form>
            </div>
        </>
        
    );
}

export default ModalA;

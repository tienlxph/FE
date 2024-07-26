import React, { useEffect, useState, useRef } from 'react';
import { Input, Table, Button, message, Tag, Space, Radio } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import axios from 'axios';
import ModalA from './ModalA';
import ModalD from './ModalD';
import ModalU from './ModalU';
import { render } from '@testing-library/react';
import { MdFormatColorText } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const { Search } = Input;

export default function PhieuGiamGia() {
    const searchInput = useRef(null);
    const [phieuGiamGia, setphieuGiamGia] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [resetTable, setResetTable] = useState(false);
    // const [selectedStatus, setSelectedStatus] = useState('');  
    const navigate = useNavigate();
    const handleSearch = async (value, status) => {
        setSearchText(value);
        try {
            setLoading(true);
            const result = await axios.get(`http://localhost:8080/timkiem`, {
                params: {
                    keyword: value,
                    status: status
                }
            });
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error searching products:', error);
        } finally {
            setLoading(false);
        }
    };
    
    function trangThai({ name, isPacked }) {
        if (isPacked) {
          return <li className="item">{name} ✔</li>;
        }
        return <li className="item">{name}</li>;
      }

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
        setResetTable(true);
    };
    // useEffect(() => {
    //     // Load products whenever searchText or selectedStatus changes
    //     handleSearch(searchText, selectedStatus);
    // }, [searchText, selectedStatus]);

    // const handleStatusChange = (e) => {
    //     setSelectedStatus(e.target.value);  // Update selected status
    // };
    const getStatusProps = (status) => {
        switch (status) {
            case 'SAP_DIEN_RA':
                return { color: 'orange', text: 'Sắp diễn ra' };
            case 'DANG_DIEN_RA':
                return { color: 'blue', text: 'Đang diễn ra' };
            case 'DA_KETTHUC':
                return { color: 'red', text: 'Đã kết thúc' };
            default:
                return { color: 'gray', text: 'Chưa xác định' };
        }
    };
    const handleAddClick = () => {
        navigate('/phieuGiamGia/add');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Search
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current.select(), 1);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <span style={{ backgroundColor: '#ffc069' }}>{text}</span>
            ) : (
                text
            ),
    });

    const columns = [
        
        {
            title: 'STT ',
            dataIndex: 'Số thứ tự',
            key: 'stt',
           render: (text , record , index) => index + 1,
        },  
        // {
        //     title: 'ID ',
        //     dataIndex: 'id',
        //     key: 'id',
        //     ...getColumnSearchProps('id'),
        // },     
        {
            title: 'Mã ',
            dataIndex: 'ma',
            key: 'ma',
           
            // ...getColumnSearchProps('ma'),
           
        },
        {
            title: 'Tên ',
            dataIndex: 'ten',
            key: 'ten',
            ...getColumnSearchProps('ten'),
        },      
        // {
        //     title: 'Kiểu giảm giá',
        //     dataIndex: 'kieuGiamGia',
        //     key: 'kieuGiamGia',
            
        // },
        {
            title: 'Mức giảm giá',
            dataIndex: 'mucGiamGia',
            key: 'mucGiamGia',
            render: (mucGiamGia, record) => {
                if (record.kieuGiamGia === 'PHẦNTRĂM') {
                    return `${mucGiamGia} %`;
                } else if (record.kieuGiamGia === 'TIỀNMẶT') {
                    return `${mucGiamGia}` + ' vn₫';
                }
                return mucGiamGia;
            },
            
        },
        {
            title: 'Số lượng',
            dataIndex: 'soLuong',
            key: 'soLuong',
        },
      

        {
            title: 'Số tiền giảm tối thiểu',
            dataIndex: 'soTienApDungToiThieu',
            key: 'soTienApDungToiThieu',
            render: (mucApDungToiThieu) => {
                return mucApDungToiThieu + " vnđ";
            },
        },
        {
            title: 'Số tiền giảm tối đa',
            dataIndex: 'soTienGiamGiaToiDa',
            key: 'soTienGiamGiaToiDa',
            render: (soTienGiamGiaToiDa) => {
                return soTienGiamGiaToiDa + " vnđ";
            },
        },
        {    
            title: 'Ngày bắt đầu ',
            dataIndex: 'ngayBatDau',
            key: 'ngayBatDau',
            format:"YYYY-MM-DD"

        },
        {
            title: 'Ngày kết thúc ',
            dataIndex: 'ngayKetThuc',
            key: 'ngayKetThuc',

        },
        
            {
                title: 'Trạng thái',
                dataIndex: 'trangThai',
                key: 'trangThai',
                filters: [
                    { text: 'Sắp diễn ra', value: 'SAP_DIEN_RA' },
                    { text: 'Đang diễn ra', value: 'DANG_DIEN_RA' },
                    { text: 'Đã kết thúc', value: 'DA_KETTHUC' },
                ],
                onFilter: (value, record) => record.trangThai === value,
                render: (text) => {
                    const { color, text: statusText } = getStatusProps(text);
                    return <Tag color={color}>{statusText}</Tag>;
                },
        
            
        },
        
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            render: (record) => <div>
                <ModalU recordId={record.id} onActionSuccess={reloadphieuGiamGia} />
                <ModalD recordId={record.id} onActionSuccess={reloadphieuGiamGia} />
            </div>

        },
    ];

    useEffect(() => {
        loadphieuGiamGia();
    }, [resetTable]);

    const loadphieuGiamGia = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8080/phieu-giam-gia/hien-thi');
            setphieuGiamGia(result.data);
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error loading phieuGiamGia:', error);
        } finally {
            setLoading(false);
        }

        setResetTable(false);
    };
    const reloadphieuGiamGia = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8080/phieu-giam-gia/hien-thi');
            setphieuGiamGia(result.data);
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error reloading phieuGiamGia:', error);
        } finally {
            setLoading(false);
        }
    };




    return (
        <div>
            {/* <Header />
            <MenuAdmin /> */}
            <div className="body-container">
                <div className="button"
                    style={{
                        display: 'flex',
                        justifyContent: "flex-end",
                        margin: "10px",
                    }}>


                    {/* <ModalA onActionSuccess={reloadphieuGiamGia} /> */}


                </div>
                <div >
                <div style={{ marginBottom: '20px' }}>
                <Search
                    placeholder="Tìm kiếm sản phẩm"
                    enterButton="Search"
                    size="large"
                    onSearch={(value) => handleSearch(value)}
                    style={{ width: '20%' }} // Đặt chiều rộng cho trường tìm kiếm
                />
            </div>

            <div style={{ display: 'flex', alignItems: 'Right', marginBottom: '10px', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'Right' }}>
                    <div style={{ marginRight: '10px', fontWeight: 'bold' }}>Trạng thái:</div>
                    <Radio.Group >
                        <Radio value="" >Tất cả</Radio>
                        <Radio value="NGUNG">Sắp diễn ra</Radio>
                        <Radio value="DANG_BAN">Đang diễn ra</Radio>
                       
                        <Radio value="NGUNG">Đã kết thúc</Radio>
                    </Radio.Group>
                </div>
                <div>
                <Button type="primary" onClick={handleAddClick}>
                        Thêm Phiếu giảm giá
                    </Button>
                </div> 
             </div>
             </div>
                <div>
    
                    <Table
                        columns={columns}
                        dataSource={searchResults}
                        loading={loading}
                        pagination={{ pageSize: 5 }}
                        key={resetTable ? 'reset' : 'table'}
                        style={{ margin: '10px' }} />
                </div>
            </div>
        </div>
    );
}









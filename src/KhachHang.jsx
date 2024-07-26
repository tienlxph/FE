
import React, { useEffect, useState, useRef } from 'react';
import { Input, Table, Button, message, Tag, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import axios from 'axios';
import ModalA from './ModalA';
import ModalD from './ModalD';
import ModalU from './ModalU';
import { useNavigate } from 'react-router-dom';


const { Search } = Input;


export default function KhachHang() {
    const searchInput = useRef(null);
    const [products, setproducts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [resetTable, setResetTable] = useState(false);
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
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('');
        setResetTable(true);
    };
    const getStatusProps = (status) => {
        switch (status) {
            case 'HOẠTĐỘNG':
                return { color: 'blue', text: 'Hoạt động' };
            case 'KHÔNGHOẠTĐỘNG':
                return { color: 'red', text: 'Không hoạt động' };
            default:
                return { color: 'gray', text: 'Chưa xác định' };
        }
    };
    const getadress = (status) => {
        switch (status) {
            case 'HàGiang':
                return { text: 'Hà Giang' };
            case 'HàNội':
                return { text: 'Hà Nội' };
            default:
                return { color: 'gray', text: 'Chưa xác định' };
        }
    };
    const handleAddClick = () => {
        navigate('/KhachHang/add');
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
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'so_dien_thoai',
            key: 'so_dien_thoai',
            ...getColumnSearchProps('so_dien_thoai'),
        },


        {
            title: 'Tên Đầy Đủ',
            dataIndex: 'ten_day_du',
            key: 'ten_day_du',
        },

        // {
        //     title: 'Tài Khoản ',
        //     dataIndex: 'tai_khoan',
        //     key: 'tai_khoan',

        // },


        // {
        //     title: 'Mật Khẩu',
        //     dataIndex: 'mat_khau',
        //     key: 'mat_khau',
        // },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: 'Ngày Sinh',
            dataIndex: 'ngay_sinh',
            key: 'ngay_sinh',
        },

        {
            title: 'Giới Tính',
            dataIndex: 'gioi_tinh',
            key: 'gioi_tinh',
        },
        // {
        //     title: 'Địa Chỉ',
        //     dataIndex: 'dia_chi',
        //     key: 'dia_chi',
        //     filters: [
        //         { text: 'Hà Nội', value: 'HàNội' },
        //         { text: 'Hà Giang', value: 'HàGiang' },
        //     ],
        //     onFilter: (value, record) => record.dia_chia === value,
        //     render: (text) => {
        //         const { color, text: statusText } = getadress(text);
        //         return <Tag color={color}>{statusText}</Tag>;
        //     },
        // },
        {
            title: 'Địa Chỉ',
            dataIndex: 'dia_chi',
            key: 'dia_chi',
        },
        {

            title: 'Trạng thái',
            dataIndex: 'trang_thai',
            key: 'trang_thai',
            filters: [
                { text: 'Hoạt Động', value: 'HOẠTĐỘNG' },
                { text: 'Không Hoạt Động', value: 'KHÔNGHOẠTĐỘNG' },
            ],
            onFilter: (value, record) => record.trang_thai === value,
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
                <ModalU recordId={record.id} onActionSuccess={reloadproducts} />
                <ModalD recordId={record.id} onActionSuccess={reloadproducts} />
            </div>

        },
    ];

    useEffect(() => {
        loadproducts();
    }, [resetTable]);

    const loadproducts = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8080/kh/hien-thi');
            setproducts(result.data);
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error loading products:', error);
        } finally {
            setLoading(false);
        }

        setResetTable(false);
    };
    const reloadproducts = async () => {
        try {
            setLoading(true);
            const result = await axios.get('http://localhost:8080/kh/hien-thi');
            setproducts(result.data);
            setSearchResults(result.data);
        } catch (error) {
            console.error('Error reloading products:', error);
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

                    <div>
                        <Button type="primary" onClick={handleAddClick}>
                            Thêm Khách Hàng
                        </Button>
                    </div>



                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Search
                        placeholder="Tìm kiếm Khách Hàng"
                        enterButton="Search"
                        size="large"
                        onSearch={(value) => handleSearch(value)}
                        style={{ width: '30%' }} // Đặt chiều rộng cho trường tìm kiếm
                    />
                </div>
                <div>
                    <h3>Danh Sách Khách Hàng</h3>
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

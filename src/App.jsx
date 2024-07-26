import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import PhieuGiamGia from './PhieuGiamGia';
import MenuAdmin from './Menu';
import ModalA from './ModalA';
const breadcrumbNameMap = {
  '/PhieuGiamGia': 'Phiếu giảm giá',
  '/phieuGiamGia/add': 'Phiếu giảm giá',
  '/productsize': 'Kích thước sản phẩm',
  '/promotions': 'Khuyến mãi',
  '/PhieuGiamGia': 'Phiếu giảm giá',
  '/stafs': 'Nhân viên',
  '/orders': 'Đơn hàng',
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>
        <Link to="">Trang Chủ</Link>
      </Breadcrumb.Item>
      {pathnames.map((_, index) => {
        const url = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Breadcrumb.Item key={url}>
            {breadcrumbNameMap[url] || pathnames[pathnames.length - 1]}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{breadcrumbNameMap[url] || pathnames[index]}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

const App = () => {
  // return (
  //   <BrowserRouter>
  //     <div style={{ display: 'flex' }}>
  //       <div style={{ width: '246px', backgroundColor: '#f0f0f0' }}>
  //         <MenuAdmin />
  //       </div>
  //       <div style={{ flex: '1', padding: '20px' }}>
  //         <Routes>
  //           <Route path="/phieuGiamGia" element={<PhieuGiamGia />} />
  //         </Routes>
  //       </div>
  //     </div>
  //   </BrowserRouter>
  // );
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '246px', backgroundColor: '#f0f0f0' }}>
          <MenuAdmin />
        </div>
        <div style={{ flex: '1', padding: '20px' }}>
          <Breadcrumbs />
          <Routes>
            {/* <Route path="/" element={<MenuAdmin />} /> */}
            {/* <Route path="/products" element={<Product />} />
            <Route path="/products/add" element={<AddMaterialPage />} />
            <Route path="/productsize" element={<UpSize />} />
            <Route path="/promotions" element={<Promotion />} /> */}
             <Route path="/phieuGiamGia/add" element={<ModalA />} />
            <Route path="/PhieuGiamGia" element={<PhieuGiamGia />} />
            {/* <Route path="/stafs" element={<Staf />} />
            <Route path="/orders" element={<Order />} /> */}
          </Routes>
        </div>
      </div>
    </Router>)
};

export default App;

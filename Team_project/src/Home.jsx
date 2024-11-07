import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchUserProducts,
  updateProduct,
} from "../feature/product/productSlice"; // Import your fetchUserProducts thunk
import {
  Card,
  Button,
  Badge,
  Modal,
  Descriptions,
  Tag,
  Avatar,
  Carousel,
  message,
  Spin,
  Breadcrumb,
} from "antd";
import EditProduct from "../component/EditProduct";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import DeleteProduct from "../component/DeleteProduct";
import Navbar from "../component/Navbar";

const navigation = [
  { name: "Dashboard", href: "/home", current: true },
  { name: "Add Product", href: "/AddProduct", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { confirm } = Modal;

  const { products, loading, error } = useSelector((state) => state.product);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product); // Set the selected product for editing
    setIsModalVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setIsModalVisible(false); // Hide the modal
    setSelectedProduct(null); // Clear the selected product
  };

  const userEmail = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail"); // Clear user email on logout
    navigate("/login");
  };

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchUserProducts(userEmail));
    }
  }, [dispatch, userEmail]);

  const handleUpdate = (updatedProduct) => {
    dispatch(
      updateProduct({
        productId: updatedProduct.id,
        updatedData: { ...updatedProduct },
      })
    ).then(() => {
      dispatch(fetchUserProducts(userEmail)); // Re-fetch to ensure updated data is shown
    });
  };

  const handleDelete = (product) => {
    confirm({
      title: "Are you sure you want to delete this product?",
      icon: <ExclamationCircleOutlined />,
      content: <DeleteProduct product={product} />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("hiiiiiiiii\n\n\n\n");
        dispatch(deleteProduct(product.id));
      },
    });
  };

  return (
    <>
    <Navbar ></Navbar>
      {/* <Disclosure as="nav" className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <Menu.Items
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : "text-gray-700"
                        }`}
                      >
                        Your Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : "text-gray-700"
                        }`}
                      >
                        Settings
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          active ? "bg-gray-100" : "text-gray-700"
                        }`}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link} // Use Link for internal navigation
                to={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure> */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">Dashboard</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Spin spinning={loading}>
            {error && <p className="text-red-500">{error}</p>}{" "}
            {/* Show error message */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Map over products and create a card for each */}
              {!loading &&
                !error &&
                products?.map((product, i) => (
                  <Badge.Ribbon text={product.condition} key={i}>
                    <Card
                      key={product.id}
                      hoverable
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      cover={
                        <Carousel
                          autoplay={hoveredProductId === product.id}
                          autoplaySpeed={2000}
                        >
                          {product?.images?.map((image, index) => (
                            <img
                              key={index}
                              alt={product.imageAlt}
                              src={image}
                              className="h-64 object-cover object-center"
                            />
                          ))}
                        </Carousel>
                      }
                      actions={[
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </Button>,
                        <Button
                          type="link"
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(product)}
                          danger
                        >
                          Delete
                        </Button>,
                      ]}
                      className="shadow-md" // Optional: adds a shadow for a subtle depth effect
                    >
                      <Card.Meta
                        title={
                          <Link
                            to={`/product/${product.id}`}
                            className="text-lg font-medium text-gray-800"
                          >
                            {product.name}
                          </Link>
                        }
                        description={
                          <Descriptions
                            column={1}
                            size="small"
                            bordered={false}
                          >
                            {/* Discount Tag */}
                            {/* <Descriptions.Item label="">
                            <Tag color="red" style={{ fontSize: "0.85em" }}>
                              0% OFF
                            </Tag>
                          </Descriptions.Item> */}

                            {/* Color Circles */}
                            <Descriptions.Item label="">
                              <div style={{ display: "flex", gap: "5px" }}>
                                {product?.color?.map((col) => (
                                  <Avatar
                                    key={col}
                                    shape="circle"
                                    style={{ backgroundColor: col }}
                                    size={18}
                                  />
                                ))}
                              </div>
                            </Descriptions.Item>

                            {/* Price with Badge */}
                            <Descriptions.Item label="">
                              <span className="text-lg font-semibold text-gray-900">
                                ${product.price}
                              </span>
                            </Descriptions.Item>
                          </Descriptions>
                        }
                      />
                    </Card>
                  </Badge.Ribbon>
                ))}
            </div>
          </Spin>
        </div>

        {/* Edit Product Modal */}
        {selectedProduct && (
          <EditProduct
            open={isModalVisible}
            onClose={handleModalClose}
            onUpdate={handleUpdate}
            product={selectedProduct}
          />
        )}
      </main>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Descriptions, Tag, Avatar, Carousel, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../feature/product/productSlice"; // Assuming you have this action
import Navbar from "./Navbar";

const ProductDetail = () => {
  const { productId } = useParams(); // Get the product ID from the URL
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductById(productId)); // Fetch the product details
  }, [dispatch, productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">Dashboard</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{`Product_${product.id}`}</Breadcrumb.Item>
            </Breadcrumb>
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="container mx-auto p-6">
            <div className="flex justify-center my-8">
              <Card
                hoverable
                cover={
                  <Carousel autoplay>
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
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <Descriptions column={1} size="small" bordered={false}>
                      <Descriptions.Item label="Price">
                        ${product.price}
                      </Descriptions.Item>
                      <Descriptions.Item label="Color">
                        {/* <div style={{ display: "flex", gap: "5px" }}>
                          {product?.color?.map((col, index) => (
                            <Avatar
                              key={index}
                              shape="circle"
                              style={{ backgroundColor: col }}
                              size={18}
                            />
                          ))}
                        </div> */}
                      </Descriptions.Item>
                      <Descriptions.Item label="Condition">
                        <Tag color="blue">{product.condition}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Description">
                        {product.description}
                      </Descriptions.Item>
                    </Descriptions>
                  }
                />
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;

import { Card, Descriptions, Image } from "antd";

const DeleteProduct = ({ product }) => (    
  <Card bordered={false} style={{ textAlign: "center" }}>
    <Image
      src={product?.images}
      alt={product?.imageAlt}
      width={100}
      style={{ marginBottom: "10px" }}
    />
    <Descriptions column={1} size="small" bordered>
      <Descriptions.Item label="Product ID">{product?.id}</Descriptions.Item>
      <Descriptions.Item label="Name">{product?.name}</Descriptions.Item>
      <Descriptions.Item label="Price">{product?.price}</Descriptions.Item>
      <Descriptions.Item label="Condition">{product?.condition}</Descriptions.Item>
    </Descriptions>
    <p>This action cannot be undone.</p>
  </Card>
);

export default DeleteProduct;

// ProductList.js
import React from 'react';

const products = [
  {
    id: 1,
    name: 'Nike Air Max 270',
    href: '/product/nike-air-max-270',
    images: [
      'https://images.unsplash.com/photo-1590488372024-d1b2e5cc5c07?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
      'https://images.unsplash.com/photo-1590488372358-22609f8a3028?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    ],
    imageAlt: "Nike Air Max 270 in black and white.",
    price: '$150',
    color: ['Black', 'White'],
    sizes: ['7', '8', '9', '10'],
    type: 'Men',
    condition: 'New',
    category: 'Sneakers',
    description: "The Nike Air Max 270 features a sleek design with a large air unit for comfort and style. Perfect for everyday wear or casual outings."
  },
  {
    id: 2,
    name: 'Adidas Ultraboost 21',
    href: '/product/adidas-ultraboost-21',
    images: [
      'https://images.unsplash.com/photo-1590488371770-046672d2d3f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
      'https://images.unsplash.com/photo-1590488372033-bba83f29a7ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
    ],
    imageAlt: "Adidas Ultraboost 21 in blue.",
    price: '$180',
    color: ['Blue', 'Black'],
    sizes: ['6', '7', '8', '9', '10', '11'],
    type: 'Women',
    condition: 'New',
    category: 'Sport Shoes',
    description: "The Adidas Ultraboost 21 is designed for superior comfort and energy return, making it ideal for running and everyday activities."
  },
];

const ProductList = () => {
  return (
      <div className="bg-white">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={product.imageAlt}
                  src={product.images[0]} // Use the first image from the images array
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Color: {product.color.join(', ')}
                  </p>
                  {/* <p className="mt-1 text-sm text-gray-500">
                    Sizes: {product.sizes.join(', ')}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Type: {product.type}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Condition: {product.condition}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Category: {product.category}
                  </p> */}
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default ProductList;

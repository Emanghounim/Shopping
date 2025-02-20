// import React from 'react';
// import ProductsApis from './ProductsApi';
// import './Products.css'; // ملف CSS مخصص

// export default function Products() {
//   let productItems = ProductsApis.map((elm) => {
//     const shortDescription = elm.description.split(' ').slice(0, 6).join(' ') +  '...';
//     const shortTitle = elm.title.split(' ').slice(0, 3).join(' ') +  '...';

//     return (
//       <div className="col-md-4 d-flex justify-content-center align-items-stretch" key={elm.id}>
//         <div className="card product-card p-3">
//           <img src={elm.image} alt={elm.title} className="product-image mx-auto" />
//           <p className="text-center fw-bold">{shortTitle}</p>
//           <p className="text-center">{shortDescription}</p>
//           <p className="text-center fw-bolder">{elm.category}</p>
//           <p className="text-center  "> Price: {elm.price}</p>
//           <button className='btn btn-info'>add to cart</button>
//         </div>
//       </div>
//     );
//   });

//   return (
//     <>
//       <div className="container mt-2">
//         <div className="row gy-1">{productItems}</div>
//       </div>
//     </>
//   );
// }

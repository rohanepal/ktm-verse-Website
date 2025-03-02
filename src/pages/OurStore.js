import React, { useEffect, useState } from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Meta from '../components/Meta';
import ReactStars from "react-rating-stars-component";
import Color from "../components/Color";
import ProductCard from "../components/ProductCard";
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../features/products/productSlice';



const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state?.product?.product)
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])

// filter states
const [category, setCategory] = useState(null)
const [tag, setTag] = useState(null)
const [brand, setBrand] = useState(null)
const [minPrice, setMinPrice] = useState(null)
const [maxPrice, setMaxPrice] = useState(null)
const [sort, setSort] = useState(null)

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];
    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element?.brand)
      category.push(element?.category)
      newTags.push(element?.tags)
    }
    setBrands(newBrands)
    setCategories(category)
    setTags(newTags)
  },[productState])

  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, [sort,tag,brand,category,minPrice,maxPrice]);
  const getProducts = () => {
    dispatch(getAllProducts({sort,tag,brand,category,minPrice,maxPrice}));
  };
  
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className='row'>

          <div className='col-3'>
            
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                <li
                    className={!category ? "selected" : ""}
                    onClick={() => setCategory(null)}
                  >
                    All
                  </li>
                  {categories &&
                    [...new Set(categories)].map((item, index) => (
                      <li
                        key={index}
                        className={category === item ? "selected" : ""}
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>


            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div className="mt-4 mb-3">
                <h3 className="sub-title">Price</h3>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e)=>setMinPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e)=>setMaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
              </div>
              <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  <span
                    className={!tag ? "selected" : ""}
                    onClick={() => setTag(null)}
                  >
                    All
                  </span>
                  {tags &&
                    [...new Set(tags)].map((item, index) => (
                      <span
                        key={index}
                        className={tag === item ? "selected" : ""}
                        onClick={() => setTag(item)}
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
            </div>

            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  <span
                    className={!brand ? "selected" : ""}
                    onClick={() => setBrand(null)}
                  >
                    All
                  </span>
                  {brands &&
                    [...new Set(brands)].map((item, index) => (
                      <span
                        key={index}
                        className={brand === item ? "selected" : ""}
                        onClick={() => setBrand(item)}
                      >
                        {item}
                      </span>
                    ))}
                </div>
              </div>
            </div>


            </div>
            
           
            {/* <div className="filter-card mb-3">
              <h3 className="filter-title">Random Product</h3>
              <div>
                <div className="random-products d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>NRs. 5000.00</b>
                  </div>
                </div>
              </div>
            </div> */}
          </div>




          
          <div className='col-9'>
            <div className='filter-sort-grid mb-4'>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manula"}
                    className="form-control form-select"
                    id=""
                    onChange={(e)=>setSort(e.target.value)}
                  >
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="-title"> Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  {/* <p className="totalproducts mb-0">21 Products</p> */}

                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    {/* <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    /> */}
                    {/* <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    /> */}
                  </div>

                </div>
              </div>

            </div>

            <div className='products-list pb-5'>
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard
                  data={productState?productState:[]}
                  grid={grid}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore
import { useEffect, useState } from "react"
import TableMap from "../Component/TableMap/TableMap";
import "./ProductsPage.css"
import Filter from "../Component/SortFilter/Filter";
import Sort from "../Component/SortFilter/Sort";
import { GrPowerReset } from 'react-icons/gr';

function ProductsPage() {

  const [totaldata, setTotaldata] = useState([])
  const [showdata, setShowData] = useState([])
  const [filterbyCatagory, setFilterbyCatagory] = useState("")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")


  //_____________Search Function_________________________________//
  async function handleSearch() {
    if (query == "") {
      reset()
      return;
    }
    setSort("")
    setFilterbyCatagory("")
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${query}`
    );
    const data = await res.json();
    setShowData(() => data.products)
    setTotaldata(() => data.products)

  }



  //_____________Get all products data at ones________________________//
  const getCardData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=100`
    );
    const data = await res.json();
    setTotaldata(data.products);
    setShowData(data.products.slice(0, 20))
    setPage(1)
  };




  //_______________________Infinite Scrolling Logic_________________________//
  const handelInfiniteScroll = async () => {
    try {
      console.log(window.innerHeight + document.documentElement.scrollTop + 1 >= (document.documentElement.scrollHeight))
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >= (document.documentElement.scrollHeight) &&
        page <= 4 &&
        filterbyCatagory == "" &&
        query == ""
      ) {
        setPage(page + 1)
        setShowData((prev) => totaldata.slice((page + 1) * 20 - 20, (page + 1) * 20))
        window.scrollTo(0, document.documentElement.scrollHeight * 0.01)
      }

      if (window.scrollY == 0 && page >= 2 && filterbyCatagory == "" && query == "") {
        setPage(page - 1)
        setShowData((prev) => totaldata.slice((page - 1) * 20 - 20, (page - 1) * 20))
        let maxScrollY = document.documentElement.scrollHeight - document.documentElement.clientHeight
        let table = document.getElementById("scrollTable")
        window.scrollTo(0, maxScrollY*0.9)
      }


    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCardData();
  }, []);


  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, [showdata]);



  //________________ Reset function __________________________//
  function reset() {
    setSort("")
    setFilterbyCatagory("")
    setQuery("")
    getCardData()
  }



  return (

    /*__________________Header_______________________________________________________*/
    <div style={{ marginBottom: "100px" }}>
      <div className="sortfiltersearch">
        <div>
          <h1 >Products Page</h1>
        </div>

        <div style={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
          <div className="sortfilter" >
            <div><Filter setFilterbyCatagory={setFilterbyCatagory} totaldata={totaldata} setShowData={setShowData}
              filterbyCatagory={filterbyCatagory} />
            </div>

            <div> <Sort setPage={setPage}
              filterbyCatagory={filterbyCatagory}
              page={page} totaldata={totaldata}
              setTotaldata={setTotaldata}
              setShowData={setShowData}
              showdata={showdata}
              sort={sort}
              setSort={setSort}
            /></div>


            <div className="reset" onClick={reset}>
              <GrPowerReset style={{ color: "#0CAADA" }} /> <h4>Reset</h4>
            </div>
          </div>

          <div className="search"> <input type="text" value={query} placeholder="Search..." onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>



     { /*__________________Table_______________________________________________________*/}

      <div style={{ marginTop: '140px' }}>
        {<table style={{ marginTop: '140px', paddingBottom: '100px' }} id="scrollTable">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Reviews</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {
              showdata.length > 0 && showdata.map((el, i) => (
                <TableMap {...el} key={i} />
              ))
            }
          </tbody>

        </table>}
      </div>



    </div>
  );
}

export default ProductsPage;




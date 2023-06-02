

function Sort({ setPage, page, totaldata, setShowData, setTotaldata, filterbyCatagory, sort, setSort }) {



    function HandleSort(e) {

        if (e.target.value == "htl") {
            totaldata = totaldata.sort(function (a, b) {
                return b.price - a.price
            })
        } else if (e.target.value == "lth") {
            totaldata = totaldata.sort(function (a, b) {
                return a.price - b.price
            })
        }
        let sortData = totaldata

        if (filterbyCatagory != "") {
            sortData = sortData.filter((el) => {
                return el.category === filterbyCatagory
            })
        }

        setTotaldata(totaldata)
        setShowData(sortData.slice(0, 20))
        setPage(1)
    }

    return (
        <>
            <select value={sort} onChange={prev => {
                setSort(prev.target.value)
                HandleSort(prev)
            }}>
                <option value="" >Sort</option>
                <option value="htl">High To Low</option>
                <option value="lth">Low To High</option>
            </select>
        </>
    )
}

export default Sort
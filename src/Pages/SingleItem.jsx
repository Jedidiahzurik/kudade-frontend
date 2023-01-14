import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'


const SingleItem = ({token, setProduct}) => {
    const[offSet, setOffSet] = useState(1)
    const[limit, setLimit] = useState(20)
    const[itemList, setItemList] = useState(null)
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        console.log({offSet, limit})
        fetch(`http://localhost:8181/order_items?offset=${offSet}&limit=${limit}`,{
            method: 'GET',
            headers: {
                "x-auth-token": token.token,
                "Content-type": "application/json;charset=UTF-8"
            }
        }).then(res => res.json()).then((data) => {
            setLoading(false)
            console.log(data)
            setItemList(data.data)

            console.log(itemList)
        }).catch(err => {console.log(err)
        setError(true)})
    },[offSet, limit])


    return ( <div> {itemList !== null && itemList.map((el,i) =>
        <Item item={el} key={el.id} setProduct={setProduct}/>
    )} 
                {loading && <h2>Loading</h2>}
                {error && <h2>Check username/password</h2>}
            <div className="limit m-4 px-3">
                <p className='text-light'>Limit of pages</p>
                <select className='foem-select' name="" id="" value={limit} onChange={(e) => setLimit(e.target.value)}>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
    </div> );
}

const Item = ({item, setProduct}) => {
    return(
        <div className="card item text-light border-1 border-light m-4 px-3" onClick={() => setProduct(item)}>
            <Link to={`/edit`}>
                <h1>{item.product_category}</h1>
                <p>{item.price}</p>
                <p>{item.date}</p>
            </Link>
        </div>
    )
}
 
export default SingleItem;
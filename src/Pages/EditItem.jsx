import { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'

const EditItem = ({token, product}) => {

    const[category, setCategory] = useState(product.product_category)
    const[price, setPrice] = useState(product.price)
    const [editMode, setEditMode] = useState(false)
    const [msg, setMsg] = useState(null)
    const history = useHistory()

    // useEffect(() => {
    //     fetch(`https://localhost:8181/order_items/${id}`,{
    //         method: 'GET',
    //         headers: {
    //             "x-auth-token": token.token,
    //             "Content-type": "application/json;charset=UTF-8"
    //         }}).then(res => res.json()).then((data) => {
    //             console.log(data)
    //             // setItemList(data.data)
    
    //             // console.log(itemList)
    //         }).catch(err => console.log(err))
    // }, [])

    function removeOrder(){
        if(!window.confirm('Are you sure you want to delete')){
            return;
        }

        fetch(`http://localhost:8181/order_items/${product.id}`, {
            method: 'DELETE',
            headers:{
                "x-auth-token": token.token
            }
        }).then(res => res.json()).then(data => {
            console.log(data)
            setMsg(data)
            setTimeout(() => {
                history.goBack()
            },1000)
        }).catch(err => console.log(err))
    }
    return ( <>
                <div className="product my-5 mx-4 px-3">
                    <h1>{category}</h1>
                    <h2 className="text-light">{price}</h2>
                    <div className="details row d-flex flex-wrap my-3 mx-2 px-3" >
                        <p className="col-4 text-light">{product.id}</p>
                        <p className="col-4 text-light">{product.date}</p>
                        <p className="col-4 text-light">{product.product_id}</p>
                    </div>
                    <div className="buttons">
                        <button className="btn btn-success mx-3" onClick={() => setEditMode(!editMode)}>Edit</button>
                        <button className="btn btn-danger mx-3" onClick={removeOrder}>Delete</button>
                    </div>
                </div>
                {editMode && <div className="inputs px-3 m-4">
                    <input type="text" className="form-control m-4" value={category} onChange={(e) => setCategory(e.target.value)}/>
                    <input type="text" className="form-control m-4" value={price} onChange={(e) => setPrice(e.target.value)}/>
                    <button className="btn btn-primary">Save Changes</button>
                </div>}
                {msg && <div className="message"><h1>{msg.msg}</h1></div>}
            </> );
}
 
export default EditItem;
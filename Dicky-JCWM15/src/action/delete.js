import Axios from "axios";
import { api_url } from "../helpers/api_url";

export const deleteTableAction = (id) =>{
    return(dispatch) =>{
        Axios.delete(`${api_url}/user/${id}`)
        .then((res) =>{
            alert("data terhapus");
            dispatch(id)
        })
        .catch((err) =>{
            console.log(err)
        })
    }
}
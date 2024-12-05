import AdminSideBar from "../../components/AdminSideBar";
import AdminHome from "../../components/AdminHome";


export default function Administration(){
    return(
        <>
            <div className="row mt-3">
                <div className="col-2 sidebar" style={{backgroundColor: '#f8f9fa', height: '100vh'}}>
                    <AdminSideBar/>
                </div>
                <div className="col-10">
                    <AdminHome/>
                </div>
            </div>
            
        </>
    )
}
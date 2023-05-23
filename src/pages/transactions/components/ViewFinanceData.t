import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Table from "./Table";
//import { UseTransactionContext } from "../../contexts/Transactioncontext";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from "../../../redux/slices/transactionsSlice";
import { Cookies, useCookies } from 'react-cookie';
import { RootState } from "../../../redux/store";


const ViewFinanceData = () => {

   //const transactionvalue = useSelector((state) => state.transaction.value);
   const transactionvalue = useSelector((state:RootState) => state.rootReducer.transactions);
   const [grouped, setGrouped] = useState({});
   const [selected, setselected] = useState(null);
   const [mainData, setMaindata] = useState([]);

   

   console.log("dddddd",transactionvalue);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const cookie=new Cookies();
    const handleLogout = () => {
       // Cookies.remove("auth-token");
       cookie.remove("auth-token");
        navigate("/login");
    }

    const handleDelete = (id) => {
        let updatedData = [];
        if (id) {
            if (!selected) {
                // updatedData = transactionvalue.filter(obj => obj.id != id);
                // setMaindata(updatedData);
                dispatch(deleteTransaction(id));
                setMaindata(transactionvalue);
            } else {
                Object.keys(grouped).forEach((groupByColumn) => {
                    updatedData = updatedData.concat(
                        grouped[groupByColumn].filter((item) => item.id !== id)
                    );
                });
                setGrouped((prevGrouped) => {
                    const newGrouped = {};
                    Object.keys(prevGrouped).forEach((groupByColumn) => {
                        newGrouped[groupByColumn] = prevGrouped[groupByColumn].filter(
                            (item) => item.id !== id
                        );
                    });
                    return newGrouped;
                });
                setMaindata(updatedData);

            }
        } else {
            updatedData = [...mainData];
        }
        dispatch(deleteTransaction(id));
        setMaindata(transactionvalue);
        
    };

    
    useEffect(() => {
        setMaindata(transactionvalue)
    }, [transactionvalue])


  

    const handleGroupBy = (selectedValues) => {
        if (!selectedValues) {
            setGrouped({});
            return;
        }
        setselected(selectedValues);
        const copyData = [...mainData];
        const groupedData = copyData.reduce((acctual, currunt) => {
            if (!acctual[currunt[selectedValues]]) {
                acctual[currunt[selectedValues]] = [];
            }
            acctual[currunt[selectedValues]].push(currunt);
            return acctual;
        }, {})
        setGrouped(groupedData);
    }

    return (
        <>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    {/* <a className="navbar-brand" href="#">Finance tracker</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/form" className="nav-item nav-link active">Add Transaction</Link>
                            <button type="button" className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </nav>
                <div className="form-group row">
                    <div className="col-sm-10 ser">
                        <label  className="col-sm-2 col-form-label search">Group by:</label>
                        <select
                            id="selectg"
                            className="form-control"
                            name="selectedValues"
                            onChange={(e) => handleGroupBy(e.target.value)}
                        >
                            <option value="none">None</option>
                            <option value="transactionType">Transaction Type</option>
                            <option value="monthyear">Month Year</option>
                            <option value="fromAccount">From Account</option>
                            <option value="toAccount">To account</option>
                        </select>
                    </div>
                </div>

                <div className='main'>
                    {Object.keys(grouped).length > 0 ?
                        Object.keys(grouped).map((groupByColumn) =>
                            <div key={groupByColumn}>
                                <h3>{groupByColumn}</h3>
                                <Table data={grouped[groupByColumn]} handleDelete={handleDelete} />
                            </div>
                        )
                        : <Table data={mainData} handleDelete={handleDelete} />}

                </div>
            </div>
        </>

    )
}

export default ViewFinanceData;
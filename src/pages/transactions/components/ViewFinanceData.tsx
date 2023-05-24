import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Table from "./Table";
//import { UseTransactionContext } from "../../contexts/Transactioncontext";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction } from "../../../redux/slices/transactionsSlice";
import { Cookies, useCookies } from 'react-cookie';
import { RootState } from "../../../redux/store";
import { TransactionTypes } from "../../../model";


const ViewFinanceData: React.FC = () => {

    const transactionvalue = useSelector((state: RootState) => state.rootReducer.transaction);
    const [grouped, setGrouped] = useState<any>({});
    const [selected, setSelected] = useState<string | null>(null);
    const [mainData, setMaindata] = useState<TransactionTypes[]>([]);

    //console.log("dddddd", transactionvalue);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cookie = new Cookies();

    const handleLogout = () => {
        // Cookies.remove("auth-token");
        cookie.remove("auth-token");
        navigate("/login");
    }

    const handleDelete = (id: number) => {
        let updatedData: TransactionTypes[] = [];
        if (id) {
            if (!selected) {
                dispatch(deleteTransaction(id));
                setMaindata(transactionvalue.value);
            } else {
                Object.keys(grouped).forEach((groupByColumn) => {
                    updatedData = updatedData.concat(
                        grouped[groupByColumn].filter((item:any) => item.id !== id)
                    );
                });
                setGrouped((prevGrouped:any) => {
                    const newGrouped = { ...prevGrouped };
                    Object.keys(prevGrouped).forEach((groupByColumn) => {
                        newGrouped[groupByColumn] = prevGrouped[groupByColumn].filter(
                            (item:any) => item.id !== id
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
        setMaindata(transactionvalue.value);

    };


    useEffect(() => {
        setMaindata(transactionvalue.value)
    }, [transactionvalue.value])

    const handleGroupBy = (selectedValues: keyof TransactionTypes): void => {
        if (!selectedValues) {
            setGrouped({});
            return;
        }
        setSelected(selectedValues);
        const copyData: TransactionTypes[] = [...mainData];
        console.log(copyData);
        const groupedData: any= copyData.reduce(
            (acc, curr) => {
                const key = curr[selectedValues] as string;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(curr);
                return acc;
            },
            {} as any
        );
        setGrouped(groupedData);
    };

    return (
        <>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/form" className="nav-item nav-link active">Add Transaction</Link>
                            <button type="button" className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </nav>
                <div className="form-group row">
                    <div className="col-sm-10 ser">
                        <label className="col-sm-2 col-form-label search">Group by:</label>
                        <select
                            id="selectg"
                            className="form-control"
                            name="selectedValues"
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                                handleGroupBy(e.target.value as keyof TransactionTypes)
                            }
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
                        : <Table data={mainData} handleDelete={handleDelete} />
                    }

                </div>
            </div>
        </>

    )
}

export default ViewFinanceData;
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import {
  monthYearOptions,
  transactionTypeOptions,
  toaccountOptions,
  fromaccountOptions,
} from "../../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addTransaction, editTransaction } from "../../../redux/slices/transactionsSlice";
import { InputFields } from "../../../components/InputFields";
import { Selectfields } from "../../../components/Selectfields";
import { RootState } from "../../../redux/store";
import { TransactionTypes } from "../../../model";


const schema = yup.object().shape({
  Transactiondate: yup.string().required("Transactiondate is required"),
  monthyear: yup.string().required("monthyear is required"),
  transactionType: yup.string().required("transactionType is required"),
  fromAccount: yup
    .string()
    .required("FromAccount is required")
    .oneOf(
      [
        "personal-account",
        "real-living",
        "my-dream-home",
        "full-circle",
        "core-realors",
        "big-block",
      ],
      "FromAccount is required"
    ),
  toAccount: yup
    .string()
    .required("ToAccount is required")
    .oneOf(
      [
        "personal-account",
        "real-living",
        "my-dream-home",
        "full-circle",
        "core-realors",
        "big-block",
      ],
      "ToAccount is required"
    )
    .notOneOf(
      [yup.ref("fromAccount")],
      "The 'To Account' and 'From Account' fields cannot have the same value"
    ),
  amount: yup.number().typeError("amount is required").required("amount is required").min(1),
  image: yup
    .mixed()
    .test("required", "file is required", (value: any) => {
      if (typeof value === "string") return true;
      return value && value.length > 0;
    })
    .test(
      "fileType",
      "Only JPG, JPEG and PNG images are allowed",
      (value: any) => {
        if (typeof value === "string" && value.startsWith("data:image")) return true;
        if (value && value[0] && /^image\/(jpe?g|png)/.test(value[0].type)) return true;
        return false;
      }
    )
    .test("fileSize", "Image must be less than 1 MB", (value: any) => {
      if (typeof value === "string" && value.startsWith("data:image")) return true;
      if (value && value[0] && value[0].size <= 1048576) return true;
      return false;
    }),
  notes: yup.string().required("notes is required"),
});


const FinanceForm: React.FC = () => {
  //const transactionredux = useSelector((state) => state.transaction.value);
  const transactionredux = useSelector((state: RootState) => state.rootReducer.transaction);

  //console.log("TRAAA", transactionredux);
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setformData] = useState<any>({
    Transactiondate: "",
    monthyear: "",
    transactionType: "",
    fromAccount: "",
    toAccount: "",
    amount: "",
    image: "",
    notes: "",
  });

  const {
    register,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TransactionTypes>({
    resolver: yupResolver(schema),
  });


  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
      if (file.type.includes("image")) {
        const result = readerEvent.target?.result as string;
        setImagePreview(result);
      }
      setError("image", {
        type: "manual",
        message: "",
      });
    };

    // } else {
    //   setImagePreview("");
    // }
  };

  const getBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const generateId = () => {
    const existingData = transactionredux;
    return existingData.value.length + 1;
  };

  const removefile = () => {
    setImagePreview(null);
    setValue("image", "");
  };

  const onSubmit = async (data: any) => {
    //console.log(data,"sss");
    const imgIsBase64 = typeof data.image === "string";
    //console.log(data);
    if (!imgIsBase64) {
      const imgPath = await getBase64(data.image[0]);
      data.image = imgPath;
    }

    const val = { ...data };

    const newval = {
      ...formData,
      //id:val.id,
      Transactiondate: val.Transactiondate,
      transactionType: val.transactionType,
      monthyear: val.monthyear,
      fromAccount: val.fromAccount,
      toAccount: val.toAccount,
      amount: val.amount,
      image: val.image,
      notes: val.notes,
    };
    console.log("newvallll",newval);
    if (id) {
      const existingData = dispatch(editTransaction({ id: newval.id, val }));
      setformData(existingData);
      //console.log("sandhyaa", existingData)
      alert("Records updated successfully!!!");
      navigate("/viewdata");
    } else {
      newval.id = generateId();
      //console.log("nnn idd",newval.id);
      const existingData = dispatch(addTransaction(newval));
      console.log(existingData, "eeee")
      setformData(existingData);
      alert("Records inserted successfully!!!");
      navigate("/viewdata");
    }
  };

  useEffect(() => {
    if (!id) return;
    let matched = transactionredux.value.find((obj: any) => obj.id == id);
    setformData(matched);
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key as keyof  TransactionTypes, value as keyof TransactionTypes);
    });
    setImagePreview(formData.image);
  }, [formData, setValue]);

  return (
    <div>
      <div className="container">
        <h1>Add Transaction</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <InputFields
              type="date"
              name="Transactiondate"
              register={register}
              error={errors.Transactiondate}
              label="Transaction Date"
            />
          </div>
          <div>
            <Selectfields
              name="monthyear"
              options={monthYearOptions}
              register={register}
              error={errors.monthyear}
              label="Month year"
            />
          </div>

          <div>
            <Selectfields
              name="transactionType"
              options={transactionTypeOptions}
              register={register}
              error={errors.transactionType}
              label="Transaction type"
            />
          </div>

          <div>
            <Selectfields
              name="fromAccount"
              options={fromaccountOptions}
              register={register}
              error={errors.fromAccount}
              label="From Account"
            />
          </div>
          <div>
            <Selectfields
              name="toAccount"
              options={toaccountOptions}
              register={register}
              error={errors.toAccount}
              label="To Account"
            />
          </div>
          <div>
            <InputFields
              type="number"
              name="amount"
              register={register}
              error={errors.amount}
              label="Amount"
            />
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              Receipt
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className="form-control"
                // name="image"
                {...register("image")}
                onChange={handleImageChange}
                style={{ display: imagePreview ? "none" : "block" }}
              />
              {imagePreview && <div onClick={removefile}>remove</div>}
              {imagePreview && (
                <img src={imagePreview} style={{ width: "10%" }} />
              )}
              {errors.image && (
                <p style={{ color: "red" }}>{errors.image.message}</p>
              )}
            </div>
          </div>
          <div>
            <InputFields
              type="text"
              name="notes"
              register={register}
              error={errors.notes}
              label="Notes"
            />
          </div>
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FinanceForm;

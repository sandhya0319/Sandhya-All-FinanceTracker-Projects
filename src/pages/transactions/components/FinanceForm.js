import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm, errors } from "react-hook-form";
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
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../../../redux/slices/transactionsSilce";
import { InputFields } from "../../../components/InputFields";
import { Selectfields } from "../../../components/Selectfields";

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
  amount: yup
    .number()
    .typeError("amount is required")
    .required("amount is required")
    .min(1),
  image: yup
    .mixed()
    .test("required", "file is required", (value) => {
      if (value.length > 0) {
        return value;
      }
      return false;
    })
    .test("fileType", "Only JPG, JPEG and PNG images are allowed", (value) => {
      if (value && value[0] && /^image\/(jpe?g|png)/.test(value[0].type)) {
        return true;
      }

      if (typeof value === "string" && value.startsWith("data:image")) {
        return true;
      }
      return false;
    })
    .test("fileSize", "Image must be less than 1 MB", (value) => {
      if (value && value[0] && value[0].size <= 1048576) {
        return true;
      }
      if (typeof value === "string" && value.startsWith("data:image")) {
        return true;
      }
      return false;
    }),
  notes: yup.string().required("notes is required"),
});

const FinanceForm = () => {
  const transactionredux = useSelector((state) => state.transaction.value);

  console.log("TRAAA", transactionredux);
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setformData] = useState({
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setError("image", {
          type: "manual",
          message: "",
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview("");
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const generateId = () => {
    const existingData = transactionredux;
    return existingData.length + 1;
  };
  const removefile = () => {
    setImagePreview(null);
    setValue("image", "");
  };

  const onSubmit = async (data) => {
    const imgIsBase64 = typeof data.image === "string";
    console.log(data);
    if (!imgIsBase64) {
      const imgPath = await getBase64(data.image[0]);
      data.image = imgPath;
    }

    const val = { ...data };

    const newval = {
      ...formData,
      Transactiondate: val.Transactiondate,
      transactionType: val.transactionType,
      monthyear: val.monthyear,
      fromAccount: val.fromAccount,
      toAccount: val.toAccount,
      amount: val.amount,
      image: val.image,
      notes: val.notes,
    };
    if (id) {
      const existingData = dispatch(editTransaction({ id: newval.id, val }));
      setformData(existingData);
      //console.log("sandhyaa", existingData)
      alert("Records updated successfully!!!");
      navigate("/viewdata");
    } else {
      newval.id = generateId();
      const existingData = dispatch(addTransaction(newval));
      setformData(existingData);
      alert("Records inserted successfully!!!");
      navigate("/viewdata");
    }
  };

  useEffect(() => {
    if (!id) return;
    let matched = transactionredux.find((obj) => obj.id == id);
    setformData(matched);
    Object.entries(formData).forEach(([key, value]) => {
      setValue(key, value);
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
              className="form-control"
              placeholder="Transactiondate"
              name="Transactiondate"
              register={register}
              error={errors.Transactiondate}
              label="Transaction Date"
            />
          </div>
          <div>
            <Selectfields
              id="monthyear"
              name="monthyear"
              options={monthYearOptions}
              register={register}
              error={errors.monthyear}
              label="Month year"
            />
          </div>

          <div>
            <Selectfields
              id="transactionType"
              name="transactionType"
              options={transactionTypeOptions}
              register={register}
              error={errors.transactionType}
              label="Transaction type"
            />
          </div>

          <div>
            <Selectfields
              id="fromAccount"
              name="fromAccount"
              options={fromaccountOptions}
              register={register}
              error={errors.fromAccount}
              label="From Account"
            />
          </div>
          <div>
            <Selectfields
              id="toAccount"
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
              class="form-control"
              placeholder="Amount"
              name="amount"
              register={register}
              error={errors.amount}
              label="Amount"
            />
          </div>
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Receipt
            </label>
            <div class="col-sm-10">
              <input
                type="file"
                class="form-control"
                name="image"
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
              class="form-control"
              placeholder="Notes"
              name="notes"
              register={register}
              error={errors.notes}
              label="Notes"
            />
          </div>
          <div class="form-group row">
            <div class="col-sm-10">
              <button type="submit" class="btn btn-primary">
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

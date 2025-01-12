import { FunctionComponent, useCallback } from "react";
// material-ui
import MainCard from "components/cards/MainCard";
import { Typography } from "@mui/material";
import styled from "styled-components";
import BackendError from "exceptions/backend-error";
import { useNavigate } from "react-router";
import {
  setErrorMessage,
  setIsLoading,
  setSuccessMessage,
} from "store/customizationSlice";
import { useAppDispatch } from "../../../store/index";
import Form, { FormValues } from "../form";
import editEmployee from "services/employees/edit-employee";
import useEmployeeById from "./use-employee-by-id";
import useEmployeeId from "./use-employee-id";
import { FormikHelpers } from "formik";

const EditEmployee: FunctionComponent<Props> = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const employeeId = useEmployeeId();
  const employee = useEmployeeById(employeeId);

  const onSubmit = useCallback(
    async (
      values: any,
      { setErrors, setStatus, setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        dispatch(setIsLoading(true));
        setErrors({});
        setStatus({});
        setSubmitting(true);
        const formatedValues = {
          ...values,
          hospital: {
            name: values.hospital,
          },
        };
        delete formatedValues.submit;
        delete formatedValues.password;
        console.log(formatedValues)
        await editEmployee(employeeId!, formatedValues);
        navigate("/employees");
        dispatch(
          setSuccessMessage(`Empleado ${values.name} editado correctamente`)
        );
      } catch (error) {
        if (error instanceof BackendError) {
          setErrors({
            ...error.getFieldErrorsMessages(),
            submit: error.getMessage(),
          });
          dispatch(setErrorMessage(error.getMessage()));
        }
        setStatus({ success: false });
      } finally {
        setSubmitting(false);
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, navigate, employeeId]
  );

  return (
    <div className={className}>
      <MainCard>
        <Typography variant="h3" component="h3">
          Empleados
        </Typography>
      </MainCard>
      {employee && (
        <Form
          initialValues={{
            name: employee.name,
            lastname: employee.lastname,
            identification: employee.identification,
            email: employee.email,
            hospital: employee.hospital.name,
            role: employee.role,
            password: "",
            submit: null,
          }}
          isEdit
          title={"Editar empleado"}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

interface Props {
  className?: string;
}

export default styled(EditEmployee)`
  display: flex;
  flex-direction: column;

  .flex-column {
    display: flex;
    flex-direction: column;
  }

  .form-data {
    margin-top: 16px;
  }

  .form-header-card {
    width: 100%;
  }

  .form-header {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

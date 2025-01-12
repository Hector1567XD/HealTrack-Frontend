import { Button } from "@mui/material";
import { IconTrash, IconEdit } from "@tabler/icons";
import DynamicTable from "components/DynamicTable";
// Own
import { Patient } from "core/patients/types";
import deletePatient from "services/patients/delete-patient";
import { FunctionComponent, useCallback, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAppDispatch } from "store/index";
import {
  setIsLoading,
  setSuccessMessage,
  setErrorMessage,
} from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import DialogDelete from "components/dialogDelete";

const Table: FunctionComponent<Props> = ({ items, className, fetchItems }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [patientId, setPatientId] = useState<number>(0);

  const handleOpen = useCallback((patientId: number) => {
    setOpen(true);
    setPatientId(patientId);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setPatientId(0);
  }, []);

  const onDelete = useCallback(
    async (patientId: number) => {
      try {
        dispatch(setIsLoading(true));
        await deletePatient(patientId!);
        dispatch(setSuccessMessage(`Paciente eliminado correctamente`));
      } catch (error) {
        if (error instanceof BackendError) {
          dispatch(setErrorMessage(error.getMessage()));
        }
      } finally {
        dispatch(setIsLoading(false));
        handleClose();
        fetchItems();
      }
    },
    [dispatch, fetchItems, handleClose]
  );
  console.log(items);
  return (
    <div className={className}>
      <DynamicTable
        headers={[
          { columnLabel: "Id", fieldName: "id", cellAlignment: "left" },
          { columnLabel: "Nombre", fieldName: "name", cellAlignment: "left" },
          {
            columnLabel: "Apellido",
            fieldName: "lastname",
            cellAlignment: "left",
          },
          {
            columnLabel: "Telefono",
            fieldName: "personalPhone",
            cellAlignment: "left",
          },
          {
            columnLabel: "Hospital",
            onRender: (row: Patient) => row.hospital?.name,
            cellAlignment: "left",
          },
          {
            columnLabel: "Especialista",
            onRender: (row: Patient) =>
              row.medic ? `${row.medic?.name} ${row.medic?.lastname}` : null,
            cellAlignment: "left",
          },
        ]}
        rows={items}
        components={[
          (row: Patient) => (
            <Button
              color="primary"
              onClick={() => {
                navigate("/patients/edit/" + row.id);
              }}
              startIcon={<IconEdit />}
            >
              Editar
            </Button>
          ),
          (row: Patient) => (
            <Button
              color="secondary"
              onClick={() => handleOpen(row.id)}
              startIcon={<IconTrash />}
            >
              Eliminar
            </Button>
          ),
        ]}
      />
      <DialogDelete
        handleClose={handleClose}
        onDelete={() => {
          onDelete(patientId);
        }}
        open={open}
      />
    </div>
  );
};

type Props = {
  items: Patient[];
  className?: string;
  fetchItems: () => void;
};

export default styled(Table)`
  display: flex;
  flex-direction: column;

  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;

"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function MyForm() {
  const { control, handleSubmit } = useFormContext();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([...formValues]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      className="flex items-center justify-center flex-col"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Controller
        name="pessoa"
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id="nome"
            sx={{ width: 300, marginBottom: 2 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            getOptionLabel={(option) => option.nome}
            options={options}
            loading={loading}
            onChange={(event, value) => {
              field.onChange(value?.id);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Nome"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name="telefone"
        control={control}
        rules={{
          required: "Telefone é obrigatório",
          pattern: {
            value: /^[0-9]{10,}$/,
            message: "Telefone inválido pelo menos 10 digitos",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Telefone"
            variant="outlined"
            sx={{ width: 300, marginBottom: 2 }}
            error={!!fieldState.error}
            helperText={fieldState?.error?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "E-mail é obrigatório",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "E-mail inválido",
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="E-mail"
            variant="outlined"
            sx={{ width: 300, marginBottom: 2 }}
            error={!!fieldState.error}
            helperText={fieldState?.error?.message}
          />
        )}
      />

      <button
        className="rounded-xl bg-purple-600 px-4 py-2 text-white font-bold"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}

const formValues = [
  { id: 1, nome: "Carlos Silva Lima" },
  { id: 2, nome: "Carlito Ramos Junior" },
  { id: 3, nome: "Paulo Felipe Castro" },
  { id: 4, nome: "Ana Ramos" },
  { id: 5, nome: "Fernando Lays" },
  { id: 6, nome: "Mariana Oliveira" },
  { id: 7, nome: "Lucas Santos" },
  { id: 8, nome: "Cristina Santos " },
  { id: 9, nome: "Ricardo Oliveira" },
  { id: 10, nome: "Beatriz Pereira" },
];

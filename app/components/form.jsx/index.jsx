import { Autocomplete, Grid, TextField } from "@mui/material";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

const pessoasPreDefinidas = [
  { nome: "Rêgo", telefone: "123456789", email: "rego@example.com" },
  { nome: "Lays", telefone: "987654321", email: "lays@example.com" },
  { nome: "Carlos", telefone: "111222333", email: "carlos@example.com" },
  { nome: "Ana", telefone: "444555666", email: "ana@example.com" },
  { nome: "Pedro", telefone: "777888999", email: "pedro@example.com" },
  { nome: "Laura", telefone: "123123123", email: "laura@example.com" },
  { nome: "Lucas", telefone: "456456456", email: "lucas@example.com" },
  { nome: "Isabel", telefone: "789789789", email: "isabel@example.com" },
  { nome: "Fernando", telefone: "654654654", email: "fernando@example.com" },
  { nome: "Camila", telefone: "987987987", email: "camila@example.com" },
];

const AutocompleteAsyncLoad = () => {
  const { control, setValue } = useFormContext();

  const handleAutocompleteChange = (event, newValue) => {
    if (newValue) {
      setValue("pessoa", newValue.nome || "");
      setValue("telefone", newValue.telefone || "");
      setValue("email", newValue.email || "");
    } else {
      setValue("pessoa", "");
      setValue("telefone", "");
      setValue("email", "");
    }
  };

  return (
    <Controller
      name="pessoa"
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={pessoasPreDefinidas}
          getOptionLabel={(option) => option.nome}
          onChange={handleAutocompleteChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Pessoa"
              variant="outlined"
              fullWidth
              value={field.value || ""}
            />
          )}
        />
      )}
    />
  );
};

const Formulario = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="w-full items-center p-2 justify-center">
            <h1 className="text-center p-2 font-bold">
              Formulário com Next.js, React Hook Form e MUI
            </h1>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <AutocompleteAsyncLoad />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="telefone"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Telefone"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={methods.control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="E-mail"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="w-full flex items-center justify-center">
                <button
                  className="rounded-xl items-center justify-center px-3 py-2 bg-purple-700 text-white font-bold "
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </FormProvider>
  );
};

export default Formulario;

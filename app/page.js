"use client";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import MyForm from "./components/form.jsx";

export default function App() {
  const methods = useForm();

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <FormProvider {...methods}>
        <MyForm />
      </FormProvider>
    </div>
  );
}

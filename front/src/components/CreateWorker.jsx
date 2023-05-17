import React, {  useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {  getWorker } from "../services/getWorkers";

import * as Yup from "yup";
import toast from "react-hot-toast";
const CreateWorker = ({ t, id,ctx }) => {
  const [text, setText] = useState("");
  const [formValues, setformValues] = useState({
    name: "",
    rol: "",
    project: "",
  });

  useEffect(() => {
    (async () => {
      if (id) {
        setText("Edit");
        const res = await getWorker(id);
        setformValues(res);
      } else {
        setText("Create");
      }
    })();
  }, []);
  return (
    <div className="flex items-center justify-center">
      <Formik
        initialValues={formValues}
        validationSchema={Yup.object({
          name: Yup.string().required("nombre requerido"),
          rol: Yup.string().required("rol requerido"),
          project: Yup.string(),
        })}
        onSubmit={async(values, { resetForm }) => {
          if(id){
            await ctx.handleEditWorker(id,values)
          }else{
            await ctx.handleCreateWorker(values);   
          }
          toast.dismiss()
          resetForm((values = ""));
        }}
        enableReinitialize
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <header className="flex justify-between">

            <h3 className="text-xl py-2">{text}</h3>
            </header>
            <label className="text-sm block font-bold text-gray-400" htmlFor="name">Name</label>
            <Field
              name="name"
              placeholder="name"
              className="px-3 py-2 focus:outlined-none rounded bg-gray-600 mb-2"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="name"
            />
            <label className="text-sm block font-bold text-gray-400" htmlFor="rol">Rol</label>
            <Field
              name="rol"
              placeholder="rol"
              className="px-3 py-2 focus:outlined-none rounded bg-gray-600 mb-2"
            />
            <ErrorMessage
              component="p"
              className="text-red-400 text-sm"
              name="rol"
            />
            <label className="text-sm block font-bold text-gray-400" htmlFor="project">Project</label>
            <Field
              name="project"
              placeholder="project"
              className="px-3 py-2 focus:outlined-none rounded bg-gray-600 mb-2"
            />
            <br />
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-blue-400">Save</button>
            <button type="button" onClick={() => toast.dismiss(t.id)}>
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateWorker;

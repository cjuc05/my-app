"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; // For validation

const Home = () => {
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSubmissionSuccess(true);
        // Optionally, reset the form after successful submission

      } else {
        console.error("Error submitting data:", response.status);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    address: Yup.string().required("Address is required"),
    mobile_phone: Yup.string()
      .required("Mobile phone is required")
      .matches(/^\d+$/, "Must be a valid phone number"),
  });

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center p-24"> {/*  justify-center to center vertically */}
        <div className="container mx-auto w-1/2"> {/*  w-1/2 for 50% width */}
        <span style={{ fontSize: '30px'}}>Customer Info Submission Form</span>
          <Formik
            initialValues={{ full_name: "", address: "", mobile_phone: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
      
            {({ isSubmitting }) => ( // Access isSubmitting prop

              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-2">
                <div className="mb-4">
                  <label htmlFor="full_name" className="block text-gray-700 text-sm font-bold mb-2">
                    Full Name:
                  </label>
                  <Field
                    type="text"
                    id="full_name"
                    name="full_name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="full_name" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                    Address:
                  </label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="address" className="text-red-500 text-sm" />
                </div>

                <div className="mb-4">
                  <label htmlFor="mobile_phone" className="block text-gray-700 text-sm font-bold mb-2">
                    Mobile Phone:
                  </label>
                  <Field
                    type="text"
                    id="mobile_phone"
                    name="mobile_phone"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="mobile_phone" className="text-red-500 text-sm" />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline"
                  >
                    Submit
                  </button>

                </div>
                {submissionSuccess && (
                  <div className="success mt-4">
                    Customer details submitted successfully!
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const LoginForm = () => {

  const navigator = useNavigate();



  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    password: Yup.string()
      .required("Passwort is required")
      .min(6, "Password too short! Must be at least 6 characters.")
      .max(10, "Password too long! Must be at most 10 characters."),
  });



  const handleSubmit = async (
    { email, password },
    { setFieldError }
  ) => {
    console.log({ email, password });
    const savedUserResponse = await fetch('https://wearher-from-mimi.com/api/login',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
    const savedUser = await savedUserResponse.json();
    const token = savedUser.data.token.slice(4);

    console.log(token)
    localStorage.setItem('token', token);
    navigator('/home');
  };






  return (
    <div className='container rounded w-75 text-secondary my-5'>
      <div className="bg-layer">
      <h1 className='text-center text-light p-5 '>Login Form</h1>

<Formik
  initialValues={{
    email: "",
    password: "",
  }}
  onSubmit={(values, errors) => {
    handleSubmit(values, errors);
  }}
  validationSchema={validationSchema}
>
  {({
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
  }) => {
    return (
      <Row>
        <Col lg={10} className=" mx-auto p-5">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                name='email'
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <div>{touched.email && errors.email}</div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Password"
                name='password'
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <div>{touched.password && errors.password}</div>
            </Form.Group>


            <div className='my-4'>
              <h5>Dont have any accounts ? <Link to={'/'} className='text-orange'>Create a new Account </Link></h5>
            </div>
            <Button variant="warning" className='text-light w-50 mx-auto d-block' type="submit">Login</Button>
          </Form>
        </Col>
      </Row>

    );
  }}
</Formik>
      </div>
    </div>
  );
};

export default LoginForm;

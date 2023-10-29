import React, { useState } from 'react'
import { Button, Col, Form, Row } from "react-bootstrap";

import { Link, useNavigate } from 'react-router-dom';
import { Formik } from "formik";
import * as Yup from "yup";


export default function RegisterForm() {
  const navigator = useNavigate();

  const signUpSchema = Yup.object({
    first_name: Yup.string().min(2).max(25).required("Please enter your name"),
    last_name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    phone: Yup.string().min(11).max(11).required("Please enter your phone"),
    password_confirmation: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });


  const register = async (values) => {
    console.log(values)
    // console.log('hi')
    const savedUserResponse = await fetch('https://wearher-from-mimi.com/api/register',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(values)
      })

    const savedUser = await savedUserResponse.json();

      if(savedUser){
        console.log('Saved User')
        console.log(savedUser);
        navigator('/login')
      }

  }



  const handleSubmit = async(values) => {
    // delete user.confirm_password;
    console.log(values)
    await register(values)
  }

  return (
    <div className='container    w-75  my-4'>
      <div className='bg-layer '>
      <h1 className='text-center  p-5 '>Register Form</h1>

<Formik
  initialValues={{
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone:"",
  }}
  onSubmit={(values, errors) => {
    handleSubmit(values, errors);
  }}
  validationSchema={signUpSchema}
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

      <Row >
        <Col lg={10} className=" mx-auto p-5 ">
          <Form onSubmit={handleSubmit}>

            <Row className="mb-3">
              <Form.Group as={Col} md="6" >
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="name"
                  autoComplete="off"
                  name="first_name"
                  placeholder="Name"
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6" >
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="name"
                  autoComplete="off"
                  name="last_name"
                  placeholder="Last Name"
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

            </Row>

            <Form.Group className="mb-3" >
              <Form.Label>Email address</Form.Label>
              <Form.Control required
                type="email"
                placeholder="Enter email"
                name='email'
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <div>{touched.email && errors.email}</div>

            </Form.Group>

            <Form.Group className="mb-3" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"
                placeholder="Password"
                name='password'
                value={values.password}
                onChange={handleChange("password")}
                onBlur={handleBlur("password")} />
              <div>{touched.password && errors.password}</div>
            </Form.Group>


            <Form.Group className="mb-3" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password"
                autoComplete="off"
                name="password_confirmation"
                id="confirm_password"
                placeholder="Confirm Password"
                value={values.password_confirmation}
                onChange={handleChange}
                onBlur={handleBlur} />
              {errors.password_confirmation && touched.password_confirmation ? (
                <p className="form-error">{errors.password_confirmation}</p>
              ) : null}
            </Form.Group>

            <Form.Group as={Col} md="6" >
                <Form.Label>phone</Form.Label>
                <Form.Control
                  type="phone"
                  autoComplete="off"
                  name="phone"
                  placeholder="phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>


            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check onChange={getAdminValue} type="checkbox" label="Admin" name="admin" checked={isAdmin} />
      </Form.Group> */}


            <div className='my-4'>
              <h5>Already have an Account ? <Link to={'/login'} className='text-orange'>Login Now </Link></h5>
            </div>


            <Button variant="warning" className=' w-50 mx-auto d-block' type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>


    );
  }}
</Formik>
      </div>
      
    </div>
  )
}



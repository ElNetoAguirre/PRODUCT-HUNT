import React, { useState } from "react"
import { css } from "@emotion/react"
import { useRouter } from "next/router"
import Layout from "../components/layout/Layout"
import { Formulario, Campo, InputSubmit, Error } from "../components/ui/Formulario"

import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"

// Validaciones
import useValidacion from "../hooks/useValidacion"
import validarCrearCuenta from "../validacion/validarCrearCuenta"

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: ""
}

const CrearCuenta = () => {

  const [error, guardarError] = useState(false)
  const {valores, errores, handleSubmit, handleChange, handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta)
  
  const {nombre, email, password} = valores
  const router = useRouter()

  async function crearCuenta() {
    try {
      const auth = getAuth()
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, {displayName: nombre})
      router.push("/")
    } catch (error) {
      console.error("Hubo un error al crear el usuario", error.message);
      guardarError(error.message)
      setTimeout(() => {
        guardarError(false)
      }, 3000)
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >Crear Cuenta</h1>
  
          <Formulario
            onSubmit={handleSubmit}
            noValidate
          >
            <Campo>
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                placeholder="Tu Nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.nombre && <Error>{errores.nombre}</Error>}
  
            <Campo>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Tu Email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.email && <Error>{errores.email}</Error>}
  
            <Campo>
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>

            {errores.password && <Error>{errores.password}</Error>}

            {error && <Error>{error}</Error>}
  
            <InputSubmit
              type="submit"
              value="Crear Cuenta"
            />
          </Formulario>
        </>
      </Layout>
    </div>
  )
}

export default CrearCuenta
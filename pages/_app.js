import React from "react"
import firebase, { FirebaseContext } from "../firebase"
import useAutenticacion from "../hooks/useAutenticacion"
import Head from "next/head"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {

  const usuario = useAutenticacion()
  //console.log(usuario)

  return (
    <>
      <Head>
        <title>Product Hunt Firebase y Next.js</title>
      </Head>
      
      <FirebaseContext.Provider
        value={{
          firebase,
          usuario
        }}
      >
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </>
  )
}

export default MyApp

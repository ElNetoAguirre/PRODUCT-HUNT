import React, { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import { useRouter } from "next/router"
import DetallesProducto from "../components/layout/DetallesProducto"
import useProductos from "../hooks/useProductos"
import { css } from "@emotion/react"

const Buscar = () => {

  const router = useRouter()
  const {query: { q }} = router

  // Todos los productos
  const {productos} = useProductos("creado")
  const [resultado, guardarResultado] = useState([])

  useEffect(() => {
    const busqueda = q.toLowerCase()
    const filtro = productos.filter(producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) || 
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    })
    guardarResultado(filtro)
    
  }, [q, productos])

  return (
    <div>
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            {resultado.length === 0 ? (
              <h1
                css={css`
                  font-size: 2rem;
                  margin-top: 5rem;
                  text-align: center;
                  color: black
                `}
              >No se encontraron resultados para esta búsqueda</h1>
            ) : (
              <ul className="bg-white">
                {resultado.map(producto => (
                  <DetallesProducto
                    key={producto.id}
                    producto={producto}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </Layout>
    </div>
  )
}
export default Buscar
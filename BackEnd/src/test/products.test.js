import { expect } from "chai";
import supertest from "supertest";

let request;

describe("Test product API", ()=>{
    before(async()=>{
        request = supertest("http://localhost:8081/api/productos")
    })

    describe("GET - api/productos",()=>{
        it("should return status code 200 and all products", async()=>{
            const response = await request.get("/")
            expect(response.status).to.eql(200)
        })
    })

    describe("GET - api/prouctos/:id",()=>{
        it("should return status code 200 and response product should hace the same passed id", async ()=>{
            const idp = "63f3c2233b3c1212450eb45a"
            const response = await request.get(`/${idp}`)
            expect(response.status).to.eql(200)
            expect(response.body.payload._id).to.eql(idp)
        })  
    })

    describe("POST - api/productos",()=>{
        it("should return status code 201 and should add a new product", async ()=>{
            const newProduct = {
                title: "Producto test",
                description: "Descripción del producto test",
                price: 1000,
                code: "test",
                stock: 2,
                thumbnail: "producto.jpg",
              };
              const response = await request.post("/").send(newProduct);
              expect(response.status).to.eql(200);
        })
    })
})
import express from "express";
import * as database_call from "../functions.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allBooks = await database_call.getbooks();
        const users_data = await database_call.user_data();
        console.log(users_data)
        const imgPromises = allBooks.map(isbn => database_call.getImage(isbn));
        Promise.all(imgPromises)
            .then(blobs => {// se crea un nuevo array con las imagenes en base64 
                const imageDataArray = blobs.map(blob => {
                    // Convierte el Blob a un string base64
                    return blob.toString('base64');
                });
                // Ahora envía la respuesta después de procesar todas las imágenes
                res.render("index.ejs", { prueba: imageDataArray, array: allBooks.length, book_name: users_data[0].name, user_review: users_data[0].review, user_name: users_data[0].user_name});
            })
            .catch(error => {
                console.error("Error al obtener imágenes de portada:", error);
                res.status(500).send("Internal Server Error");
            });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});
export default router
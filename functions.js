import db from "./database/connection.js"
import axios from "axios";


export async function getImage(isbn) {
    try{
        const response = await axios.get(`https://covers.openlibrary.org/b/isbn/${isbn}.jpg`, {responseType: `arraybuffer`});
        const imageData = Buffer.from(response.data,`binary`);
        return imageData;
    }catch(err){
        console.log(err);
    }
}
// done
export async function getUserBooksData(currentUserId){
    const userBooksData = db.query("SELECT users.user_name,books.isbn, books.name, books.review FROM books JOIN users ON users.id = books.user_id WHERE books.user_id = $1",[currentUserId]) ;
    const data = await userBooksData
    const result = data.rows
    return result
}
export async function getbooks(){
    const usersBooksImages = db.query("SELECT books.isbn FROM books JOIN users ON users.id = books.user_id ") ;
    const data = await usersBooksImages
    const result = data.rows
    let books =[]
    result.forEach((book) =>{
        books.push(book.isbn)
    })
    return books
}
export async function user_data(){
    const userBookIsbn = db.query("SELECT users.user_name, books.isbn, books.name, books.review FROM books JOIN users ON users.id = books.user_id") ;    
    const data = await userBookIsbn
    const result = data.rows
    return result
}
export async function user_books(currentUserId){
    const userBookIsbn = db.query("SELECT books.isbn FROM books JOIN users ON users.id = books.user_id WHERE books.user_id = $1",[currentUserId]) ;    
    const data = await userBookIsbn
    const result = data.rows
    let books =[]
    result.forEach((book) =>{
        books.push(book.isbn)
    })
    return books
}

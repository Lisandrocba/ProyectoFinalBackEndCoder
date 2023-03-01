import { messageServices } from "../services/services.js";

const getAllMessage =async()=>{
    try{
        const messages = await messageServices.getAll()
        if (!messages) {
            res.status(404);
            res.render("./pages/error.ejs", {
                code: 404,
                message: "Message Not Found",
            });
        }
        res.send({ status: "success", messages });
    }catch(e){
        console.log(e)
        res.status(500);
        res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
        });
    }
    
    
}

const getMessageById = async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await messageServices.getById(id);
        if (!messages) {
        res.status(404);
        res.render("./pages/error.ejs", {
            code: 404,
            message: "Message Not Found",
        });
        }
        res.send({ status: "success", messages });
    } catch (e) {
        console.log(e)
        res.status(500);
        res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
        });
    }
};

const createMessage = async (req, res) => {
    try{
        const {message} = req.body
        const id = req.cookies.userIdCookie
        const newMessage = await messageServices.save({id, message})
        res.send({ status: "success", newMessage });
    }catch(e){
        console.log(e)
        res.status(500);
        res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
        });
    }
};

export { getMessageById, createMessage, getAllMessage };

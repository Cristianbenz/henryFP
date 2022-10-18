const { User } = require('../db');
const { Router } = require("express");
const router = Router();
import {
    createUserWithEmailAndPassword,
} from "firebase/auth";


const UserPost = async (req, res)=> {
    try{
    const { user } = await createUserWithEmailAndPassword({
    auth,
    email,
    password,
    id : user.uid,
    admin: false,
    });
    res.status(200).json(user)
/*  setRegister(false);
    const docuRef = doc(firestore, `usuarios/${user.uid}`);
    setDoc(docuRef, { correo: email }); */
} catch (error){
    res.status(400).json({error: "User not create!"});
}
}

/*const UserPost = async (req, res) => {
    try { 
        const { email, admin, id } = req.body
        const newUser = await User.create({
            admin: false,
            id,
            email
        })
        res.status(200).json(newUser);

    } catch (error) {
        res.status(400).json({error: "User not create!"});
    };
};
*/
const getDbInfo = async () => {
    return await User.findAll();
};
const getDbById = async (id) => {
    return await User.findByPk(id);
};

const UserByID = async (req, res) => {
    const { id } = req.params  
    try {
        let user = await getDbById(id);
        return res.status(200).json(user)
    } catch {
        return res.status(400).send('User does not exist')
    }
};


const allDataUser = async (req, res) => {
    const {name} = req.query;
    const info = await getDbInfo();
    try {
                if (info.length === 0) {
                    res.send("User does not exist");
                } else {
                    res.status(200).json(info)
    } }
    catch (error) {
        res.status(400).json({error: "Error User"});
    }
};

//arreglar esta ruta
const UserEliminated = async(req, res)=>{
    const { id } = req.params
    const searchId = await User.findByPk(id)
    if(!searchId) res.status(400).json({msg: "Not User"})
    try {
    await searchId.Destroy()
        res.status(200).json({msg: `The User ${id} has been removed`})
    } catch (error) {
        res.status(400).json({error: "Error eliminated User"});
    }
};

const UserUpdate = async (req, res) => {
    const { id } = req.params;
    const { name, image, password, email, admin } = req.body
    try {
        let modifique = await User.update({ name, image, password, email, admin, cart, deseos, biblioteca } ,
            {
                where: {
                    id: id,
                }
            })
        
    res.status(200).json({msg: `User ${name} update successfully`})
    }
    catch (error) { 
        res.status(400).json({error: "Error update User"});
    }
};


const PostLogin= async (req, res) => {
    const {email} = req.body;
    try {
        let found = await User.findOne({ where: { email: email} });
            if (found) {
            return res.status(200).send(found);
            } else {
            return res
                .status(404)
                .send({ msg: "sorry, this email is not exist" });
            }
        } catch (error) {
            res.status(400).send(error)
        }
        };


module.exports={
    allDataUser,
    UserByID,
    UserPost,
    UserEliminated,
    UserUpdate,
    PostLogin
}
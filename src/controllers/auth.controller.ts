import { Request, Response } from "express";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";

export const singup = async ( req: Request, res: Response ) => {
    console.log(req.body)
    const user: IUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    //cifrar password
    user.password = await user.encrypPassword(user.password)
    //guardar el user
    const saveUser = await user.save()
    //crear token
    const token:string = jwt.sign({_id: saveUser._id}, process.env.TOKEN_SECRET || 'tokentest')
    //respuesta de la peticion
    res.header('auth-token', token).json(saveUser)
}

export const singin = async ( req: Request, res: Response ) => {
    
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json('Email is wrong')

    const correctPassword: boolean = await user.validatePassword(req.body.password)
    if(!correctPassword) return res.status(400).json('Invalid password')

    const token:string = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET || 'tokentest', {
        expiresIn: 60 * 60 *24
    })

    res.header('auth-token',token).send(user)

}

export const profile = async ( req: Request, res: Response ) => {

    const user = await User.findById(req.userId, {password:0})
    if(!user) return res.status(404).json('No user found')

    res.send(user)
    
}

import mongoose from "mongoose";
import Products from "./Products.js";
import Carts from "./Carts.js";
import User from "./User.js";
import Message from "./Messages.js";
import Order from "./Order.js";

export default class Dao {
  constructor(config) {
    this.mongoose = mongoose
      .connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
      .catch((e) => {
        console.log(e);
        process.exit();
      });

    const timestamp = {
      timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    };
    const productSchema = mongoose.Schema(Products.schema, timestamp);
    const cartSchema = mongoose.Schema(Carts.schema, timestamp);
    const userSchema = mongoose.Schema(User.schema, timestamp);
    const messageSchema = mongoose.Schema(Message.Schema, timestamp);
    const oderSchema = mongoose.Schema(Order.Schema, timestamp);

    this.models = {
      [Products.model]: mongoose.model(Products.model, productSchema),
      [Carts.model]: mongoose.model(Carts.model, cartSchema),
      [User.model]: mongoose.model(User.model, userSchema),
      [Message.model]: mongoose.model(Message.model, messageSchema),
      [Order.model]: mongoose.model(Order.model, oderSchema)
    };
  }

  findOne = async (options, entity) => {
    if (!this.models[entity]) throw new Error(`Modelo ${entity} no encontrado`);
    let result = await this.models[entity].findOne(options);
    return result ? result.toObject() : null;
  };

  getAll = async (options, entity)=>{
    if (!this.models[entity]) throw new Error(`Modelo ${entity} no encontrado`);
    let result = await this.models[entity].find(options);
    return result.map(result=>result.toObject())
  }

  insert = async(document, entity)=>{
    if (!this.models[entity]) throw new Error(`Modelo ${entity} no encontrado`);
    try{
        let instance = new this.models[entity](document);
        let result = await instance.save();
        return result ? result.toObject() : null;
    }catch(e){
        console.log(error);
        return null;
    }
  }

  update = async(document, entity)=>{
    if (!this.models[entity]) throw new Error(`Modelo ${entity} no encontrado`);
    const id = document._id;
    delete document._id;
    let result = await this.models[entity].findByIdAndUpdate(id, {$set: document})
    return result.toObject();
  }

  delete = async(id,entity)=>{
    if(!this.models[entity]) throw new Error(`Entity ${entity} not found or defined`)
    let result = await this.models[entity].findByIdAndDelete(id);
    return result? result.toObject():null;
    }

  exists = async(entity,options)=>{
        if(!this.models[entity]) throw new Error(`Entity ${entity} not found or defined`)
        return this.models[entity].exists(options);
    }
}

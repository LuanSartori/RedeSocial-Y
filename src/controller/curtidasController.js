import Curtidas from "../models/curtidas.js";
import { Sequelize } from "sequelize";

//adicionar curtida pub
 export const curtirPubli = async (req, res) => {
    const {publicacao_id,} = req.body;
    res.status(200).json();
};

//remover curtida pub
export const removeCurtidaP = async (req, res) => {
    const {publicacao_id} = req.body;
    res.status(200).json();
 };
 
 //adicionar curtida coment
 export const curtirComent = async (req, res) => {
    const {comentario_id} = req.body;
    res.status(200).json();
};

//remover curtida coment
export const removeCurtidaC = async (req, res) => {
    const {comentario_id} = req.body;
    res.status(200).json();
};

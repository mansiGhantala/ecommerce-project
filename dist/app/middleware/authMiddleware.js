"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const JWT_SECRET = config_1.default.jwt_secret;
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Invalid token and Access Denied!' });
        return;
    }
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Invalid token and Access Denied!' });
            return;
        }
        req.decoded = decoded;
        next();
    });
};
exports.verifyToken = verifyToken;
// import jwt from 'jsonwebtoken';
// import config from '../config';
// import { NextFunction, Request, Response } from 'express';
// const JWT_SECRET =  config.jwt_secret as string;
// export const verfiyToken = (req: Request, res: Response, nex: NextFunction) => {
//     // will get token this format: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjAzNjQ1NzEsImV4cCI6MTcyMDM2ODE3MX0.rnvvxV5PbDpHxlu_jj599euxbCiGeCCl0eGow1nYla8
//     const token = req.headers.authorization?.split(' ')[1];
//     if(!token) {
//         res.status(401).send({ message: 'Invalid token and Access Denied!' });
//         return;
//     }
//     jwt.verify(token, JWT_SECRET, (err, decoded) => {
//         if(err) {
//             res.status(401).send({ message: 'Invalid token and Access Denied!' });
//             return; 
//         }
//         (req as any).decoded = decoded;
//         nex();
//     })
// }

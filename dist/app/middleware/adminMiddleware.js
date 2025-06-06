"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    var _a;
    const userRole = (_a = req.decoded) === null || _a === void 0 ? void 0 : _a.role;
    if (userRole !== 'admin') {
        res.status(403).json({
            success: false,
            message: 'You are not authorized to perform this action.',
        });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
// import { NextFunction, Request, Response } from 'express';
// export const isAdmin = (req: Request, res: Response, nex: NextFunction)=> {
//     const userRole = (req as any).decoded.role;
//     if(userRole !== 'admin'){
//         return res.status(403).json({success: false, message: 'You are not authorized to perform this action.'});
//     }
//     nex();
// }

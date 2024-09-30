import { Request, Response } from 'express';
import { Patient } from '../models/Patient';

// List patients with pagination
export const index = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const admin = (req.session as any).admin;

    try {
        const { count, rows } = await Patient.findAndCountAll({
            limit,
            offset
        });

        const totalPages = Math.ceil(count / limit);

        res.render('dashboard', {
            patients: rows,
            currentPage: page,
            totalPages,
            error: null,
            adminName: admin.name
        });
    } catch (error) {
        res.render('dashboard', {
            patients: [],
            currentPage: 1,
            totalPages: 1,
            error: 'Error fetching patients',
            adminName: admin.name
        });
    }
};



// Check-in new patient
export const checkIn = async (req: Request, res: Response) => {
    const { name, national_number, phone, address } = req.body;
    console.log(req.body);
    console.log(name, national_number, phone, address);
    try {
        const newPatient = await Patient.create({ name, national_number, phone, address });
        res.status(201).json({
            success: true,
            message: 'Patient checked in successfully',
            data: newPatient
        });
    } catch (error) {
        let errorMessage = 'Error checking in patient';
        if (error instanceof Error) {
            if ('errors' in error && Array.isArray((error as any).errors)) {
                errorMessage = (error as any).errors.map((e: any) => e.message).join(', ');
            } else {
                errorMessage = error.message;
            }
        }

        res.status(400).json({
            success: false,
            message: errorMessage
        });
    }
};

// Delete patient
export const deletePatient = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedCount = await Patient.destroy({ where: { id } });
        if (deletedCount === 0) {
             res.status(404).json({
                success: false,
                message: 'Patient not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Patient deleted successfully'
        });
    } catch (error) {
        let errorMessage = 'Error deleting patient';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(500).json({
            success: false,
            message: errorMessage
        });
    }
};
import { DataTypes } from 'sequelize';
import sequelize from '../config/connection';
export const Patient = sequelize.define('Patient', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'الاسم لا يمكن أن يكون فارغًا'
            },
        }
    },
    national_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            name: 'national_number',
            msg: 'المريض مسجل من قبل'
        },
        validate: {
            notEmpty: {
                msg: 'الرقم القومى لا يمكن أن يكون فارغًا'
            },
            isNumeric: {
                msg: 'الرقم القومى يجب أن يحتوي على أرقام فقط'
            },
            len: {
                args: [14, 14],
                msg: 'الرقم القومى يجب أن يكون 14 رقمًا'
            }
        }
    },
    medical_key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: () => {
            const randomNumbers = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
            return `n${randomNumbers}`;
        },
        validate: {
            notEmpty: {
                msg: 'الرقم الطبي لا يمكن أن يكون فارغًا'
            },
            is: {
                args: /^n\d{6}$/,
                msg: 'المفتاح الطبي يجب أن يبدأ بحرف n ويتبعه 6 أرقام'
            }
        }
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    tableName: 'patients',
    timestamps: false
});

Patient.sync();
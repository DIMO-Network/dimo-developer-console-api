import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

import DB from '@/services/db';
import { User } from '@/models/user.model';

export class PaymentReceipt extends Model<
  InferAttributes<PaymentReceipt>,
  InferCreationAttributes<PaymentReceipt>
> {
  declare id?: string;
  declare receipt_link: string;
  declare owner_id: string;
  declare beneficiary: string;
  declare amount: number;
}

PaymentReceipt.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notNull: true,
      },
      primaryKey: true,
    },
    receipt_link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    beneficiary: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
      },
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: true,
        isFloat: true,
      },
    },
  },
  {
    sequelize: DB.connection as Sequelize,
    modelName: 'PaymentReceipt',
    tableName: 'payment_receipts',
    createdAt: 'created_at',
  },
);

PaymentReceipt.belongsTo(User, { foreignKey: 'owner_id' });

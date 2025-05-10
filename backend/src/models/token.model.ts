import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'
import User from './user.model'

class Token extends Model {
  public id!: number
  public userId!: string
  public refreshToken!: string
  public readonly createdAt!: Date
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Token',
    tableName: 'tokens',
    timestamps: true,
  }
)

export default Token

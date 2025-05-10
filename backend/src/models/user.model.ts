import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class User extends Model {
  public id!: string
  public googleId!: string
  public displayName!: string
  public email!: string
  public photo!: string
  public jwtToken?: string // Add jwtToken as an optional property
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
)

export default User

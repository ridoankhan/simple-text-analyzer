import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class Text extends Model {
  public id!: string
  public content!: string
  public createdBy!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Text.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Text',
    tableName: 'texts',
    timestamps: true,
  }
)

export default Text

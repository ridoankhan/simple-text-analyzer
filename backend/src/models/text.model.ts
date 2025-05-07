import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

class Text extends Model {
  public id!: string // UUID is a string
  public content!: string
  public createdBy!: string
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

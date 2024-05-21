import {
	Column,
	Default,
	Model,
	PrimaryKey,
	DataType
} from 'sequelize-typescript';

// https://sequelize.org/api/v6/identifiers.html
// https://www.npmjs.com/package/sequelize-typescript
export class BaseModel extends Model {
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	id: any;
}

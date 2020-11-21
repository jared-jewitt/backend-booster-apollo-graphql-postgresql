import { Field, ObjectType, ID } from "type-graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from ".";

@ObjectType({ description: "The `Post` type represents a single post record" })
@Entity()
export default class Post {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String)
  @Column()
  public message: string;

  @Field(() => ID)
  @Column()
  public userId: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: "userId" })
  public user: User;
}

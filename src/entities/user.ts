import { ObjectType, InputType, Field, ID } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Length, MaxLength } from "class-validator";
import { Post } from ".";

@ObjectType({ description: "The `User` type represents a single user record" })
@Entity()
export default class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field(() => String)
  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;

  @OneToMany(() => Post, (post) => post.user)
  public posts: Post[];
}

@ObjectType({
  description:
    "The `LoginOutput` type represents the value that is returned after logging in a user",
})
export class LoginOutput {
  @Field(() => String)
  public token: string;

  @Field(() => User)
  public user: Partial<User>;
}

@ObjectType({
  description: "The `RegisterOutput` type represents the value returned after registering a user",
})
export class RegisterOutput implements Partial<User> {
  @Field(() => ID)
  public id: number;

  @Field(() => String)
  public username: string;
}

@InputType({
  description:
    "The `LoginInput` type represents the parameters needed to be passed when logging in a user",
})
export class LoginInput implements Partial<User> {
  @Field(() => String)
  public username: string;

  @Field(() => String)
  public password: string;
}

@InputType({
  description:
    "The `RegisterInput` type represents the parameters needed to be passed when registering a user",
})
export class RegisterInput implements Partial<User> {
  @Field(() => String)
  @MaxLength(255)
  public username: string;

  @Field(() => String)
  @Length(8, 255)
  public password: string;
}

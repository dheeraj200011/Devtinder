import mongoose from "mongoose";
const Schema = mongoose.Schema;
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong enough");
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://scontent.fknu1-5.fna.fbcdn.net/v/t1.6435-1/117182627_6451260514962961_4918996006021310312_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=1d2534&_nc_ohc=S7CLh0xtEYwQ7kNvwGhaDnS&_nc_oc=AdmB2diDrsdgqS8NELAKxBWOlrD0-MgRPumNSMHvTQgHmhlNPQKfrtqo9_YSyCppJcxokxLlbfQHR2yM03_rZ_-c&_nc_zt=24&_nc_ht=scontent.fknu1-5.fna&_nc_gid=dZloiI7yi2-7qlvi9ashhw&oh=00_AfX4ml8hLHPLInWrYYBcrUV9w04FIkfbGMxhyQxSj-7yiw&oe=68B7E802",
    },
    description: {
      type: String,
    },
    skills: {
      type: [String],
    },
    membership: {
      type: String,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      enum: [true, false],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

userSchema.methods.validatePassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;

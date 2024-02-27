import Blog from "../models/Blog.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import Message from "../models/Message.js";
import Payment from "../models/Payment.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// Stripe for payment
import stripe from "stripe";
const stripes = stripe(
  "pk_test_51OmmzbA0o39JMyyKbuIuheiMwrTSf4iR3GG1g0QZSGaHFxHuaD5cCmUjWz9lOnkDJaXmY50RouTmYjtwce1oPMMU00fGkoiy27"
);

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// node mailer
const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `Click <a href="${process.env.CLIENT_URL}/reset-password?resetToken=${resetToken}">here</a> to reset your password.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error("Email sending failed");
  }
};

// Resolvers for the schema
export const resolvers = {
  Query: {
    // Resolvers for the queries
    async blogs() {
      return await Blog.find();
    },
    // Resolver for a single blog
    async blog(_, args) {
      return await Blog.findById(args.blogId);
    },
    // Resolver for the users
    async users(_, args) {
      const { adminId } = args;
      const admin = await User.findById(adminId);
      const isAdmin = admin.admin;
      if (isAdmin) {
        return await User.find();
      }
      return;
    },
    // Resolver for a single user
    async user(_, args) {
      const { adminId, userId } = args;
      const admin = await User.findById(adminId);
      const isAdmin = admin.admin;
      // Check if the user is an admin
      if (isAdmin) {
        return await User.findById(userId);
      }
      return;
    },
    // Resolver for the comments
    async messages(_, args) {
      const { adminId } = args;
      const admin = await User.findById(adminId);
      const isAdmin = admin.admin;
      if (isAdmin) {
        return await Message.find();
      }
      return;
    },
    // Resolver for a single message
    async message(_, args) {
      const { adminId, messageId } = args;
      const admin = await User.findById(adminId);
      const isAdmin = admin.admin;
      if (isAdmin) {
        return await Message.findByIdAndUpdate(messageId, { seen: true });
      }
      return;
    },
    // Resolver for the pauments only for admin
    async payments(_, args) {
      const { adminId } = args;
      const admin = await User.findById(adminId);
      const isAdmin = admin.admin;

      if (isAdmin) {
        return await Payment.find();
      }
      return;
    },
    // Resolver for a single payment
    async payment(_, args) {
      const { adminId, paymentId } = args;
      const admin = await User.findById(adminId);
      const isAdmin = admin.admin;

      if (isAdmin) {
        return await Payment.findByIdAndUpdate(paymentId, { seen: true });
      }
      return;
    },
  },

    // Resolvers for user accociated with a blog
  Blog: {
    async user(parent) {
      return await User.findById(parent.userId);
    },
    // Resolver for the comments accociated with a blog
    async comments(parent) {
      return await Comment.find({ blogId: parent.id });
    },
    // Resolver for the format date of a blog
    async createdAt(parent) {
      return new Date(parent.createdAt).toLocaleString();
    },
  },

   // Resolver for the format date of a payment
  Payment: {
    async createdAt(parent) {
      return new Date(parent.createdAt).toLocaleString();
    },
  },

  // Resolvers for the  created at date of a message
  Message: {
    async createdAt(parent) {
      return new Date(parent.createdAt).toLocaleString();
    },
  },

  // Resolvers for user accociated with a comment
  Comment: {
    async user(parent) {
      return await User.findById(parent.userId);
    },
  },

  //Resolvers for creating a new blog only for admin
  Mutation: {
    async createBlog(_, args) {
      const { userId, thumbnail, title, description } = args;

      const admin = await User.findById(userId);
      if (!admin) {
        return;
      }

      const isAdmin = admin.admin;

      if (isAdmin) {
        return await Blog.create({
          userId,
          thumbnail,
          title,
          description,
        });
      }

      return;
    },
    // Resolver for deleting a blog only for admin
    async deleteBlog(_, args) {
      const { adminId, blogId } = args;
      const admin = await User.findById(adminId);

      if (!admin) {
        return;
      }

      const isAdmin = admin.admin;

      if (isAdmin) {
        return await Blog.findByIdAndDelete(blogId);
      }

      return;
    },
    //Resolver for deleting a user only for admin
    async deleteUser(_, args) {
      const { userId, adminId } = args;

      const user = await User.findById(userId);

      if (!user) {
        return;
      }

      const admin = await User.findById(adminId);

      if (!admin) {
        return;
      }

      const isAdmin = admin.admin;

      if (isAdmin) {
        return await User.findByIdAndDelete(userId);
      }

      return;
    },
    // Resolver for updating a user only for admin
    async updateUser(_, args) {
      const { userId, adminId } = args;

      const user = await User.findById(userId);

      if (!user) {
        return;
      }

      const admin = await User.findById(adminId);

      if (!admin) {
        return;
      }

      const isAdmin = admin.admin;

      if (isAdmin) {
        return await User.findByIdAndUpdate(userId, { admin: !user.admin });
      }

      return;
    },
    // Resolver for registering a new user
    async registerUser(_, args) {
      const { avatar, name, email, password } = args;
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        avatar,
        name,
        email,
        password: hashedPassword,
      });

      const { admin, _id } = user;

      return {
        avatar,
        id: _id,
        name,
        email,
        admin,
        token: generateToken(user._id),
      };
    },
    // Resolver authenticating and logging in a user
    async loginUser(_, args) {
      const { email, password } = args;

      const isUser = await User.findOne({ email: email });

      // Hash password
      const auth = await bcrypt.compare(password, isUser.password);

      if (auth) {
        const { avatar, name, email, admin, _id } = isUser;
        return {
          avatar,
          id: _id,
          name,
          email,
          admin,
          token: generateToken(_id),
        };
      }
    },
    // Resolver function to initiate the password reset process
    async forgetPassword(_, args) {
      const { email } = args;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      const resetToken = user.generateResetToken();
      await user.save();

      await sendPasswordResetEmail(email, resetToken);

      return {
        status: true,
        message: "Successfully sent the reset password link",
        token: resetToken,
      };
    },
    // Resolver function to reset the password
    async resetPassword(_, args) {
      const { password, resetToken } = args;

      try {
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

        const user = await User.findOne({
          _id: decoded.id,
          resetToken,
          resetTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
          return new Error("Invalid or expired reset token");
        }
        user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;

        await user.save();

        return {
          status: true,
          message: "Successfully reset your password!",
        };
      } catch (error) {
        return new Error("Invalid token");
      }
    },
    // Resolver for creating a new comment
    async createComment(_, args) {
      const { comment, blogId, userId } = args;
      const user = await User.findById(userId);
      if (user) {
        return await Comment.create({
          comment,
          blogId,
          userId,
        });
      }
      return;
    },
    // Resolver for deleting a comment
    async deleteComment(_, args) {
      const { commentId, userId } = args;

      const comment = await Comment.findById(commentId);
      const commentUserId = String(comment.userId);
      const inputUserId = String(userId);

      const auth = commentUserId === inputUserId;
      if (auth) {
        return await Comment.findByIdAndDelete(commentId);
      }
      return "it's not your comment";
    },
    async seenMessage(_, args) {
      const { messagesId, adminId } = args;

      const admin = await findById(adminId);
      const isAdmin = admin.admin;

      if (isAdmin) {
        const seenStatus = await findByIdAndUpdate(messagesId, { seen: true });
        return seenStatus;
      }
      return;
    },
    // Resolver for sending a message
    async sendMessage(_, args) {
      const { name, email, subject, text, userId } = args;
      const user = await User.findById(userId);
      if (user) {
        return await Message.create({
          name,
          email,
          subject,
          text,
          userId,
        });
      }
      return;
    },
    // Resolver for deleting a message
    async deleteMessage(_, args) {
      const { messageId, adminId } = args;

      const admin = await User.findById(adminId);
      const isAdmin = admin.admin;

      if (isAdmin) {
        return await Message.findByIdAndDelete(messageId);
      }
      return "Not admin";
    },
    // Resolver for payment
    async payment(_, args) {
      const { tokenId, amount } = args;
      const payment = await stripes.charges.create({
        source: tokenId,
        amount: amount,
        currency: "usd",
      });
      const savePayment = await Payment.create({
        paymentId: payment.id,
        amount: payment.amount,
        status: payment.status,
        paid: payment.paid,
        amount_captured: payment.amount_captured,
        city: payment.billing_details.address.city,
        country: payment.billing_details.address.country,
        line1: payment.billing_details.address.line1,
        postCode: payment.billing_details.address.postal_code,
        email: payment.billing_details.email,
        name: payment.billing_details.name,
        receipt_url: payment.receipt_url,
      });
      return savePayment;
    },
  },
};

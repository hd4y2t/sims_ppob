import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import profile from "./routes/user.route.js";
import banners from "./routes/banner.route.js";
import services from "./routes/service.route.js";
import balanceRoute from "./routes/balance.route.js";
import topupRoute from "./routes/topup.route.js";
import transactionRoute from "./routes/transaction.route.js";
import path from "path";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/profile", profile);
app.use("/api/banner", banners);
app.use("/api/services", services);
app.use("/api/balance", balanceRoute);
app.use("/api/topup", topupRoute);
app.use("/api/transaction", transactionRoute);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

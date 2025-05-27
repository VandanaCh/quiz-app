"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const quiz_1 = __importDefault(require("./routes/quiz"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Mount routes under /api
app.use('/api', quiz_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`✅ Quiz API running at http://localhost:${PORT}/api`);
});

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const article = require("./models/article");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");

mongoose.connect(
  "mongodb+srv://smir45:bl0@tW@R33@cluster0.vzaxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ publishedAt: "desc" });

  res.render("articles/index", { articles: articles });
});
app.use("/articles", articleRouter);
console.log("server Started")
app.listen(5000);

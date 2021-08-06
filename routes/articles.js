const express = require("express");
const Article = require("./../models/article")

const router = express.Router();

//setting up  for new posts

router.get("/new", (req, res) => {
  res.render ('articles/new', {article: new Article()});
})

// setting up router for slug- getting posts

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({slug: req.params.slug})
  if(article == null) res.redirect('/')
  res.render('articles/show', {article: article});
})


// setting up routes for article deletion

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})


// setting up routes for article editing
router.put('/:id', async (req, res) => {
  await Article.findByIdAndUpdate(req.params.id, req.body)
  res.redirect('/')
})


// setting up routes for article




router.post('/', async (req, res) => {
    let article = new Article({
      title: req.body.title,
      description: req.body.description,
      markdown: req.body.markdown
    })

   try{
     article = await article.save()
     res.redirect(`/articles/${article.slug}`)

   } catch (e){
     console.log(e)
      res.render(`articles/new`, {article: article})
   }
})
module.exports = router;

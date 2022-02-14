const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = await Tag.findAll({
    include: [{ model: Product }],
  }).catch((err) => {
    res.status(500).json(err);
  });
  res.status(200).json(allTags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag = await tag.findByPk(req.params.id, {
    include: [{ model: Product}],
  }).catch((err) => {
    res.status(500).json(err);
  });

  if (!tag) {
    res.status(404).json('no tag found!');
  } else {
    res.status(200).json(tag);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  if(req.body.tag_nae.length) {
    const newTag = await Tag.create(req.body).catch((err) => {
      res.status(400).json(err);
    });
    res.status(201).json(newTag);
  } else {
    res.status(404).json('no tag entered!');
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const tag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).catch((err) => {
    res.status(500).json(err);
  });

  if(!tag) {
    res.status(404).json('no tag entered!');
      } else {
        res.status(202).end();
      }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
const destroyedTag = await Tag.destroy({
  where: {
    id: req.params.id,
  },
}).catch(err => {
  res.status(500).json(err);
});

if(!destroyedTag) {
  res.status(404).json('no tag found!');
} else {
  res.status(202).json('tag deleted!');
}
});

module.exports = router;

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try{
    const tagsData = await Tag.findAll({
      include:[{model:Product, through: ProductTag}]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
    const tagsData = await Tag.findByPk(req.params.id, {include: [{ model: Product, through: ProductTag}]
    });
  if (!tagsData){
    res.status(404).json({message: 'No Tag found'});
    return;
  }
  res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  try{
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json({message: 'New tag created'})
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try{
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    })

    if (tagData[0] > 0 ) {
      const updatedTag = await Tag.findByPk(req.params.id);
      res.status(200).json(updatedTag);
    } else {
      res.status(404).json({message: 'No tag was found'})
    }
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try{
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (tagData === 0) {
      res.status(404).json({message:'No tag was found'});
      return;
    }
    res.status(200).json({message: ' Tag was deleted successfully'});
  } catch (err) {
    res.status(400).json(err)
  }

});

module.exports = router;

var express = require('express');
var router = express.Router();
var python = require('./myScript');

/* GET home page. */
router.post('/', function (req, res, next) {
  var text = req.body.text;
  var decoded = '';
  python.lock(python => {
    python.ex`decoded = decode_sentence(sess, model, data_reader, ${text}, corrective_tokens=corrective_tokens)`;
    return python`decoded`;
  }).then(obj => {
    console.log(typeof obj);
    var data = obj.toString();
    var decoded = data.split(',').join(' ');
    res.render('index', { encode: text, decoded: decoded, accuracy: '' })
  });
});

router.get('/', function (req, res, next) {
  res.render('index', { encode: '', decoded: '', accuracy: '' })
});

router.get('/accuracy', function (req, res, next) {
  console.log(123456)
  python.lock(python => {
    python.ex`errors, obj = evaluate_accuracy(sess, model, data_reader, corrective_tokens, test_path)`;
    return python`obj`;
  }).then(obj => {
    res.json(obj);
  });
});

module.exports = router;

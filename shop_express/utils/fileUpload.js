const multer = require('multer')
const path = require('path')
const mime = require('mime-types')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename(req, file, cb) {
    const fn = new Date().format('yyMMdd_HHmmss_uuu');
    const ext = '.' + mime.extension(file.mimetype);
    // let ext = ''
    // switch (file.mimetype) {
    //   case 'image/png': ext = '.png'; break;
    //   case 'image/jpeg': ext = '.jpeg'; break;
    //   default: ext = '';
    // }
    cb(null, fn + ext.toLowerCase() );
  }
})

module.exports = multer({ storage })

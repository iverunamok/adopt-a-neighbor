const express = require)'express')
  , router = express.Router()
  , multer = require('multer')

  const uploading = multer({
    dest: __dirname + '../public/uploads/',
    limits: {fileSize: 1000000, files:1},
  })

  router.post('/upload', function(req, res) {

  })


  // However, before you go further with the file handling
  // let’s first create a simple form which is capable of sending
  // files from the browser to your server. You should place the following
  // snippet of HTML when you need file upload.
  //
  //  <form action="/pictures/upload" method="POST" enctype="multipart/form-data">
  //   Select an image to upload:
  //   <input type="file" name="image">
  //   <input type="submit" value="Upload Image">
  // </form>



  module.exports = router

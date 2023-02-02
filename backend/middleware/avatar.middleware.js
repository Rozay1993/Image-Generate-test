const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const path = require("path");

// ** Import filename service
const filenameService = require("../services/filename.service");

// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Change bucket property to your Space name
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: async (request, file, cb) => {
      var key = await filenameService.avatar(
        request.headers.field,
        request.headers.avatar,
        file.fieldname,
        path.extname(file.originalname),
        request.headers.userid,
        request.user.id
      );
      cb(null, key);
    },
  }),
}).fields([
  {
    name: "avatar",
    maxCount: 1,
  },
  {
    name: "insurance",
    maxCount: 1,
  },
  {
    name: "annual_inspection",
    maxCount: 1,
  },
  {
    name: "permits",
    maxCount: 1,
  },
  {
    name: "apportioned_registration",
    maxCount: 1,
  },
  {
    name: "driver_license",
    maxCount: 1,
  },
  {
    name: "medical_exam",
    maxCount: 1,
  },
  {
    name: "safety_agreement",
    maxCount: 1,
  },
  {
    name: "agreement",
    maxCount: 1,
  },
  {
    name: "ssn_pdf",
    maxCount: 1,
  },
]);

module.exports.uploadAvatar = async (req, res, next) => {
  try {
    await upload(req, res, function (error) {
      if (error) {
        console.log(error);
        res.status(400).send(error);
      }
      next();
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

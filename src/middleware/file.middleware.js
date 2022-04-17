const Multer = require("koa-multer");
const Jimp = require("jimp")
const path = require("path")
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file.type");

const avatarUpload = Multer({
    dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single("avatar");

const pictureUpload = Multer({
    dest: PICTURE_PATH
})

const pictureHandler = pictureUpload.array("picture",9)

const pictureJimpSize = async (ctx, next) => {
        const files = ctx.req.files;
        
        
        try {
            for (const file of files) {
                
                const destPath = path.join(file.destination,file.filename)
               
                Jimp.read(file.path).then(async image => {
                    // image.getBufferAsync()
                   
                    image.resize(1280,Jimp.AUTO).write(`${destPath}-large`)
                    image.resize(640,Jimp.AUTO).write(`${destPath}-mid`)
                    image.resize(320,Jimp.AUTO).write(`${destPath}-small`)
                })
            }

            await next()
        } catch (error) {
            console.log(error)
        }
}

module.exports = {
    avatarHandler,
    pictureHandler,
    pictureJimpSize
}
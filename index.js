const express = require('express')
const zip = require('express-zip');

const app = express()
const formidable = require('formidable')
const fs = require('fs')


app.get('/', (req, res) => {

   

    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write('<h1>Upload and Download</h1>')
    res.write('Route: /files')
    res.write('<br>')
    res.write('Route: /download/:name')
    res.write('<br>')
    res.write('Route: /downloadzip/:name')
    res.write('<br><br>')


    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
      

})

app.post('/fileupload', (req, res) => {

    const folder = 'files/'

    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {

        var oldpath = files.filetoupload.filepath;
        var newpath = folder+files.filetoupload.originalFilename;

        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder, { recursive: true });
        }

        fs.rename(oldpath, newpath, (err) => {
            if (err) throw err;
            res.write('File uploaded and moved!');
            res.end();
        });

     })

})

app.get('/files', (req, res) => {

    const folder = 'files/'

    fs.readdir(folder, (err, files) => {

        if(files.length > 0){
            res.status(200).json(files)
        }else{
            res.status(400).send('Not found')
        }

    });
      
})

app.get('/download/:name', (req, res) => {

    var filePath = "files/";
    var fileName = req.params.name

    res.download(filePath+fileName, (err) => {
        if(err) {
            res.status(400).send(err)
        }
    })

});

app.get('/downloadzip/:name', function(req, res) {

    var filePath = "files/";
    var fileName = req.params.name

    res.zip([
            { path: filePath+fileName, name: fileName}
        ])
})

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Rodando na porta ${PORT}`))